import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {ContentBoxModel} from "./box-management.model";
import {switchMap} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class BoxManagementService {

    constructor(private httpClient: HttpClient) {

    }

    getContentBoxRoot(): Observable<any> {
        return this.httpClient.get<any>(environment.getContentBoxRoot, {});
    }

    getContentBoxTree(): Observable<any> {
        return this.httpClient.get<any>(environment.getContentBoxTree, {});
    }

    addNewContentBox(contentBoxModel: ContentBoxModel): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.post<any>(environment.addNewContentBox, contentBoxModel);
    }

    deleteContentBox(contentBoxId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.delete<any>(environment.deleteContentBox + contentBoxId, {});
    }

    getContentBox(contentBoxId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.get<any>(environment.getContentBox + contentBoxId, {headers: httpHeaders});
    }

    getBoxItemMedia(mediaId: string): Observable<string> {
        return this.httpClient.get(environment.downloadMedia + mediaId, {responseType: "blob"})
            .pipe(switchMap(response => this.readFile(response)));
    }

    editContentBox(contentBoxModel: ContentBoxModel, contentBoxId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.put<any>(environment.editContentBox + contentBoxId, contentBoxModel, {headers: httpHeaders});
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
