import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Injectable} from "@angular/core";
import {BlogPostModel, BlogPostTagModel} from "./blog-post.model";
import {switchMap} from "rxjs/operators";

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
        return this.httpClient.delete<any>(environment.deleteBlogPost + categoryId, {});
    }

    getBlogPostInfo(blogPostId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.get<any>(environment.getBlogPost + blogPostId, {});
    }

    getBlogPostTags(entityType: string, blogPostId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.get<any>(environment.getBlogPostTags + entityType + "/" + blogPostId, {});
    }

    submitTags(blogPostTagModel: BlogPostTagModel): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.put<any>(environment.submitTag, blogPostTagModel);
    }

    editBlogPost(blogPostModel: BlogPostModel, blogPostId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.put<any>(environment.editBlogPost + blogPostId, blogPostModel);
    }

    getItemMedia(mediaId: string): Observable<string> {
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
