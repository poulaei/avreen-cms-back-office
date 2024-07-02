// image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private baseUrl = 'assets/uploads'; // Adjust this if needed

    constructor(private http: HttpClient) {}

    uploadImage(image: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', image);

        // Simulate a file upload
        const uploadUrl = `${this.baseUrl}/${image.name}`;
        return this.http.post(uploadUrl, formData, {
            headers: new HttpHeaders({
                'Content-Type': image.type
            })
        }).pipe(
            map(() => ({ location: uploadUrl })),
            catchError(this.handleError('uploadImage', []))
        );
    }

    getImages(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl).pipe(
            catchError(this.handleError<any[]>('getImages', []))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
    }
}
