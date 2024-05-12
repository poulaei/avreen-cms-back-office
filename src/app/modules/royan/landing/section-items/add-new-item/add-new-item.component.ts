import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BoxItem} from "../../landing.model";
import {LandingService} from "../../landing.service";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FileUploadService} from "../../../shared/shared-components/upload-image/file-upload.service";

@Component({
    selector: 'app-add-new-item',
    templateUrl: './add-new-item.component.html',
    styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit {

    addNewSectionItemForm: FormGroup;
    boxItem: BoxItem = new BoxItem();
    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
    progressInfos: any[] = [];
    message: string[] = [];
    previews: string[] = [];

    constructor(public formBuilder: FormBuilder,
                public landingService: LandingService,
                public uploadService: FileUploadService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initAddNewSectionItemForm();
    }

    initAddNewSectionItemForm(): void {
        this.addNewSectionItemForm = this.formBuilder.group({
            mediaId: [''],
            title: [''],
            action: [''],
            actionUrl: [''],
            summary: [''],
            description: ['']
        });
    }

    getFormValue(): BoxItem {
        this.boxItem.title = this.addNewSectionItemForm.controls['title'].value;
        this.boxItem.action = this.addNewSectionItemForm.controls['action'].value;
        this.boxItem.actionUrl = this.addNewSectionItemForm.controls['actionUrl'].value;
        this.boxItem.summary = this.addNewSectionItemForm.controls['summary'].value;
        this.boxItem.description = this.addNewSectionItemForm.controls['description'].value;
        return this.boxItem;
    }

    selectFiles(event: any): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFileNames = [];
        this.selectedFiles = event.target.files;
        this.previews = [];
        if (this.selectedFiles && this.selectedFiles[0]) {
            const numberOfFiles = this.selectedFiles.length;
            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    console.log(e.target.result);
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
                    if (response.id) {
                        this.boxItem.mediaId = response.id;
                        this.landingService.addNewSectionItem(this.getFormValue()).subscribe({
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
                    } else {
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
