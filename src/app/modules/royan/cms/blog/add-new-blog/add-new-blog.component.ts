import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BlogPostModel} from "../blog-post.model";
import {BlogPostService} from "../blog-post.service";
import {FileUploadService} from "../../../shared/shared-components/upload-image/file-upload.service";
import {BlogCategoryModel} from "../../blog-category/blog-category.model";
import {BlogCategoryService} from "../../blog-category/blog-category.service";

@Component({
    selector: 'app-add-new-blog',
    templateUrl: './add-new-blog.component.html',
    styleUrls: ['./add-new-blog.component.scss']
})
export class AddNewBlogComponent implements OnInit {

    addNewBlogPostForm: FormGroup;
    blogPostModel: BlogPostModel = new BlogPostModel();
    selectedFiles?: FileList;
    selectedFileNames: string[] = [];
    progressInfos: any[] = [];
    message: string[] = [];
    previews: string[] = [];
    blogCategoryList: BlogCategoryModel[] = [];


    constructor(public formBuilder: FormBuilder,
                public blogPostService: BlogPostService,
                public blogCategoryService: BlogCategoryService,
                public toasterService: ToastrService,
                public uploadService: FileUploadService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

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

    ngOnInit(): void {
        this.initAddNewBlogPostForm();
        this.getBLogCategoryList();
    }

    initAddNewBlogPostForm(): void {
        this.addNewBlogPostForm = this.formBuilder.group({
            blogCategory: [''],
            title: [''],
            slug: [''],
            description: [''],
            content: [''],
            tags: [''],
        });
    }

    addNewBlogPost(): void {
        this.uploadFiles();
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
                        this.blogPostModel.coverImageMediaId = response.body.id;
                        this.blogPostService.addNewBlogPost(this.getFormValue()).subscribe({
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

    getFormValue(): BlogPostModel {
        this.blogPostModel.blogId = this.addNewBlogPostForm.controls['blogCategory'].value;
        // this.blogPostModel.tag = this.addNewBlogPostForm.controls['slug'].value;
        this.blogPostModel.title = this.addNewBlogPostForm.controls['title'].value;
        this.blogPostModel.slug = this.addNewBlogPostForm.controls['slug'].value;
        this.blogPostModel.shortDescription = this.addNewBlogPostForm.controls['description'].value;
        this.blogPostModel.content = this.addNewBlogPostForm.controls['content'].value;
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
}
