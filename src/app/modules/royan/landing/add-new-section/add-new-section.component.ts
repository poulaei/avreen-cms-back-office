import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Box} from "../landing.model";
import {LandingService} from "../landing.service";
import {ToastrService} from "ngx-toastr";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControlService} from "../../shared/shared-service/form-control.service";

@Component({
    selector: 'app-add-new-section',
    templateUrl: './add-new-section.component.html',
    styleUrls: ['./add-new-section.component.scss']
})
export class AddNewSectionComponent implements OnInit {

    addNewSectionForm: FormGroup;
    boxInfo: Box = new Box();

    constructor(public formBuilder: FormBuilder,
                public landingService: LandingService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initAddNewSectionForm();
    }

    initAddNewSectionForm(): void {
        this.addNewSectionForm = this.formBuilder.group({
            section: [''],
            title: [''],
            action: [''],
            actionUrl: [''],
            summary: [''],
            description: ['']
        });
    }

    addNewSection(): void {
        this.landingService.addNewSection(this.getFormValue()).subscribe({
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

    getFormValue(): Box {
        this.boxInfo.section = this.addNewSectionForm.controls['section'].value;
        this.boxInfo.title = this.addNewSectionForm.controls['title'].value;
        this.boxInfo.action = this.addNewSectionForm.controls['action'].value;
        this.boxInfo.actionUrl = this.addNewSectionForm.controls['actionUrl'].value;
        this.boxInfo.summary = this.addNewSectionForm.controls['summary'].value;
        this.boxInfo.description = this.addNewSectionForm.controls['description'].value;
        return this.boxInfo;
    }
}
