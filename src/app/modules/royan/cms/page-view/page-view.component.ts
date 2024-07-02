import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudPageComponent} from "../../shared/shared-components/crud-page/crud-page.component";
import {CrudPageModel} from "../../shared/shared-components/crud-page/crud-page.model";
import {BaseTableModel} from "../../shared/shared-components/base-table/base-table.model";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {PageActionModel} from "../../shared/shared-components/crud-page/page-action.model";
import {BaseTableColumnModel} from "../../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {PageViewService} from "./page-view.service";
import {AddNewPageViewComponent} from "./add-new-page-view/add-new-page-view.component";

@Component({
    selector: 'app-page-view',
    templateUrl: './page-view.component.html',
    styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();

    constructor(public translate: TranslateService,
                public pageViewService: PageViewService,
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
                actionName: 'افزودن صفحه جدید',
                actionFunction: this.addPage
            }
        ]
        this.crudPageModel.crudPageHeader = 'مدیریت صفحات';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'title',
                columnName_Fa: 'عنوان صفحه',
                dataKey: 'title'
            },
            {
                columnDefinitionName: 'creationTime',
                columnName_Fa: 'زمان ایجاد',
                type: 'date',
                dataKey: 'creationTime'
            },
            {
                columnDefinitionName: 'lastModificationTime',
                columnName_Fa: 'اخرین زمان اصلاح',
                type: 'date',
                dataKey: 'lastModificationTime'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editPage
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deletePage
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.pageViewService.getAllPages();
    }

    addPage = (): void => {
        const modalRef: NgbModalRef = this.modalService.open(AddNewPageViewComponent, {
            centered: true
        });
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('صفحه جدید با موفقیت اضافه شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, (): void => {

        });
    }

    editPage = (element: any): void => {
        // const modalRef: NgbModalRef = this.modalService.open(EditBoxComponent, {
        //     centered: true,
        //     size: 'xl'
        // });
        // modalRef.componentInstance.boxId = element.id;
        // modalRef.result.then((isUpdated: boolean): void => {
        //     if (isUpdated) {
        //         this.toasterService.success('بخش مورد نظر با موفقیت ویرایش شد');
        //         this.crudPage.crudPageTable.refreshTableData();
        //     }
        // }, () => {
        //
        // });
    }

    deletePage = (element: any): void => {
        // const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
        //     centered: true
        // });
        // modalRef.componentInstance.confirmTitle = 'حذف دسته بندی';
        // modalRef.componentInstance.confirmMessage = 'آیا از حذف دسته بندی ' + element.name + ' مطمئن هستید؟';
        // modalRef.result.then((isDeleted: boolean) => {
        //     if (isDeleted) {
        //         this.blogService.deleteCategory(element.id).subscribe({
        //             next: (response: any): void => {
        //                 if (response) {
        //                     this.toasterService.success('دسته بندی مورد نظر با موفقیت حذف شد');
        //                     this.crudPage.crudPageTable.refreshTableData();
        //                 } else {
        //                     this.toasterService.error(response.error.message);
        //                 }
        //             },
        //             error: (exception): void => {
        //                 if (exception && exception.status == 404) {
        //                     this.toasterService.error('یافت نشد');
        //                 } else {
        //                     this.toasterService.error('خطای سیستمی');
        //                 }
        //             }
        //         });
        //     }
        // }, () => {
        //
        // });
    }
}
