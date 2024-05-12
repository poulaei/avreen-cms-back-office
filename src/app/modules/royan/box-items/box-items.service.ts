import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {BoxItem} from "./box-items.model";
import {switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class BoxItemsService {

    constructor(private httpClient: HttpClient) {

    }

    addNewBoxItem(boxItem: BoxItem): Observable<any> {
        return this.httpClient.post<any>(environment.addNewBoxItem, boxItem);
    }

    editBoxItem(boxItem: BoxItem, boxItemId: string): Observable<any> {
        return this.httpClient.put<any>(environment.editBoxItem + boxItemId, boxItem);
    }

    getBoxItems(boxId: string): Observable<any> {
        return this.httpClient.get<any>(environment.getBoxItems + boxId, {});
    }

    deleteBoxItem(boxItemId: string): Observable<any> {
        return this.httpClient.post<any>(environment.deleteBoxItem + boxItemId + "/hazf", {});
    }

    getBoxItemInfo(boxItemId: string): Observable<any> {
        return this.httpClient.get<any>(environment.getBoxItemInfo + boxItemId, {});
    }

    getBoxItemMedia(mediaId: string): Observable<string> {
        return this.httpClient.get(environment.downloadMedia + mediaId, {responseType: "blob"})
            .pipe(switchMap(response => this.readFile(response)));
    }

    private readFile(blob: Blob): Observable<string> {
        // @ts-ignore
        return Observable.create(obs => {
            const reader = new FileReader();
            reader.onerror = err => obs.error(err);
            reader.onabort = err => obs.error(err);
            reader.onload = () => obs.next(reader.result);
            reader.onloadend = () => obs.complete();
            return reader.readAsDataURL(blob);
        });
    }
}
