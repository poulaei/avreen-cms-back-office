import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BoxService} from "../box.service";
import {Box} from "../box.model";

@Component({
    selector: 'app-edit-box',
    templateUrl: './edit-box.component.html',
    styleUrls: ['./edit-box.component.scss']
})
export class EditBoxComponent implements OnInit {

    @Input() boxId: string;
    editBoxForm: FormGroup;
    boxInfo: Box = new Box();

    constructor(public formBuilder: FormBuilder,
                public boxService: BoxService,
                public toasterService: ToastrService,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initEditBoxForm();
        this.loadBoxInfo();
    }

    initEditBoxForm() {
        this.editBoxForm = this.formBuilder.group({
            section: [''],
            title: [''],
            action: [''],
            actionUrl: [''],
            summary: [''],
            description: ['']
        });
    }

    loadBoxInfo(): void {
        this.boxService.getBoxInfo(this.boxId).subscribe({
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

    editBox(): void {
        this.boxService.editBox(this.getFormValue(), this.boxId).subscribe({
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
        this.boxInfo.section = this.editBoxForm.controls['section'].value;
        this.boxInfo.title = this.editBoxForm.controls['title'].value;
        this.boxInfo.action = this.editBoxForm.controls['action'].value;
        this.boxInfo.actionUrl = this.editBoxForm.controls['actionUrl'].value;
        this.boxInfo.summary = this.editBoxForm.controls['summary'].value;
        this.boxInfo.description = this.editBoxForm.controls['description'].value;
        this.boxInfo.id = this.boxId;
        return this.boxInfo;
    }

    setFormValue(boxInfo: Box): void {
        this.editBoxForm.controls['section'].setValue(boxInfo.section);
        this.editBoxForm.controls['title'].setValue(boxInfo.title);
        this.editBoxForm.controls['action'].setValue(boxInfo.action);
        this.editBoxForm.controls['actionUrl'].setValue(boxInfo.actionUrl);
        this.editBoxForm.controls['summary'].setValue(boxInfo.summary);
        this.editBoxForm.controls['description'].setValue(boxInfo.description);
        this.boxInfo.concurrencyStamp = boxInfo.concurrencyStamp;
    }
}
