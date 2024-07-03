import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

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
}
