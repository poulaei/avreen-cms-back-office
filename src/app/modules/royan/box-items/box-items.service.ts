import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {BoxItem} from "./box-items.model";

@Injectable({
    providedIn: 'root',
})
export class BoxItemsService {

    constructor(private httpClient: HttpClient) {

    }

    addNewBoxItem(boxItem: BoxItem): Observable<any> {
        return this.httpClient.post<any>(environment.addNewBoxItem, boxItem);
    }

    getBoxItems(boxId: string): Observable<any> {
        return this.httpClient.get<any>(environment.getBoxItems + boxId, {});
    }
}
