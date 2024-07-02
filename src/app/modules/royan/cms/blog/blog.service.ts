import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {BlogCategoryModel} from "../blog-category/blog-category.model";
import {Box} from "../../box/box.model";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class BlogService {

    constructor(private httpClient: HttpClient) {

    }

    getAllBlogs(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllBlogs, {});
    }

    addNewCategory(blogCategoryModel: BlogCategoryModel): Observable<any> {
        return this.httpClient.post<any>(environment.addNewCategory, blogCategoryModel);
    }

    deleteCategory(categoryId: string): Observable<any> {
        return this.httpClient.delete<any>(environment.deleteCategory + categoryId, {});
    }

    getBoxInfo(boxId: string): Observable<any> {
        return this.httpClient.get<any>(environment.getBoxInfo + boxId, {});
    }

    editBox(boxInfo: Box, boxId: string): Observable<any> {
        return this.httpClient.put<any>(environment.editBox + boxId, boxInfo);
    }
}
