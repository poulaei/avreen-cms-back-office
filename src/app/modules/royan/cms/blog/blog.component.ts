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
import {BlogService} from "./blog.service";
import {AddNewBlogComponent} from "./add-new-blog/add-new-blog.component";
import {EditBlogComponent} from "./edit-blog/edit-blog.component";
import {ConfirmModalComponent} from "../../shared/shared-components/confirm-modal/confirm-modal.component";

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();

    constructor(public translate: TranslateService,
                public blogService: BlogService,
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
                actionName: 'افزودن پست جدید',
                actionFunction: this.addBlog
            }
        ]
        this.crudPageModel.crudPageHeader = 'پست های بلاگ';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'blogName',
                columnName_Fa: 'نام دسته بندی',
                dataKey: 'blogName'
            },
            {
                columnDefinitionName: 'title',
                columnName_Fa: 'عنوان پست',
                dataKey: 'title'
            },
            {
                columnDefinitionName: 'creationTime',
                columnName_Fa: 'زمان ایجاد',
                type: 'date',
                dataKey: 'creationTime'
            },
            {
                columnDefinitionName: 'status',
                columnName_Fa: 'وضعیت',
                dataKey: 'status'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editBlog
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteBlog
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.blogService.getAllBlogPosts();
    }

    addBlog = (): void => {
        const modalRef: NgbModalRef = this.modalService.open(AddNewBlogComponent, {
            centered: true
        });
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('پست جدید با موفقیت اضافه شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, (): void => {

        });
    }

    editBlog = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(EditBlogComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.componentInstance.boxId = element.id;
        modalRef.result.then((isUpdated: boolean): void => {
            if (isUpdated) {
                this.toasterService.success('پست مورد نظر با موفقیت ویرایش شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, () => {

        });
    }

    deleteBlog = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.componentInstance.confirmTitle = 'حذف پست';
        modalRef.componentInstance.confirmMessage = 'آیا از حذف پست ' + element.name + ' مطمئن هستید؟';
        modalRef.result.then((isDeleted: boolean) => {
            if (isDeleted) {
                this.blogService.deleteBlogPost(element.id).subscribe({
                    next: (response: any): void => {
                        if (response) {
                            this.toasterService.success('پست مورد نظر با موفقیت حذف شد');
                            this.crudPage.crudPageTable.refreshTableData();
                        } else {
                            this.toasterService.error(response.error.message);
                        }
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
