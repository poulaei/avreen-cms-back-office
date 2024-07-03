import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {BlogCategoryModel} from "../blog-category/blog-category.model";
import {Box} from "../../box/box.model";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class PageViewService {

    constructor(private httpClient: HttpClient) {

    }

    getAllPages(): Observable<any> {
        return this.httpClient.get<any>(environment.getAllPages, {});
    }

    addNewPage(blogCategoryModel: BlogCategoryModel): Observable<any> {
        return this.httpClient.post<any>(environment.addNewCategory, blogCategoryModel);
    }

    deletePage(categoryId: string): Observable<any> {
        return this.httpClient.delete<any>(environment.deleteCategory + categoryId, {});
    }

    getPageInfo(boxId: string): Observable<any> {
        return this.httpClient.get<any>(environment.getBoxInfo + boxId, {});
    }

    editPage(boxInfo: Box, boxId: string): Observable<any> {
        return this.httpClient.put<any>(environment.editBox + boxId, boxInfo);
    }

}
