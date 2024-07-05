import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ExtraProperties, MenuManagementModel} from "../menu-management.model";
import {MenuManagementService} from "../menu-management.service";
import {ContentBoxLookupComponent} from "../../box-management/content-box-lookup/content-box-lookup.component";

@Component({
    selector: 'app-add-sub-menu',
    templateUrl: './add-sub-menu.component.html',
    styleUrls: ['./add-sub-menu.component.scss']
})
export class AddSubMenuComponent implements OnInit {

    @Input() parentId: string;
    addNewMenuForm: FormGroup;
    menuManagementModel: MenuManagementModel = new MenuManagementModel();
    selectedMenuType: string = '';
    boxId: string = '';

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
        this.menuManagementModel.parentId = this.parentId;
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
        let contentBoxId = this.addNewMenuForm.controls['boxId'].value;
        let extraProperties: ExtraProperties = new ExtraProperties();
        if (group) {
            extraProperties.Group = group;
        }
        if (displayPlace) {
            extraProperties.DisplayPlace = displayPlace;
        }
        if (contentBoxId) {
            extraProperties.ContentBoxId = contentBoxId;
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
