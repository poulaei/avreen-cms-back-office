import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {MenuManagementModel} from "./menu-management.model";

@Injectable({
    providedIn: 'root',
})
export class MenuManagementService {

    constructor(private httpClient: HttpClient) {

    }

    getAllMenus(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllMenus, {});
    }

    getMenuTree(): Observable<any> {
        return this.httpClient.get<any>(environment.getMenuTree, {});
    }

    addNewMenu(menuManagementModel: MenuManagementModel): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.post<any>(environment.addNewMenu, menuManagementModel);
    }

    deleteMenu(menuId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.delete<any>(environment.deleteMenu + menuId + '/pak', {headers: httpHeaders});
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
