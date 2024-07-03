import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BlogCategoryModel} from "./blog-category.model";

@Injectable({
    providedIn: 'root',
})
export class BlogCategoryService {

    constructor(private httpClient: HttpClient) {

    }

    getAllCategories(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllCategories, {});
    }

    addNewCategory(blogCategoryModel: BlogCategoryModel): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.post<any>(environment.addNewCategory, blogCategoryModel, {headers: httpHeaders});
    }

    deleteCategory(categoryId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.delete<any>(environment.deleteCategory + categoryId, {headers: httpHeaders});
    }

    getCategoryInfo(categoryId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.get<any>(environment.getCategory + categoryId, {headers: httpHeaders});
    }

    editCategory(blogCategoryModel: BlogCategoryModel, categoryId: string): Observable<any> {
        let cookie = this.getCookie('XSRF-TOKEN');
        const httpHeaders: HttpHeaders = new HttpHeaders({
            RequestVerificationToken: cookie
        });
        return this.httpClient.put<any>(environment.editCategory + categoryId, blogCategoryModel, {headers: httpHeaders});
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
