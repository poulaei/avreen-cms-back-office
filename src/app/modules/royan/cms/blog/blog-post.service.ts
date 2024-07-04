import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Box} from "../../box/box.model";
import {Injectable} from "@angular/core";
import {BlogPostModel} from "./blog-post.model";

@Injectable({
    providedIn: 'root',
})
export class BlogPostService {

    constructor(private httpClient: HttpClient) {

    }

    getAllBlogPosts(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllBlogPosts, {});
    }

    addNewBlogPost(blogPostModel: BlogPostModel): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.post<any>(environment.addNewBlogPost, blogPostModel);
    }

    deleteBlogPost(categoryId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.delete<any>(environment.deleteCategory + categoryId, {});
    }

    getBlogPostInfo(boxId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.get<any>(environment.getBoxInfo + boxId, {});
    }

    editBlogPost(boxInfo: Box, boxId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.put<any>(environment.editBox + boxId, boxInfo);
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
