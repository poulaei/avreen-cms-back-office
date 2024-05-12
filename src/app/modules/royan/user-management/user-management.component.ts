import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudPageComponent} from "../shared/shared-components/crud-page/crud-page.component";
import {CrudPageModel} from "../shared/shared-components/crud-page/crud-page.model";
import {BaseTableModel} from "../shared/shared-components/base-table/base-table.model";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {PageActionModel} from "../shared/shared-components/crud-page/page-action.model";
import {BaseTableColumnModel} from "../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {UserManagementService} from "./user-management.service";

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();

    constructor(public translate: TranslateService,
                public userManagementService: UserManagementService,
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
                actionName: 'افزودن کاربر',
                actionFunction: this.addNewUser
            }
        ]
        this.crudPageModel.crudPageHeader = 'کاربران سیستم';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'userName',
                columnName_Fa: 'نام کاربری',
                dataKey: 'userName'
            },
            {
                columnDefinitionName: 'name',
                columnName_Fa: 'نام',
                dataKey: 'name'
            },
            {
                columnDefinitionName: 'surname',
                columnName_Fa: 'نام خانوادگی',
                dataKey: 'surname'
            },
            {
                columnDefinitionName: 'email',
                columnName_Fa: 'ایمیل',
                dataKey: 'email'
            },
            {
                columnDefinitionName: 'phoneNumber',
                columnName_Fa: 'موبایل',
                dataKey: 'phoneNumber'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editUser
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteUser
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.userManagementService.getAllUsers();
    }

    addNewUser = (): void => {
        // const modalRef: NgbModalRef = this.modalService.open(AddNewSectionComponent, {
        //     centered: true,
        //     size: 'xl'
        // });
        // modalRef.result.then((isCreate: boolean) => {
        //     if (isCreate) {
        //         this.toasterService.success('کاربر جدید با موفقیت اضافه شد');
        //         this.crudPage.crudPageTable.refreshTableData();
        //     }
        // }, (): void => {
        //
        // });
    }

    editUser = (element: any): void => {
        // const modalRef: NgbModalRef = this.modalService.open(EditSectionComponent, {
        //     centered: true,
        //     size: 'xl'
        // });
        // modalRef.componentInstance.sectionId = element.id;
        // modalRef.result.then((isUpdated: boolean) => {
        //     if (isUpdated) {
        //         this.toasterService.success('بخش مورد نظر با موفقیت ویرایش شد');
        //         this.crudPage.crudPageTable.refreshTableData();
        //     }
        // }, () => {
        //
        // });
    }

    deleteUser = (element: any): void => {
        // const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
        //     centered: true
        // });
        // modalRef.componentInstance.confirmTitle = 'حذف بخش';
        // modalRef.componentInstance.confirmMessage = 'آیا از حذف بخش ' + element.section + ' مطمئن هستید؟';
        // modalRef.result.then((isDeleted: boolean) => {
        //     if (isDeleted) {
        //         this.userManagementService.deleteSection(element.id).subscribe({
        //             next: (response: any): void => {
        //                 if (!response) {
        //                     this.toasterService.success('بخش مورد نظر با موفقیت حذف شد');
        //                     this.crudPage.crudPageTable.refreshTableData();
        //                 } else {
        //                     this.toasterService.error(response.error.message);
        //                 }
        //             },
        //             error: (exception): void => {
        //                 if (exception.error != null) {
        //                     this.toasterService.error(exception.error.message);
        //                 }
        //             }
        //         });
        //     }
        // }, () => {
        //
        // });
    }
}
