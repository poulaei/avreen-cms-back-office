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
import {AddNewBlogCategoryComponent} from "../blog-category/add-new-blog-category/add-new-blog-category.component";
import {EditBlogCategoryComponent} from "../blog-category/edit-blog-category/edit-blog-category.component";
import {ConfirmModalComponent} from "../../shared/shared-components/confirm-modal/confirm-modal.component";
import {BlogTagsService} from "./blog-tags.service";
import {AddNewBlogTagComponent} from "./add-new-blog-tag/add-new-blog-tag.component";
import {EditBlogTagComponent} from "./edit-blog-tag/edit-blog-tag.component";

@Component({
    selector: 'app-blog-tags',
    templateUrl: './blog-tags.component.html',
    styleUrls: ['./blog-tags.component.scss']
})
export class BlogTagsComponent implements OnInit {

    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();

    constructor(public translate: TranslateService,
                public blogTagsService: BlogTagsService,
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
                actionName: 'افزودن تگ جدید',
                actionFunction: this.addTag
            }
        ]
        this.crudPageModel.crudPageHeader = 'مدیریت تگ ها';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'name',
                columnName_Fa: 'نام تگ',
                dataKey: 'name'
            },
            {
                columnDefinitionName: 'entityType',
                columnName_Fa: 'نوع موجودیت',
                dataKey: 'entityType'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editTag
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteTag
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.blogTagsService.getAllTags();
    }

    addTag = (): void => {
        const modalRef: NgbModalRef = this.modalService.open(AddNewBlogTagComponent, {
            centered: true
        });
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('تگ جدید با موفقیت اضافه شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, (): void => {

        });
    }

    editTag = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(EditBlogTagComponent, {
            centered: true
        });
        modalRef.componentInstance.tagId = element.id;
        modalRef.result.then((isUpdated: boolean): void => {
            if (isUpdated) {
                this.toasterService.success('تگ مورد نظر با موفقیت ویرایش شد');
                this.crudPage.crudPageTable.refreshTableData();
            }
        }, () => {

        });
    }

    deleteTag = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.componentInstance.confirmTitle = 'حذف تگ';
        modalRef.componentInstance.confirmMessage = 'آیا از حذف تگ ' + element.name + ' مطمئن هستید؟';
        modalRef.result.then((isDeleted: boolean) => {
            if (isDeleted) {
                this.blogTagsService.deleteTag(element.id).subscribe({
                    next: (response: any): void => {
                        this.toasterService.success('تگ مورد نظر با موفقیت حذف شد');
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
