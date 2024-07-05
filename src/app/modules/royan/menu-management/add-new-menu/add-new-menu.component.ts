import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ExtraProperties, MenuManagementModel} from "../menu-management.model";
import {MenuManagementService} from "../menu-management.service";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ContentBoxLookupComponent} from "../../box-management/content-box-lookup/content-box-lookup.component";

@Component({
    selector: 'app-add-new-menu',
    templateUrl: './add-new-menu.component.html',
    styleUrls: ['./add-new-menu.component.scss']
})
export class AddNewMenuComponent implements OnInit {

    addNewMenuForm: FormGroup;
    menuManagementModel: MenuManagementModel = new MenuManagementModel();
    selectedMenuType: string = '';

    constructor(public formBuilder: FormBuilder,
                public menuManagementService: MenuManagementService,
                public toasterService: ToastrService,
                public modalService: NgbModal,
                public formControlService: FormControlService,
                public modal: NgbActiveModal) {

    }

    ngOnInit(): void {
        this.initAddNewMenuForm();
    }

    initAddNewMenuForm(): void {
        this.addNewMenuForm = this.formBuilder.group({
            displayName: [''],
            url: [''],
            Group: [''],
            boxId: [''],
            DisplayPlace: ['']
        });
    }

    addNewMenu(): void {
        this.menuManagementService.addNewMenu(this.getFormValue()).subscribe({
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

    getFormValue(): MenuManagementModel {
        this.menuManagementModel.displayName = this.addNewMenuForm.controls['displayName'].value;
        this.menuManagementModel.url = this.addNewMenuForm.controls['url'].value;
        let group = this.addNewMenuForm.controls['Group'].value;
        let displayPlace = this.addNewMenuForm.controls['DisplayPlace'].value;
        let extraProperties: ExtraProperties = new ExtraProperties();
        if (group) {
            extraProperties.Group = group;
        }
        if (displayPlace) {
            extraProperties.DisplayPlace = displayPlace;
        }
        this.menuManagementModel.extraProperties = extraProperties;
        return this.menuManagementModel;
    }

    menuTypeSelectionChange(event: Event): void {
        this.addNewMenuForm.controls['boxId'].setValue('');
        this.selectedMenuType = ((event.target as HTMLInputElement).value);
    }

    searchBox(): void {
        const modalRef: NgbModalRef = this.modalService.open(ContentBoxLookupComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((pageInfo: any): void => {
            if (pageInfo) {
                this.addNewMenuForm.controls['boxId'].setValue(pageInfo.id);
            }
        }, (): void => {

        });
    }
}
