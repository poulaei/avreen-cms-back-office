import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudPageComponent} from "../shared/shared-components/crud-page/crud-page.component";
import {CrudPageModel} from "../shared/shared-components/crud-page/crud-page.model";
import {BaseTableModel} from "../shared/shared-components/base-table/base-table.model";
import {TranslateService} from "@ngx-translate/core";
import {LandingService} from "./landing.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {PageActionModel} from "../shared/shared-components/crud-page/page-action.model";
import {BaseTableColumnModel} from "../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {AddNewSectionComponent} from "./add-new-section/add-new-section.component";
import {ConfirmModalComponent} from "../shared/shared-components/confirm-modal/confirm-modal.component";
import {EditSectionComponent} from "./edit-section/edit-section.component";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();

    constructor(public translate: TranslateService,
                public landingService: LandingService,
                public modalService: NgbModal,
                public toasterService: ToastrService) {

    }

    ngOnInit(): void {
        this.initCrudPage();
        this.initTableModel();
    }

    initCrudPage(): void {
        let pageActions: PageActionModel[];
        pageActions = [
            {
                actionName: 'افزودن بخش جدید',
                actionFunction: this.addNewSection
            }
        ]
        this.crudPageModel.crudPageHeader = 'مدیریت بخش های صفحه';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'section',
                columnName_Fa: 'نام بخش',
                dataKey: 'section'
            },
            {
                columnDefinitionName: 'title',
                columnName_Fa: 'عنوان',
                dataKey: 'title'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editHeater
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteHeater
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.landingService.getAllSections();
    }

    addNewSection = (): void => {
        const modalRef: NgbModalRef = this.modalService.open(AddNewSectionComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('بخش جدید با موفقیت اضافه شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, (): void => {

        });
    }

    editHeater = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(EditSectionComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.componentInstance.sectionId = element.id;
        modalRef.result.then((isUpdated: boolean) => {
            if (isUpdated) {
                this.toasterService.success('بخش مورد نظر با موفقیت ویرایش شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, () => {

        });
    }

    deleteHeater = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.componentInstance.confirmTitle = 'حذف بخش';
        modalRef.componentInstance.confirmMessage = 'آیا از حذف بخش ' + element.section + ' مطمئن هستید؟';
        modalRef.result.then((isDeleted: boolean) => {
            if (isDeleted) {
                this.landingService.deleteSection(element.id).subscribe({
                    next: (response: any): void => {
                        if (!response) {
                            this.toasterService.success('بخش مورد نظر با موفقیت حذف شد');
                            this.crudPage.crudPageTable.refreshTableData();
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
        }, () => {

        });
    }
}
