import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Box} from "./box.model";

@Injectable({
    providedIn: 'root',
})
export class BoxService {

    constructor(private httpClient: HttpClient) {

    }

    getAllBoxes(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllBoxes, {});
    }

    addNewBox(boxInfo: Box): Observable<any> {
        return this.httpClient.post<any>(environment.addNewBox, boxInfo);
    }

    deleteBox(boxId: string): Observable<any> {
        return this.httpClient.post<any>(environment.deleteBox + boxId + "/hazf", {});
    }

    getBoxInfo(boxId: string): Observable<any> {
        return this.httpClient.get<any>(environment.getBoxInfo + boxId, {});
    }

    editBox(boxInfo: Box, boxId: string): Observable<any> {
        return this.httpClient.put<any>(environment.editBox + boxId, boxInfo);
    }
}
