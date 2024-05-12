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
import {SystemRoleService} from "./system-role.service";

@Component({
    selector: 'app-system-role',
    templateUrl: './system-role.component.html',
    styleUrls: ['./system-role.component.scss']
})
export class SystemRoleComponent implements OnInit {

    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();

    constructor(public translate: TranslateService,
                public systemRoleService: SystemRoleService,
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
                actionName: 'افزودن نقش',
                actionFunction: this.addNewRole
            }
        ]
        this.crudPageModel.crudPageHeader = 'نقش های سیستم';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'name',
                columnName_Fa: 'نام نقش',
                dataKey: 'name'
            },
            {
                columnDefinitionName: 'isDefault',
                columnName_Fa: 'پیشفرض',
                dataKey: 'isDefault'
            },
            {
                columnDefinitionName: 'isPublic',
                columnName_Fa: 'عمومی',
                dataKey: 'isPublic'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editRole
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteRole
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.systemRoleService.getAllRoles();
    }

    addNewRole = (): void => {
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

    editRole = (element: any): void => {
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

    deleteRole = (element: any): void => {
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
