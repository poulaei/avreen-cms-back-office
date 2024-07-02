import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {Box} from "../../box/box.model";
import {HttpClient} from "@angular/common/http";
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
