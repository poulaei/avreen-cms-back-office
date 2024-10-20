import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BlogTagModel} from "../blog-tags.model";
import {BlogTagsService} from "../blog-tags.service";

@Component({
    selector: 'app-edit-blog-tag',
    templateUrl: './edit-blog-tag.component.html',
    styleUrls: ['./edit-blog-tag.component.scss']
})
export class EditBlogTagComponent implements OnInit {

    @Input() tagId: string;
    editBlogTagForm: FormGroup;
    blogTagModel: BlogTagModel = new BlogTagModel();

    constructor(public formBuilder: FormBuilder,
                public blogTagsService: BlogTagsService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initBlogTagForm();
        this.loadBlogTag();
    }

    initBlogTagForm() {
        this.editBlogTagForm = this.formBuilder.group({
            name: [''],
            entityType: ['']
        });
    }

    loadBlogTag(): void {
        this.blogTagsService.getTagInfo(this.tagId).subscribe({
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

    editBlogTag(): void {
        this.blogTagsService.editTag(this.getFormValue(), this.tagId).subscribe({
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

    getFormValue(): BlogTagModel {
        this.blogTagModel.name = this.editBlogTagForm.controls['name'].value;
        this.blogTagModel.entityType = this.editBlogTagForm.controls['entityType'].value;
        this.blogTagModel.id = this.tagId;
        return this.blogTagModel;
    }

    setFormValue(blogTagModel: BlogTagModel): void {
        this.editBlogTagForm.controls['name'].setValue(blogTagModel.name);
        this.editBlogTagForm.controls['entityType'].setValue(blogTagModel.entityType);
        this.blogTagModel.concurrencyStamp = blogTagModel.concurrencyStamp;
    }
}
