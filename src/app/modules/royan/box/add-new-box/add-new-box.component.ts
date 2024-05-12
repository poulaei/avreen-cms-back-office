import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Box} from "../box.model";
import {BoxService} from "../box.service";

@Component({
    selector: 'app-add-new-box',
    templateUrl: './add-new-box.component.html',
    styleUrls: ['./add-new-box.component.scss']
})
export class AddNewBoxComponent implements OnInit {

    addNewBoxForm: FormGroup;
    boxInfo: Box = new Box();

    constructor(public formBuilder: FormBuilder,
                public boxService: BoxService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initAddNewBoxForm();
    }

    initAddNewBoxForm(): void {
        this.addNewBoxForm = this.formBuilder.group({
            section: [''],
            title: [''],
            action: [''],
            actionUrl: [''],
            summary: [''],
            description: ['']
        });
    }

    addNewBox(): void {
        this.boxService.addNewBox(this.getFormValue()).subscribe({
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
        this.boxInfo.section = this.addNewBoxForm.controls['section'].value;
        this.boxInfo.title = this.addNewBoxForm.controls['title'].value;
        this.boxInfo.action = this.addNewBoxForm.controls['action'].value;
        this.boxInfo.actionUrl = this.addNewBoxForm.controls['actionUrl'].value;
        this.boxInfo.summary = this.addNewBoxForm.controls['summary'].value;
        this.boxInfo.description = this.addNewBoxForm.controls['description'].value;
        return this.boxInfo;
    }
}
