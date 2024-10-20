import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BlogTagModel} from "../blog-tags.model";
import {BlogTagsService} from "../blog-tags.service";

@Component({
    selector: 'app-add-new-blog-tag',
    templateUrl: './add-new-blog-tag.component.html',
    styleUrls: ['./add-new-blog-tag.component.scss']
})
export class AddNewBlogTagComponent implements OnInit {

    addNewBlogTagForm: FormGroup;
    blogTagModel: BlogTagModel = new BlogTagModel();

    constructor(public formBuilder: FormBuilder,
                public blogTagsService: BlogTagsService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initAddNewBlogTagForm();
    }

    initAddNewBlogTagForm(): void {
        this.addNewBlogTagForm = this.formBuilder.group({
            name: [''],
            entityType: ['']
        });
    }

    addNewBlogTag(): void {
        this.blogTagsService.addNewTag(this.getFormValue()).subscribe({
            next: (response: any): void => {
                if (response.id) {
                    this.modal.close(true);
                } else {
                    this.toasterService.error(response.error.message);
                }
            },
            error: (exception): void => {
                if (exception.error != null) {
                    this.toasterService.error(exception.error.error.details);
                }
            }
        });
    }

    getFormValue(): BlogTagModel {
        this.blogTagModel.name = this.addNewBlogTagForm.controls['name'].value;
        this.blogTagModel.entityType = this.addNewBlogTagForm.controls['entityType'].value;
        return this.blogTagModel;
    }
}
