import {Component, EventEmitter, Output} from '@angular/core';
import {
    FileState,
    RemoveEvent,
    SelectEvent,
    SuccessEvent,
    UploadComponent,
    UploadEvent
} from "@progress/kendo-angular-upload";

export interface ImageInfo {
    src: string;
    width: number;
    height: number;
}

@Component({
    selector: 'app-my-upload',
    template: `
        <kendo-upload #myUpload="kendoUpload" [saveUrl]="uploadSaveUrl" [removeUrl]="uploadRemoveUrl"
                      (select)="onSelect($event)" [withCredentials]="false" [autoUpload]="false"
                      (success)="success($event)" (upload)="uploadEventHandler($event)"
                      (remove)="removeEventHandler($event)" [multiple]="false">
            <kendo-upload-messages select="Select image">
            </kendo-upload-messages>
            <ng-template kendoUploadFileTemplate let-files let-state="state">
                <div>Name: {{ files[0].name }} Size: {{ files[0].size }} bytes</div>
                <button kendoButton *ngIf="showButton(state)" (click)="remove(myUpload, files[0].uid)"
                        style="position: absolute; right: .2em;">
                    Remove
                </button>
            </ng-template>
        </kendo-upload>
    `
})
export class ImageUploadComponent {

    public uploadSaveUrl = '/api/Upload'; // Has to represent an actual API endpoint.
    public uploadRemoveUrl = 'removeUrl'; // Has to represent an actual API endpoint.
    @Output() public valueChange: EventEmitter<ImageInfo> = new EventEmitter<ImageInfo>();

    public onSelect(ev: SelectEvent): void {
        // ev.files.forEach((file: FileInfo) => {
        //   if (file.rawFile) {
        //     const reader = new FileReader();
        //
        //     reader.onloadend = () => {
        //       const img = new Image();
        //
        //       img.src = <string>reader.result;
        //       img.onload = () => {
        //         this.valueChange.emit({
        //           src: img.src,
        //           height: img.height,
        //           width: img.width
        //         });
        //       };
        //     };
        //
        //     reader.readAsDataURL(file.rawFile);
        //   }
        // });
    }

    public success(e: SuccessEvent): void {
        this.valueChange.emit({
            src: e.response.body.filePath,
            height: 200,
            width: 200
        });
    }

    uploadEventHandler(e: UploadEvent): void {
        e.data = {
            path: "MyEditor"
        };
        // e.files.forEach((file: FileInfo) => {
        //   if (file.rawFile) {
        //     const reader = new FileReader();
        //
        //     reader.onloadend = () => {
        //       const img = new Image();
        //
        //       img.src = <string>reader.result;
        //       img.onload = () => {
        //         this.valueChange.emit({
        //           src: img.src,
        //           height: img.height,
        //           width: img.width
        //         });
        //       };
        //     };
        //
        //     reader.readAsDataURL(file.rawFile);
        //   }
        // });

    }

    removeEventHandler(e: RemoveEvent): void {
        e.data = {
            description: "File remove",
        };
        this.valueChange.emit(undefined);
    }

    remove(upload: UploadComponent, uid: string): void {
        upload.removeFilesByUid(uid);
    }

    public showButton(state: FileState): boolean {
        return state === FileState.Uploaded;
    }
}
