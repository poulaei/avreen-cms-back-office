import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../../models/user.model';
import {environment} from '../../../../../environments/environment';
import {AuthModel} from '../../models/auth.model';
import {loginModel} from "../../components/login/login.model";
import {map} from "rxjs/operators";

const API_USERS_URL = `${environment.apiUrl}/auth`;

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
            userNameOrEmailAddress: email,
            password: password,
            rememberMe: true,
        };
        const defaultAuth2 = {};
        return this.http.post<loginModel>(environment.loginUrl, defaultAuth, defaultAuth2)
            .pipe(map((loginModel: loginModel) => {
                        const auth = new AuthModel();
                        auth.result = loginModel.result;
                        auth.description = loginModel.description;
                        return auth;
                    },
                    (err: Error) => {
                        return notFoundError;
                    }
                ),
            );
    }

    // CREATE =>  POST: add a new user to the server
    createUser(user: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>('environment.getCustomerById', user);
    }

    // Your server should check email => If email exists send link to the user and return true | If email doesn't exist return false
    forgotPassword(email: string): Observable<boolean> {
        return this.http.post<boolean>(`${'environment.getCustomerById'}/forgot-password`, {
            email,
        });
    }

    getUserByToken(): Observable<UserModel> {
        this.http.get(environment.SetCsrfCookie).subscribe(_ => {

        });
        const defaultAuth = {};
        return this.http.get<UserModel>(environment.getUserByToken, defaultAuth);
        // return new Observable<UserModel>();
    }
}
