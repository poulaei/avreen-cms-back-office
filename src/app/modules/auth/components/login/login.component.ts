import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {UserModel} from '../../models/user.model';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControlService} from "../../../royan/shared/shared-service/form-control.service";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

    // KeenThemes mock, change it to:
    defaultAuth: any = {
        email: '',
        password: '',
    };
    loginForm: FormGroup;
    hasError: boolean;
    returnUrl: string;
    isLoading$: Observable<boolean>;

    // private fields
    private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private httpClient: HttpClient,
                private route: ActivatedRoute,
                private router: Router,
                private changeDetectorRef: ChangeDetectorRef,
                public formControlService: FormControlService) {
        this.isLoading$ = this.authService.isLoading$;
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        this.initForm();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    initForm() {
        this.loginForm = this.fb.group({
            email: [
                this.defaultAuth.email,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
                ]),
            ],
            password: [
                this.defaultAuth.password,
                Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(100),
                ]),
            ],
        });
    }

    submit(): void {
        this.hasError = false;
        const loginSubscription: Subscription = this.authService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe({
            next: (user: UserModel | undefined): void => {
                if (user) {
                    this.router.navigate([this.returnUrl]);
                    this.httpClient.get<any>(environment.getConfiguration, {}).subscribe({
                        next: (response: any): void => {
                            console.log(response);
                        },
                        error: (exception: any): void => {

                        }
                    });
                } else {
                    this.hasError = true;
                }
            },
            error: (exception) => {
                this.hasError = true;
            }
        });
        let cookie = this.getCookie('XSRF-TOKEN');
        console.log(cookie);
        this.unsubscribe.push(loginSubscription);
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb: Subscription) => sb.unsubscribe());
    }

    private getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;
        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }
}
