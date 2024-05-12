import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    private baseUrl = 'http://localhost:8080';

    constructor(private httpClient: HttpClient) {

    }

    upload(file: File): Observable<HttpEvent<any>> {
        // const formData: FormData = new FormData();
        // formData.append('File', file);
        // const params = new HttpParams().set('Name', 'media');
        // return this.httpClient.post<any>(environment.uploadMedia, formData, {params: params});

        const formData: FormData = new FormData();
        formData.append('File', file);
        const params = new HttpParams().set('Name', 'media');
        const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
        const req = new HttpRequest('POST', environment.uploadMedia, formData, {
            reportProgress: true,
            responseType: 'json',
            params: params
        });
        return this.httpClient.request(req);
    }

    getFiles(): Observable<any> {
        return this.httpClient.get(`${this.baseUrl}/files`);
    }
}
