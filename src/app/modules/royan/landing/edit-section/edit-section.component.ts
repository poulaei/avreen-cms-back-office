import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Box} from "../landing.model";
import {LandingService} from "../landing.service";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-edit-section',
    templateUrl: './edit-section.component.html',
    styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit {

    @Input() sectionId: string;
    editSectionForm: FormGroup;
    boxInfo: Box = new Box();

    constructor(public formBuilder: FormBuilder,
                public landingService: LandingService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initEditSectionForm();
        this.loadSectionInfo();
    }

    initEditSectionForm() {
        this.editSectionForm = this.formBuilder.group({
            section: [''],
            title: [''],
            action: [''],
            actionUrl: [''],
            summary: [''],
            description: ['']
        });
    }

    loadSectionInfo(): void {
        this.landingService.getSectionInfo(this.sectionId).subscribe({
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

    editSection(): void {
        this.landingService.editSection(this.getFormValue(), this.sectionId).subscribe({
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

    getFormValue(): Box {
        this.boxInfo.section = this.editSectionForm.controls['section'].value;
        this.boxInfo.title = this.editSectionForm.controls['title'].value;
        this.boxInfo.action = this.editSectionForm.controls['action'].value;
        this.boxInfo.actionUrl = this.editSectionForm.controls['actionUrl'].value;
        this.boxInfo.summary = this.editSectionForm.controls['summary'].value;
        this.boxInfo.description = this.editSectionForm.controls['description'].value;
        return this.boxInfo;
    }

    setFormValue(boxInfo: Box): void {
        this.editSectionForm.controls['section'].setValue(boxInfo.section);
        this.editSectionForm.controls['title'].setValue(boxInfo.title);
        this.editSectionForm.controls['action'].setValue(boxInfo.action);
        this.editSectionForm.controls['actionUrl'].setValue(boxInfo.actionUrl);
        this.editSectionForm.controls['summary'].setValue(boxInfo.summary);
        this.editSectionForm.controls['description'].setValue(boxInfo.description);
        this.boxInfo.concurrencyStamp = boxInfo.concurrencyStamp;
    }
}
