import {ChangeDetectorRef, Component, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BlogPostModel, BlogPostTagModel, ExtraProperties} from "../blog-post.model";
import {BlogCategoryModel} from "../../blog-category/blog-category.model";
import {DialogComponent} from "../../../box-management/edit-content-box/dialog.component";
import {EditorComponent} from "@progress/kendo-angular-editor";
import {BlogPostService} from "../blog-post.service";
import {BlogCategoryService} from "../../blog-category/blog-category.service";
import {ToastrService} from "ngx-toastr";
import {FileUploadService} from "../../../shared/shared-components/upload-image/file-upload.service";
import {FormControlService} from "../../../shared/shared-service/form-control.service";
import {fullscreenIcon} from "@progress/kendo-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {FontFamilyItem} from "@progress/kendo-angular-editor/common/font-family-item.interface";
import {PasteCleanupSettings} from "@progress/kendo-angular-editor/common/paste-cleanup-settings";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ContentBoxLookupComponent} from "../../../box-management/content-box-lookup/content-box-lookup.component";


@Component({
    selector: 'app-edit-blog',
    templateUrl: './edit-blog.component.html',
    styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements OnInit {

    protected readonly fullscreenIcon = fullscreenIcon;
    blogPostId: string = '';
    editBlogPostForm: FormGroup;
    blogPostModel: BlogPostModel = new BlogPostModel();
    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
    progressInfos: any[] = [];
    message: string[] = [];
    previews: string[] = [];
    blogCategoryList: BlogCategoryModel[] = [];
    value: string = '';
    @ViewChild("upload") public dialog: DialogComponent;
    @Output() @ViewChild("editor") public editor: EditorComponent;
    public pasteSettings: PasteCleanupSettings = {};

    constructor(public formBuilder: FormBuilder,
                public blogPostService: BlogPostService,
                public blogCategoryService: BlogCategoryService,
                public toasterService: ToastrService,
                public uploadService: FileUploadService,
                public formControlService: FormControlService,
                public changeDetectorRef: ChangeDetectorRef,
                public modalService: NgbModal,
                public router: Router,
                public route: ActivatedRoute) {
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
        this.route.params.subscribe(params => {
            this.blogPostId = params['blogPostId'];
        });
        this.getBLogCategoryList();
        this.initEditBlogPostForm();
        this.loadBlogPost();
    }

    initEditBlogPostForm(): void {
        this.editBlogPostForm = this.formBuilder.group({
            blogCategory: [''],
            title: [''],
            slug: [''],
            description: [''],
            content: [''],
            tags: [''],
            boxId: [''],
        });
    }

    loadBlogPost(): void {
        this.blogPostService.getBlogPostInfo(this.blogPostId).subscribe({
            next: (response: any): void => {
                if (!response.error) {
                    this.setFormValue(response);
                    // this.changeDetectorRef.detectChanges();
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

    setFormValue(blogPostModel: BlogPostModel): void {
        this.editBlogPostForm.controls['blogCategory'].setValue(blogPostModel.blogId);
        this.editBlogPostForm.controls['title'].setValue(blogPostModel.title);
        this.editBlogPostForm.controls['slug'].setValue(blogPostModel.slug);
        this.editBlogPostForm.controls['description'].setValue(blogPostModel.shortDescription);
        this.findTags(blogPostModel.id);
        this.value = blogPostModel.content;
        if (blogPostModel.coverImageMediaId) {
            this.blogPostService.getItemMedia(blogPostModel.coverImageMediaId).subscribe({
                next: (response: any): void => {
                    if (!response.error) {
                        this.blogPostModel.coverImageMediaId = blogPostModel.coverImageMediaId;
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
        if (blogPostModel.extraProperties) {
            if (blogPostModel.extraProperties.ContentBoxId) {
                this.editBlogPostForm.controls['boxId'].setValue(blogPostModel.extraProperties.ContentBoxId);
            }
        }
        this.blogPostModel.concurrencyStamp = blogPostModel.concurrencyStamp;
        this.blogPostModel.content = this.value;
    }

    private findTags(blogId: string): void {
        this.blogPostService.getBlogPostTags("BlogPost", blogId).subscribe({
            next: (response: any): void => {
                if (!response.error) {
                    let tags: string = "";
                    if (response && response.length > 0) {
                        for (let i = 0; i < response.length; i++) {
                            tags += response[i].name + ','
                        }
                        if (tags) {
                            tags = tags.substring(0, tags.length - 1);
                        }
                    }
                    this.editBlogPostForm.controls['tags'].setValue(tags);
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

    editBlogPost(): void {
        if (this.selectedFiles && this.selectedFiles[0]) {
            this.uploadFiles();
        } else {
            this.editBlogPostApi();
        }
    }

    private editBlogPostApi(): void {
        this.blogPostService.editBlogPost(this.getFormValue(), this.blogPostId).subscribe({
            next: (response: any): void => {
                if (response.id) {
                    let insertedTags = this.editBlogPostForm.controls['tags'].value;
                    let tags: string[] = insertedTags.split(',');
                    if (tags && tags.length > 0 && tags[0]) {
                        let blogPostTagModel: BlogPostTagModel = new BlogPostTagModel();
                        blogPostTagModel.entityType = 'BlogPost';
                        blogPostTagModel.entityId = this.blogPostId;
                        blogPostTagModel.tags = tags;
                        this.blogPostService.submitTags(blogPostTagModel).subscribe({
                            next: (response: any): void => {
                                if (!response.error) {
                                    this.toasterService.success('پست مورد نظر با موفقیت ویرایش شد');
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
                    } else {
                        this.toasterService.success('پست مورد نظر با موفقیت ویرایش شد');
                        this.closeForm();
                    }
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

    public openImageBrowser(): void {
        this.dialog.open();
    }

    public toggleFullScreen(): void {
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
            this.uploadService.upload(file, 'BlogPost').subscribe({
                next: (response: any): void => {
                    if (response && response.body && response.body.id) {
                        this.blogPostModel.coverImageMediaId = response.body.id;
                        this.editBlogPostApi();
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

    getFormValue(): BlogPostModel {
        this.blogPostModel.blogId = this.editBlogPostForm.controls['blogCategory'].value;
        this.blogPostModel.title = this.editBlogPostForm.controls['title'].value;
        this.blogPostModel.slug = this.editBlogPostForm.controls['slug'].value;
        this.blogPostModel.shortDescription = this.editBlogPostForm.controls['description'].value;
        this.blogPostModel.content = this.value;
        let boxId = this.editBlogPostForm.controls['boxId'].value;
        let extraProperties: ExtraProperties = new ExtraProperties();
        if (boxId) {
            extraProperties.ContentBoxId = boxId;
        }
        this.blogPostModel.extraProperties = extraProperties;
        return this.blogPostModel;
    }

    getBLogCategoryList(): void {
        this.blogCategoryService.getAllCategories().subscribe({
            next: (response: any) => {
                if (response.items) {
                    this.blogCategoryList = response.items;
                }
            }
        });
    }

    deleteMedia(): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFileNames = [];
        this.selectedFiles = undefined;
        this.previews = [];
    }

    closeForm(): void {
        this.router.navigate(["/royan/blog"]);
    }

    searchBox(): void {
        const modalRef: NgbModalRef = this.modalService.open(ContentBoxLookupComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((pageInfo: any): void => {
            if (pageInfo) {
                this.editBlogPostForm.controls['boxId'].setValue(pageInfo.id);
            }
        }, (): void => {

        });
    }
}
