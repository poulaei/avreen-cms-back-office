import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {catchError, finalize, map, switchMap} from 'rxjs/operators';
import {UserModel} from '../models/user.model';
import {AuthModel} from '../models/auth.model';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import {AuthHTTPService} from "./auth-http";

export type UserType = UserModel | undefined;

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {

    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    // public fields
    currentUser$: Observable<UserModel>;
    isLoading$: Observable<boolean>;
    currentUserSubject: BehaviorSubject<UserModel>;
    isLoadingSubject: BehaviorSubject<boolean>;


    get currentUserValue(): UserModel {
        return this.currentUserSubject.value;
    }

    set currentUserValue(user: UserModel) {
        this.currentUserSubject.next(user);
    }

    constructor(private authHttpService: AuthHTTPService,
                private router: Router) {
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        // @ts-ignore
        this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
        this.currentUser$ = this.currentUserSubject.asObservable();
        this.isLoading$ = this.isLoadingSubject.asObservable();
        const subscribe = this.getUserByToken().subscribe();
        this.unsubscribe.push(subscribe);
    }

    login(email: string, password: string): Observable<UserModel> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.login(email, password).pipe(
            map((auth: AuthModel) => {
                return this.setAuthFromLocalStorage(auth);
            }),
            switchMap(() => this.getUserByToken()),
            catchError((err) => {
                return of();
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    logout() {
        localStorage.removeItem(this.authLocalStorageToken);
        this.router.navigate(['/auth/login'], {
            queryParams: {},
        }).then(res => {

        });
    }

    getUserByToken(): Observable<UserModel> {
        const auth = this.getAuthFromLocalStorage();
        if (!auth || !auth.token) {
            return of();
        }
        this.isLoadingSubject.next(true);
        return this.authHttpService.getUserByToken(auth.token).pipe(
            map((user: any) => {
                if (user) {
                    this.currentUserSubject = new BehaviorSubject<UserModel>(user.result);
                } else {
                    this.logout();
                }
                return user;
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    // need create new user then login
    registration(user: UserModel): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.authHttpService.createUser(user).pipe(
            map(() => {
                this.isLoadingSubject.next(false);
            }),
            switchMap(() => this.login(user.email, user.password)),
            catchError((err) => {
                console.error('err', err);
                return of(undefined);
            }),
            finalize(() => this.isLoadingSubject.next(false))
        );
    }

    forgotPassword(email: string): Observable<boolean> {
        this.isLoadingSubject.next(true);
        return this.authHttpService
            .forgotPassword(email)
            .pipe(finalize(() => this.isLoadingSubject.next(false)));
    }

    // private methods
    private setAuthFromLocalStorage(auth: AuthModel): boolean {
        // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
        if (auth && auth.token) {
            localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
            return true;
        }
        return false;
    }

    getAuthFromLocalStorage(): AuthModel {
        try {
            return JSON.parse(localStorage.getItem(this.authLocalStorageToken) || '{}');
        } catch (error) {
            console.error(error);
            throw new Error("Unexpected error: Missing name");
        }
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
}
