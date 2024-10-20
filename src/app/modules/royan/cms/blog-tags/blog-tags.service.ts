import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {BlogTagModel} from "./blog-tags.model";

@Injectable({
    providedIn: 'root',
})
export class BlogTagsService {

    constructor(private httpClient: HttpClient) {

    }

    getAllTags(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllTags, {});
    }

    addNewTag(blogTagModel: BlogTagModel): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.post<any>(environment.addNewTag, blogTagModel, {headers: httpHeaders});
    }

    deleteTag(tagId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.delete<any>(environment.deleteTag + tagId, {headers: httpHeaders});
    }

    getTagInfo(tagId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.get<any>(environment.getTag + tagId, {headers: httpHeaders});
    }

    editTag(blogTagModel: BlogTagModel, tagId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.put<any>(environment.editTag + tagId, blogTagModel, {headers: httpHeaders});
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
