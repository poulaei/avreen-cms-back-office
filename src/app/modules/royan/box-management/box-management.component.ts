import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {BoxManagementService} from "./box-management.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CrudPageComponent} from "../shared/shared-components/crud-page/crud-page.component";
import {CrudPageModel} from "../shared/shared-components/crud-page/crud-page.model";
import {BaseTableModel} from "../shared/shared-components/base-table/base-table.model";
import {TranslateService} from "@ngx-translate/core";
import {PageActionModel} from "../shared/shared-components/crud-page/page-action.model";
import {BaseTableColumnModel} from "../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {AddNewContentBoxComponent} from "./add-new-content-box/add-new-content-box.component";
import {Router} from "@angular/router";
import {ConfirmModalComponent} from "../shared/shared-components/confirm-modal/confirm-modal.component";

@Component({
    selector: 'app-box-management',
    templateUrl: './box-management.component.html',
    styleUrls: ['./box-management.component.scss']
})
export class BoxManagementComponent implements OnInit {

    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();


    constructor(public boxManagementService: BoxManagementService,
                public modalService: NgbModal,
                public translate: TranslateService,
                public router: Router,
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
                actionName: 'افزودن باکس جدید',
                actionFunction: this.addContentBox
            }
        ]
        this.crudPageModel.crudPageHeader = 'مدیریت باکس ها';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'section',
                columnName_Fa: 'نام باکس',
                dataKey: 'section'
            },
            {
                columnDefinitionName: 'boxType',
                columnName_Fa: 'نوع باکس',
                dataKey: 'boxType'
            },
            {
                columnDefinitionName: 'description',
                columnName_Fa: 'توضیحات',
                dataKey: 'description'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.INFO'),
                actionIcon: 'pencil',
                actionFunction: this.viewContentBoxDetail
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteContentBox
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.boxManagementService.getContentBoxRoot();
    }

    addContentBox = (): void => {
        const modalRef: NgbModalRef = this.modalService.open(AddNewContentBoxComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('باکس جدید با موفقیت اضافه شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, (): void => {

        });
    }

    viewContentBoxDetail = (element: any): void => {
        this.router.navigate(["/royan/boxDetail", element.id]);
    }

    deleteContentBox = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.componentInstance.confirmTitle = 'حذف باکس';
        modalRef.componentInstance.confirmMessage = 'آیا از حذف باکس مطمئن هستید؟';
        modalRef.result.then((isDeleted: boolean) => {
            if (isDeleted) {
                this.boxManagementService.deleteContentBox(element.id).subscribe({
                    next: (response: any): void => {
                        this.toasterService.success('باکس مورد نظر با موفقیت حذف شد');
                        this.crudPage.crudPageTable.refreshTableData();
                    },
                    error: (exception): void => {
                        if (exception && exception.status == 404) {
                            this.toasterService.error('یافت نشد');
                        } else {
                            this.toasterService.error('خطای سیستمی');
                        }
                    }
                });
            }
        }, () => {

        });
    }
}
