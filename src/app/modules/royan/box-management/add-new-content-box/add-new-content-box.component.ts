import {ChangeDetectorRef, Component, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ContentBoxModel} from "../box-management.model";
import {BoxManagementService} from "../box-management.service";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {FileUploadService} from "../../shared/shared-components/upload-image/file-upload.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {BlogLookupComponent} from "../../cms/blog/blog-lookup/blog-lookup.component";
import {ContentBoxLookupComponent} from "../content-box-lookup/content-box-lookup.component";
import {fullscreenIcon} from "@progress/kendo-svg-icons";
import {DialogComponent} from "../edit-content-box/dialog.component";
import {EditorComponent} from "@progress/kendo-angular-editor";
import {Router} from "@angular/router";
import {PasteCleanupSettings} from "@progress/kendo-angular-editor/common/paste-cleanup-settings";
import {FontFamilyItem} from "@progress/kendo-angular-editor/common/font-family-item.interface";

@Component({
    selector: 'app-add-new-content-box',
    templateUrl: './add-new-content-box.component.html',
    styleUrls: ['./add-new-content-box.component.scss']
})
export class AddNewContentBoxComponent implements OnInit {

    protected readonly fullscreenIcon = fullscreenIcon;
    addNewContentBoxForm: FormGroup;
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
    public pasteSettings: PasteCleanupSettings = {};


    constructor(public formBuilder: FormBuilder,
                public boxManagementService: BoxManagementService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public uploadService: FileUploadService,
                public modalService: NgbModal,
                public changeDetectorRef: ChangeDetectorRef,
                public router: Router) {
        this.pasteSettings = {
            removeHtmlComments: true,
            removeInvalidHTML: true,
            convertMsLists: true,
            removeMsClasses: true,
            removeMsStyles: true,
            removeAttributes: 'all'
        };
    }

    public fontData: FontFamilyItem[] = [
        {fontName: 'B Nazanin', text: 'B Nazanin'},
        {fontName: 'B Titr', text: 'B Titr'},
        {fontName: 'Yekan Bakh FaNum Hairline', text: 'Yekan Bakh FaNum Hairline'},
        {fontName: 'Yekan Bakh FaNum Thin', text: 'Yekan Bakh FaNum Thin'},
        {fontName: 'Yekan Bakh FaNum Light', text: 'Yekan Bakh FaNum Light'},
        {fontName: 'Yekan Bakh FaNum Medium', text: 'Yekan Bakh FaNum Medium'},
        {fontName: 'Yekan Bakh FaNum Fat', text: 'Yekan Bakh FaNum Fat'},
        {fontName: 'Yekan Bakh FaNum Heavy', text: 'Yekan Bakh FaNum Heavy'},
        {fontName: 'Yekan Bakh Thin', text: 'Yekan Bakh En Thin'},
        {fontName: 'Yekan Bakh Light', text: 'Yekan Bakh En Light'},
        {fontName: 'Yekan Bakh Medium', text: 'Yekan Bakh En Medium'},
        {fontName: 'Yekan Bakh Fat', text: 'Yekan Bakh En Fat'},
        {fontName: 'Yekan Bakh Heavy', text: 'Yekan Bakh En Heavy'}
    ];

    ngOnInit(): void {
        this.initAddNewContentBoxForm();
    }

    initAddNewContentBoxForm(): void {
        this.addNewContentBoxForm = this.formBuilder.group({
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

    addContentBox(): void {
        if (this.selectedFiles && this.selectedFiles[0]) {
            this.uploadFiles();
        } else {
            this.boxManagementService.addNewContentBox(this.getFormValue()).subscribe({
                next: (response: any): void => {
                    if (response.id) {
                        this.toasterService.success('باکس جدید با موفقیت اضافه شد');
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
                        this.boxManagementService.addNewContentBox(this.getFormValue()).subscribe({
                            next: (response: any): void => {
                                if (response.id) {
                                    this.toasterService.success('باکس جدید با موفقیت اضافه شد');
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

    getFormValue(): ContentBoxModel {
        this.contentBoxModel.section = this.addNewContentBoxForm.controls['section'].value;
        this.contentBoxModel.title = this.addNewContentBoxForm.controls['title'].value;
        this.contentBoxModel.actionType = this.addNewContentBoxForm.controls['actionType'].value;
        this.contentBoxModel.action = this.addNewContentBoxForm.controls['action'].value;
        // this.contentBoxModel.actionUrl = this.actionUri;
        this.contentBoxModel.actionUrl = this.addNewContentBoxForm.controls['actionUrl'].value;
        this.contentBoxModel.summary = this.addNewContentBoxForm.controls['summary'].value;
        this.contentBoxModel.description = this.addNewContentBoxForm.controls['description'].value;
        this.contentBoxModel.boxType = this.addNewContentBoxForm.controls['boxType'].value;
        this.contentBoxModel.boxName = this.addNewContentBoxForm.controls['boxName'].value;
        // this.contentBoxModel.content = this.addNewContentBoxForm.controls['content'].value;
        this.contentBoxModel.content = this.value;
        return this.contentBoxModel;
    }

    public openImageBrowser() {
        this.dialog.open();
    }

    public toggleFullScreen() {
        let docEl = //document.documentElement;
            document.querySelector("kendo-editor");
        let fullscreenElement =
            document.fullscreenElement;
        // || document.mozFullScreenElement ||
        // document.webkitFullscreenElement ||
        // document.msFullscreenElement;
        // @ts-ignore
        let requestFullScreen = docEl.requestFullscreen;
        // || docEl.msRequestFullscreen ||
        // docEl.mozRequestFullScreen ||
        // docEl.webkitRequestFullscreen;
        let exitFullScreen = document.exitFullscreen;
        // ||document.msExitFullscreen ||
        //  document.mozCancelFullScreen ||
        //  document.webkitExitFullscreen;
        if (!requestFullScreen) {
            return;
        }

        if (!fullscreenElement) {
            requestFullScreen.call(docEl);
        } else {
            exitFullScreen.call(document);
        }
    }

    deleteMedia(): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFileNames = [];
        this.selectedFiles = undefined;
        this.previews = [];
    }

    searchBlogPost(): void {
        const modalRef: NgbModalRef = this.modalService.open(BlogLookupComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((blogPostInfo: any): void => {
            if (blogPostInfo) {
                this.actionUri = blogPostInfo.id;
                this.addNewContentBoxForm.controls['actionUrl'].setValue(blogPostInfo.id);
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
                this.addNewContentBoxForm.controls['actionUrl'].setValue(pageInfo.id);
            }
        }, (): void => {

        });
    }

    actionTypeSelectionChange(event: Event): void {
        this.selectedActionType = ((event.target as HTMLInputElement).value);
    }

    closeForm(): void {
        this.router.navigate(["/royan/boxManagement"]);
    }
}
