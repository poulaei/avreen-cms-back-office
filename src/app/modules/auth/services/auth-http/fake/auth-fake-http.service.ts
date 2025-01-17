import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {UserModel} from '../../../models/user.model';
import {AuthModel} from '../../../models/auth.model';
import {UsersTable} from '../../../../../_fake/users.table';
import {environment} from '../../../../../../environments/environment';
import {loginModel} from "../../../components/login/login.model";

const API_USERS_URL = `${environment.apiUrl}/users`;

@Injectable({
    providedIn: 'root',
})
export class AuthHTTPService {

    constructor(private http: HttpClient) {
    }


    login(email: string, password: string): Observable<any> {
        const notFoundError = new Error('Not Found');
        if (!email || !password) {
            return of(notFoundError);
        }
        const defaultAuth = {
            username: email,
            password: password,
        };
        return this.http.post<loginModel>(environment.loginUrl, defaultAuth)
            .pipe(
                map(
                    (responseBase: loginModel) => {
                        const auth = new AuthModel();
                        // auth.authToken = responseBase.access_token;
                        // auth.refreshToken = responseBase.refresh_token;
                        // auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
                        return auth;
                    },
                    () => {
                        return notFoundError;
                    }
                )
            );
    }

    createUser(user: UserModel): Observable<any> {
        user.roles = [2]; // Manager
        // user.authToken = 'auth-token-' + Math.random();
        // user.refreshToken = 'auth-token-' + Math.random();
        // user.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
        user.pic = './assets/media/users/default.jpg';

        return this.http.post<UserModel>(API_USERS_URL, user);
    }

    forgotPassword(email: string): Observable<boolean> {
        return this.getAllUsers().pipe(
            map((result: UserModel[]) => {
                const user = result.find(
                    (u) => u.email.toLowerCase() === email.toLowerCase()
                );
                return user !== undefined;
            })
        );
    }

    getUserByToken(token: string): Observable<UserModel> {
        const user = UsersTable.users.find((u: AuthModel) => {
            return true;
        });
        if (!user) {
            return of();
        }
        return of(user);
    }

    getAllUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(API_USERS_URL);
    }
}
