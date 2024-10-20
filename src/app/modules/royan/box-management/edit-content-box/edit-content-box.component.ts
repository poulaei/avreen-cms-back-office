import {ChangeDetectorRef, Component, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FileUploadService} from "../../shared/shared-components/upload-image/file-upload.service";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ContentBoxModel} from "../box-management.model";
import {BoxManagementService} from "../box-management.service";
import {BlogLookupComponent} from "../../cms/blog/blog-lookup/blog-lookup.component";
import {ContentBoxLookupComponent} from "../content-box-lookup/content-box-lookup.component";
import {DialogComponent} from "./dialog.component";
import {EditorComponent} from "@progress/kendo-angular-editor";
import {fullscreenIcon} from "@progress/kendo-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
    selector: 'app-edit-content-box',
    templateUrl: './edit-content-box.component.html',
    styleUrls: ['./edit-content-box.component.scss']
})
export class EditContentBoxComponent implements OnInit {

    protected readonly fullscreenIcon = fullscreenIcon;
    contentBoxId: string = '';
    rootContentBoxId: string = '';
    editContentBoxForm: FormGroup;
    contentBoxModel: ContentBoxModel = new ContentBoxModel();
    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
    progressInfos: any[] = [];
    message: string[] = [];
    previews: string[] = [];
    selectedActionType: string = '';
    actionUri: string = '';
    value: string = '';
    @ViewChild("upload") public dialog: DialogComponent;
    @Output() @ViewChild("editor") public editor: EditorComponent;


    constructor(public formBuilder: FormBuilder,
                public boxManagementService: BoxManagementService,
                public uploadService: FileUploadService,
                public modalService: NgbModal,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public changeDetectorRef: ChangeDetectorRef,
                public route: ActivatedRoute,
                public router: Router) {

    }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.contentBoxId = params['contentBoxId'];
            this.rootContentBoxId = params['rootContentBoxId'];
        });
        this.initContentBoxForm();
        this.loadContentBox();
    }

    initContentBoxForm(): void {
        this.editContentBoxForm = this.formBuilder.group({
            boxType: [''],
            boxName: [''],
            content: [''],
            section: [''],
            title: [''],
            summary: [''],
            actionType: [''],
            action: [''],
            actionUrl: [''],
            description: ['']
        });
    }

    public openImageBrowser() {
        this.dialog.open();
    }

    public toggleFullScreen() {
        let docEl = //document.documentElement;
            document.querySelector("kendo-editor");
        let fullscreenElement =
            document.fullscreenElement;
        // @ts-ignore
        let requestFullScreen = docEl.requestFullscreen;
        let exitFullScreen = document.exitFullscreen;
        if (!requestFullScreen) {
            return;
        }
        if (!fullscreenElement) {
            requestFullScreen.call(docEl);
        } else {
            exitFullScreen.call(document);
        }
    }

    loadContentBox(): void {
        this.boxManagementService.getContentBox(this.contentBoxId).subscribe({
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

    editContentBox(): void {
        if (this.selectedFiles && this.selectedFiles[0]) {
            this.uploadFiles();
        } else {
            this.boxManagementService.editContentBox(this.getFormValue(), this.contentBoxId).subscribe({
                next: (response: any): void => {
                    if (response.id) {
                        this.toasterService.success('باکس با موفقیت ویرایش شد');
                        this.closeForm();
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
            this.uploadService.upload(file, 'ContentBox').subscribe({
                next: (response: any): void => {
                    if (response && response.body && response.body.id) {
                        this.contentBoxModel.mediaId = response.body.id;
                        this.boxManagementService.editContentBox(this.getFormValue(), this.contentBoxId).subscribe({
                            next: (response: any): void => {
                                if (response.id) {
                                    this.toasterService.success('باکس با موفقیت ویرایش شد');
                                    this.closeForm();
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
                    this.changeDetectorRef.detectChanges();
                };
                reader.readAsDataURL(this.selectedFiles[i]);
                this.selectedFileNames.push(this.selectedFiles[i].name);
            }
        }
    }

    getFormValue(): ContentBoxModel {
        this.contentBoxModel.section = this.editContentBoxForm.controls['section'].value;
        this.contentBoxModel.title = this.editContentBoxForm.controls['title'].value;
        this.contentBoxModel.actionType = this.editContentBoxForm.controls['actionType'].value;
        this.contentBoxModel.action = this.editContentBoxForm.controls['action'].value;
        this.contentBoxModel.actionUrl = this.actionUri;
        this.contentBoxModel.summary = this.editContentBoxForm.controls['summary'].value;
        this.contentBoxModel.description = this.editContentBoxForm.controls['description'].value;
        this.contentBoxModel.boxType = this.editContentBoxForm.controls['boxType'].value;
        this.contentBoxModel.boxName = this.editContentBoxForm.controls['boxName'].value;
        this.contentBoxModel.content = this.value;
        this.contentBoxModel.id = this.contentBoxId;
        return this.contentBoxModel;
    }

    setFormValue(contentBoxModel: ContentBoxModel): void {
        this.editContentBoxForm.controls['section'].setValue(contentBoxModel.section);
        this.editContentBoxForm.controls['title'].setValue(contentBoxModel.title);
        this.editContentBoxForm.controls['summary'].setValue(contentBoxModel.summary);
        this.editContentBoxForm.controls['actionType'].setValue(contentBoxModel.actionType);
        this.editContentBoxForm.controls['action'].setValue(contentBoxModel.action);
        this.editContentBoxForm.controls['actionUrl'].setValue(contentBoxModel.actionUrl);
        this.editContentBoxForm.controls['description'].setValue(contentBoxModel.description);
        this.editContentBoxForm.controls['boxType'].setValue(contentBoxModel.boxType);
        this.editContentBoxForm.controls['boxName'].setValue(contentBoxModel.boxName);
        // this.editContentBoxForm.controls['content'].setValue(contentBoxModel.content);
        this.value = contentBoxModel.content;
        if ((contentBoxModel.actionType) && (contentBoxModel.actionType == 'BlogPost' || contentBoxModel.actionType == 'Page')) {
            this.selectedActionType = contentBoxModel.actionType;
            this.changeDetectorRef.detectChanges();
        }
        this.actionUri = contentBoxModel.actionUrl;
        if (contentBoxModel.mediaId) {
            this.boxManagementService.getBoxItemMedia(contentBoxModel.mediaId).subscribe({
                next: (response: any): void => {
                    if (!response.error) {
                        this.contentBoxModel.mediaId = contentBoxModel.mediaId;
                        this.previews.push(response);
                        this.changeDetectorRef.detectChanges();
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
        this.contentBoxModel.concurrencyStamp = contentBoxModel.concurrencyStamp;
    }

    deleteMedia(): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFileNames = [];
        this.selectedFiles = undefined;
        this.previews = [];
        this.contentBoxModel.mediaId = '';
    }

    actionTypeSelectionChange(event: Event): void {
        this.editContentBoxForm.controls['actionUrl'].setValue('');
        this.selectedActionType = ((event.target as HTMLInputElement).value);
    }

    searchBlogPost(): void {
        const modalRef: NgbModalRef = this.modalService.open(BlogLookupComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((blogPostInfo: any): void => {
            if (blogPostInfo) {
                this.actionUri = blogPostInfo.id;
                this.editContentBoxForm.controls['actionUrl'].setValue(blogPostInfo.id);
            }
        }, (): void => {

        });
    }

    searchPage(): void {
        const modalRef: NgbModalRef = this.modalService.open(ContentBoxLookupComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((pageInfo: any): void => {
            if (pageInfo) {
                this.actionUri = pageInfo.id;
                this.editContentBoxForm.controls['actionUrl'].setValue(pageInfo.id);
            }
        }, (): void => {

        });
    }

    closeForm(): void {
        this.router.navigate(["/royan/boxDetail", this.rootContentBoxId]);
    }
}
