import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Box, BoxItem} from "./landing.model";

@Injectable({
    providedIn: 'root',
})
export class LandingService {

    constructor(private httpClient: HttpClient) {

    }

    getAllSections(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllSections, {});
    }

    getSectionInfo(sectionId: string): Observable<any> {
        return this.httpClient.get<any>(environment.getSectionInfo + '/' + sectionId, {});
    }

    addNewSection(boxInfo: Box): Observable<any> {
        return this.httpClient.post<any>(environment.addNewSection, boxInfo);
    }

    addNewSectionItem(boxItem: BoxItem): Observable<any> {
        return this.httpClient.post<any>(environment.addNewSectionItem, boxItem);
    }

    deleteSection(sectionId: string): Observable<any> {
        return this.httpClient.delete<any>(environment.deleteSection + '/' + sectionId);
    }

    editSection(sectionInfo: Box, sectionId: string): Observable<any> {
        return this.httpClient.put<any>(environment.editSection + '/' + sectionId, sectionInfo);
    }

    getSectionItems(sectionId: string): Observable<any> {
        const params = new HttpParams().set('section', sectionId);
        return this.httpClient.get<any>(environment.getSectionItems, {params});
    }

}
