import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

    constructor() {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!request.url.includes('Login')) {
            let authToken = JSON.parse(localStorage.getItem(this.authLocalStorageToken) || '{}').authToken;
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }
        return next.handle(request);
    }
}
