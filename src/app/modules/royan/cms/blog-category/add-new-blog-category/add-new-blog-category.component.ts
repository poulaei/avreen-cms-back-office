import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BlogCategoryModel} from "../blog-category.model";
import {BlogCategoryService} from "../blog-category.service";

@Component({
    selector: 'app-add-new-blog-category',
    templateUrl: './add-new-blog-category.component.html',
    styleUrls: ['./add-new-blog-category.component.scss']
})
export class AddNewBlogCategoryComponent implements OnInit {

    addNewBlogCategoryForm: FormGroup;
    blogCategoryModel: BlogCategoryModel = new BlogCategoryModel();

    constructor(public formBuilder: FormBuilder,
                public blogCategoryService: BlogCategoryService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initAddNewBlogCategoryForm();
    }

    initAddNewBlogCategoryForm(): void {
        this.addNewBlogCategoryForm = this.formBuilder.group({
            name: [''],
            slug: ['']
        });
    }

    addNewBlogCategory(): void {
        this.blogCategoryService.addNewCategory(this.getFormValue()).subscribe({
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
    }

    getFormValue(): BlogCategoryModel {
        this.blogCategoryModel.name = this.addNewBlogCategoryForm.controls['name'].value;
        this.blogCategoryModel.slug = this.addNewBlogCategoryForm.controls['slug'].value;
        return this.blogCategoryModel;
    }
}
