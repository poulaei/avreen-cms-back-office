import {Component, Input} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {EditorComponent} from '@progress/kendo-angular-editor';
import {ImageInfo} from './upload.component';

@Component({
    selector: 'app-my-dialog',
    styles: [
        `
          my-upload {
            min-width: 175px;
            max-width: 275px;
          }

          label {
            width: 100px;
          }
        `
    ],
    template: `
        <kendo-dialog title="Insert Image" *ngIf="opened" (close)="close()" [minWidth]="250" [width]="450">
            <div class="row example-wrapper">
                <div class="col-xs-8 col-sm-12 example-col">
                    <div class="card">
                        <div class="card-block">
                            <form class="k-form-inline">
                                <div class="k-form-field">
                                    <label>Image</label>
                                    <app-my-upload (valueChange)="setImageInfo($event)"></app-my-upload>
                                </div>
                                <div class="k-form-field">
                                    <label [for]="heightInput">Height (px)</label>
                                    <kendo-numerictextbox #heightInput format="n0" [(value)]="height"
                                                          [min]="0"></kendo-numerictextbox>
                                </div>
                                <div class="k-form-field">
                                    <label [for]="widthInput">Width (px)</label>
                                    <kendo-numerictextbox #widthInput format="n0" [(value)]="width"
                                                          [min]="0"></kendo-numerictextbox>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <kendo-dialog-actions>
                <button kendoButton (click)="close()">Cancel</button>
                <button kendoButton [disabled]="canInsert" (click)="uploadImage()" themeColor="primary">Insert</button>
            </kendo-dialog-actions>
        </kendo-dialog>
    `
})
export class DialogComponent implements HttpInterceptor {

    @Input() public editor: EditorComponent;
    public opened: boolean = false;
    public src: string | any;
    public height: number | any;
    public width: number | any;

    public get canInsert(): boolean {
        return !this.src;
    }

    public uploadImage(): void {
        // Invoking the insertImage command of the Editor.
        this.editor.exec('insertImage', this.imageInfo);

        // Closing the Dialog.
        this.close();
    }

    public get imageInfo(): ImageInfo {
        return <ImageInfo>{
            src: this.src,
            height: this.height,
            width: this.width
        };
    }

    public setImageInfo(value: ImageInfo) {
        if (value) {
            this.src = value.src;
            this.height = value.height;
            this.width = value.width;
        } else {
            this.resetData();
        }
    }

    public open(): void {
        this.opened = true;
    }

    public close(): void {
        this.opened = false;
        this.resetData();
    }

    public resetData(): void {
        this.src = null;
        this.width = null;
        this.height = null;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === 'saveUrl' || req.url === 'removeUrl') {
            return of(new HttpResponse({status: 200}));
        }
        return next.handle(req);
    }
}
