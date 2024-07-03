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

    getAllBlogPosts(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllBlogs, {});
    }

    addNewBlogPost(blogCategoryModel: BlogCategoryModel): Observable<any> {
        return this.httpClient.post<any>(environment.addNewCategory, blogCategoryModel);
    }

    deleteBlogPost(categoryId: string): Observable<any> {
        return this.httpClient.delete<any>(environment.deleteCategory + categoryId, {});
    }

    getBlogPostInfo(boxId: string): Observable<any> {
        return this.httpClient.get<any>(environment.getBoxInfo + boxId, {});
    }

    editBlogPost(boxInfo: Box, boxId: string): Observable<any> {
        return this.httpClient.put<any>(environment.editBox + boxId, boxInfo);
    }
}
