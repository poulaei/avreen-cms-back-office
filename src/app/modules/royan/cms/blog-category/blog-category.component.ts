import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudPageComponent} from "../../shared/shared-components/crud-page/crud-page.component";
import {CrudPageModel} from "../../shared/shared-components/crud-page/crud-page.model";
import {BaseTableModel} from "../../shared/shared-components/base-table/base-table.model";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {BlogCategoryService} from "./blog-category.service";
import {PageActionModel} from "../../shared/shared-components/crud-page/page-action.model";
import {BaseTableColumnModel} from "../../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {AddNewBlogCategoryComponent} from "./add-new-blog-category/add-new-blog-category.component";
import {ConfirmModalComponent} from "../../shared/shared-components/confirm-modal/confirm-modal.component";
import {EditBlogCategoryComponent} from "./edit-blog-category/edit-blog-category.component";

@Component({
    selector: 'app-blog-category',
    templateUrl: './blog-category.component.html',
    styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent implements OnInit {

    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();

    constructor(public translate: TranslateService,
                public blogCategoryService: BlogCategoryService,
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
                actionName: 'افزودن دسته بندی جدید',
                actionFunction: this.addCategory
            }
        ]
        this.crudPageModel.crudPageHeader = 'دسته بندی های بلاگ';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'name',
                columnName_Fa: 'نام دسته بندی',
                dataKey: 'name'
            },
            {
                columnDefinitionName: 'slug',
                columnName_Fa: 'کلید نمایش در آدرس',
                dataKey: 'slug'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editCategory
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteCategory
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.blogCategoryService.getAllCategories();
    }

    addCategory = (): void => {
        const modalRef: NgbModalRef = this.modalService.open(AddNewBlogCategoryComponent, {
            centered: true
        });
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('دسته بندی جدید با موفقیت اضافه شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, (): void => {

        });
    }

    editCategory = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(EditBlogCategoryComponent, {
            centered: true
        });
        modalRef.componentInstance.categoryId = element.id;
        modalRef.result.then((isUpdated: boolean): void => {
            if (isUpdated) {
                this.toasterService.success('دسته بندی مورد نظر با موفقیت ویرایش شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, () => {

        });
    }

    deleteCategory = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.componentInstance.confirmTitle = 'حذف دسته بندی';
        modalRef.componentInstance.confirmMessage = 'آیا از حذف دسته بندی ' + element.name + ' مطمئن هستید؟';
        modalRef.result.then((isDeleted: boolean) => {
            if (isDeleted) {
                this.blogCategoryService.deleteCategory(element.id).subscribe({
                    next: (response: any): void => {
                        this.toasterService.success('دسته بندی مورد نظر با موفقیت حذف شد');
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
