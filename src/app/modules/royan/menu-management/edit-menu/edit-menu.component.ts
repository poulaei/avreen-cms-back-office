import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {FormControlService} from "../../shared/shared-service/form-control.service";
import {NgbActiveModal, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ExtraProperties, MenuManagementModel} from "../menu-management.model";
import {MenuManagementService} from "../menu-management.service";
import {ContentBoxLookupComponent} from "../../box-management/content-box-lookup/content-box-lookup.component";

@Component({
    selector: 'app-edit-menu',
    templateUrl: './edit-menu.component.html',
    styleUrls: ['./edit-menu.component.scss']
})
export class EditMenuComponent implements OnInit {

    @Input() menuId: string;
    editMenuForm: FormGroup;
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
        this.initMenuForm();
        this.loadMenuInfo();
    }

    initMenuForm() {
        this.editMenuForm = this.formBuilder.group({
            displayName: [''],
            url: [''],
            Group: [''],
            boxId: [''],
            DisplayPlace: ['']
        });
    }

    loadMenuInfo(): void {
        this.menuManagementService.getMenuInfo(this.menuId).subscribe({
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

    editMenu(): void {
        this.menuManagementService.editMenu(this.getFormValue(), this.menuId).subscribe({
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

    getFormValue(): MenuManagementModel {
        this.menuManagementModel.displayName = this.editMenuForm.controls['displayName'].value;
        this.menuManagementModel.url = this.editMenuForm.controls['url'].value;
        let group = this.editMenuForm.controls['Group'].value;
        let displayPlace = this.editMenuForm.controls['DisplayPlace'].value;
        let contentBoxId = this.editMenuForm.controls['boxId'].value;
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
        this.menuManagementModel.id = this.menuId;
        return this.menuManagementModel;
    }

    setFormValue(menuManagementModel: MenuManagementModel): void {
        this.editMenuForm.controls['displayName'].setValue(menuManagementModel.displayName);
        this.editMenuForm.controls['url'].setValue(menuManagementModel.url);
        if (menuManagementModel.extraProperties) {
            if (menuManagementModel.extraProperties.Group) {
                this.editMenuForm.controls['Group'].setValue(menuManagementModel.extraProperties.Group);
                this.selectedMenuType = menuManagementModel.extraProperties.Group;
            }
            if (menuManagementModel.extraProperties.DisplayPlace) {
                this.editMenuForm.controls['DisplayPlace'].setValue(menuManagementModel.extraProperties.DisplayPlace);
            }
            if (menuManagementModel.extraProperties.ContentBoxId) {
                this.editMenuForm.controls['boxId'].setValue(menuManagementModel.extraProperties.ContentBoxId);
            }
        }
        this.menuManagementModel.concurrencyStamp = menuManagementModel.concurrencyStamp;
    }

    menuTypeSelectionChange(event: Event): void {
        this.editMenuForm.controls['boxId'].setValue('');
        this.selectedMenuType = ((event.target as HTMLInputElement).value);
    }

    searchBox(): void {
        const modalRef: NgbModalRef = this.modalService.open(ContentBoxLookupComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((pageInfo: any): void => {
            if (pageInfo) {
                this.editMenuForm.controls['boxId'].setValue(pageInfo.id);
            }
        }, (): void => {

        });
    }
}
