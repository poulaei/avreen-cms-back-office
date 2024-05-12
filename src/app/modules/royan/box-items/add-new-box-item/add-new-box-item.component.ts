import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FileUploadService} from "../../shared/shared-components/upload-image/file-upload.service";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BoxItemsService} from "../box-items.service";
import {BoxItem} from "../box-items.model";

@Component({
    selector: 'app-add-new-box-item',
    templateUrl: './add-new-box-item.component.html',
    styleUrls: ['./add-new-box-item.component.scss']
})
export class AddNewBoxItemComponent implements OnInit {

    @Input() boxId: string;
    addNewBoxItemForm: FormGroup;
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
        this.initAddNewBoxItemForm();
    }

    initAddNewBoxItemForm(): void {
        this.addNewBoxItemForm = this.formBuilder.group({
            mediaId: [''],
            title: [''],
            action: [''],
            actionUrl: [''],
            summary: [''],
            description: ['']
        });
    }

    getFormValue(): BoxItem {
        this.boxItem.title = this.addNewBoxItemForm.controls['title'].value;
        this.boxItem.action = this.addNewBoxItemForm.controls['action'].value;
        this.boxItem.actionUrl = this.addNewBoxItemForm.controls['actionUrl'].value;
        this.boxItem.summary = this.addNewBoxItemForm.controls['summary'].value;
        this.boxItem.description = this.addNewBoxItemForm.controls['description'].value;
        this.boxItem.boxId = this.boxId;
        return this.boxItem;
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

    uploadFiles(): void {
        this.message = [];
        if (this.selectedFiles) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.upload(i, this.selectedFiles[i]);
            }
        }
    }

    upload(idx: number, file: File): void {
        this.progressInfos[idx] = {value: 0, fileName: file.name};
        if (file) {
            this.uploadService.upload(file).subscribe({
                next: (response: any): void => {
                    if (response && response.body && response.body.id) {
                        this.boxItem.mediaId = response.body.id;
                        this.boxItemsService.addNewBoxItem(this.getFormValue()).subscribe({
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
}
