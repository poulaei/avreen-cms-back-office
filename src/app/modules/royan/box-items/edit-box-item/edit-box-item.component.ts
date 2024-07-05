import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BoxItem} from "../box-items.model";
import {BoxItemsService} from "../box-items.service";
import {FileUploadService} from "../../shared/shared-components/upload-image/file-upload.service";

@Component({
    selector: 'app-edit-box-item',
    templateUrl: './edit-box-item.component.html',
    styleUrls: ['./edit-box-item.component.scss']
})
export class EditBoxItemComponent implements OnInit {

    @Input() boxItemId: string;
    @Input() boxId: string;
    editBoxItemForm: FormGroup;
    boxItem: BoxItem = new BoxItem();
    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
    progressInfos: any[] = [];
    message: string[] = [];
    previews: string[] = [];


    constructor(public formBuilder: FormBuilder,
                public boxItemsService: BoxItemsService,
                public uploadService: FileUploadService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initEditBoxItemForm();
        this.loadBoxItem();
    }

    initEditBoxItemForm(): void {
        this.editBoxItemForm = this.formBuilder.group({
            mediaId: [''],
            title: [''],
            action: [''],
            actionUrl: [''],
            summary: [''],
            description: ['']
        });
    }

    loadBoxItem(): void {
        this.boxItemsService.getBoxItemInfo(this.boxItemId).subscribe({
            next: (response: any): void => {
                if (!response.error) {
                    this.setFormValue(response);
                } else {
                    this.toasterService.error(response.error.message);
                }
            },
            error: (exception): void => {
                if (exception.error != null) {
                    this.toasterService.error(exception.error.message);
                }
            }
        });
    }

    editBoxItem(): void {
        this.message = [];
        if (this.selectedFiles) {
            for (let i: number = 0; i < this.selectedFiles.length; i++) {
                this.upload(i, this.selectedFiles[i]);
            }
        }
    }

    upload(idx: number, file: File): void {
        this.progressInfos[idx] = {value: 0, fileName: file.name};
        if (file) {
            this.uploadService.upload(file, 'Box').subscribe({
                next: (response: any): void => {
                    if (response && response.body && response.body.id) {
                        this.boxItem.mediaId = response.body.id;
                        this.boxItemsService.editBoxItem(this.getFormValue(), this.boxItemId).subscribe({
                            next: (response: any): void => {
                                if (response.id) {
                                    this.modal.close(true);
                                } else {
                                    this.toasterService.error(response.error.message);
                                }
                            },
                            error: (exception): void => {
                                if (exception.error != null) {
                                    this.toasterService.error(exception.error.message);
                                }
                            }
                        });
                    } else if (response && response.body && !response.body.id) {
                        this.toasterService.error('بارگذاری مدیا ناموفق');
                    }
                },
                error: (exception): void => {
                    if (exception.error != null) {
                        this.toasterService.error(exception.error.message);
                    }
                }
            });
        }
    }

    selectFiles(event: any): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFileNames = [];
        this.selectedFiles = event.target.files;
        this.previews = [];
        if (this.selectedFiles && this.selectedFiles[0]) {
            const numberOfFiles: number = this.selectedFiles.length;
            for (let i: number = 0; i < numberOfFiles; i++) {
                const reader: FileReader = new FileReader();
                reader.onload = (e: any) => {
                    this.previews.push(e.target.result);
                };
                reader.readAsDataURL(this.selectedFiles[i]);
                this.selectedFileNames.push(this.selectedFiles[i].name);
            }
        }
    }

    getFormValue(): BoxItem {
        this.boxItem.title = this.editBoxItemForm.controls['title'].value;
        this.boxItem.action = this.editBoxItemForm.controls['action'].value;
        this.boxItem.actionUrl = this.editBoxItemForm.controls['actionUrl'].value;
        this.boxItem.summary = this.editBoxItemForm.controls['summary'].value;
        this.boxItem.description = this.editBoxItemForm.controls['description'].value;
        this.boxItem.boxId = this.boxId;
        this.boxItem.id = this.boxItemId;
        return this.boxItem;
    }

    setFormValue(boxItemInfo: BoxItem): void {
        this.editBoxItemForm.controls['mediaId'].setValue(boxItemInfo.mediaId);
        this.editBoxItemForm.controls['title'].setValue(boxItemInfo.title);
        this.editBoxItemForm.controls['action'].setValue(boxItemInfo.action);
        this.editBoxItemForm.controls['actionUrl'].setValue(boxItemInfo.actionUrl);
        this.editBoxItemForm.controls['summary'].setValue(boxItemInfo.summary);
        this.editBoxItemForm.controls['description'].setValue(boxItemInfo.description);
        if (boxItemInfo.mediaId) {
            this.boxItemsService.getBoxItemMedia(boxItemInfo.mediaId).subscribe({
                next: (response: any): void => {
                    if (!response.error) {
                        this.previews.push(response);
                    } else {
                        this.toasterService.error(response.error.message);
                    }
                },
                error: (exception): void => {
                    if (exception.error != null) {
                        this.toasterService.error(exception.error.message);
                    }
                }
            });
        }
        this.boxItem.concurrencyStamp = boxItemInfo.concurrencyStamp;
    }
}
