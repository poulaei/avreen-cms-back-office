import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BlogCategoryModel} from "../blog-category.model";
import {BlogCategoryService} from "../blog-category.service";

@Component({
    selector: 'app-edit-blog-category',
    templateUrl: './edit-blog-category.component.html',
    styleUrls: ['./edit-blog-category.component.scss']
})
export class EditBlogCategoryComponent implements OnInit {

    @Input() categoryId: string;
    editBlogCategoryForm: FormGroup;
    blogCategoryModel: BlogCategoryModel = new BlogCategoryModel();

    constructor(public formBuilder: FormBuilder,
                public blogCategoryService: BlogCategoryService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initBlogCategoryForm();
        this.loadBlogCategory();
    }

    initBlogCategoryForm() {
        this.editBlogCategoryForm = this.formBuilder.group({
            name: [''],
            slug: ['']
        });
    }

    loadBlogCategory(): void {
        this.blogCategoryService.getCategoryInfo(this.categoryId).subscribe({
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

    editBlogCategory(): void {
        this.blogCategoryService.editCategory(this.getFormValue(), this.categoryId).subscribe({
            next: (response: any): void => {
                if (response.id) {
                    this.modal.close(true);
                } else {
                    this.toasterService.error(response.error.message);
                }
            },
            error: (exception): void => {
                if (exception.error != null) {
                    this.toasterService.error(exception.error.error.message);
                }
            }
        });
    }

    getFormValue(): BlogCategoryModel {
        this.blogCategoryModel.name = this.editBlogCategoryForm.controls['name'].value;
        this.blogCategoryModel.slug = this.editBlogCategoryForm.controls['slug'].value;
        this.blogCategoryModel.id = this.categoryId;
        return this.blogCategoryModel;
    }

    setFormValue(blogCategoryModel: BlogCategoryModel): void {
        this.editBlogCategoryForm.controls['name'].setValue(blogCategoryModel.name);
        this.editBlogCategoryForm.controls['slug'].setValue(blogCategoryModel.slug);
        this.blogCategoryModel.concurrencyStamp = blogCategoryModel.concurrencyStamp;
    }
}
