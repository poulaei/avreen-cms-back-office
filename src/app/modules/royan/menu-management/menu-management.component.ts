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
import {MenuManagementService} from "./menu-management.service";
import {ImageService} from "./image-service";
import {HttpClient} from "@angular/common/http";


@Component({
    selector: 'app-menu-management',
    templateUrl: './menu-management.component.html',
    styleUrls: ['./menu-management.component.scss']
})
export class MenuManagementComponent implements OnInit {

    public editorConfig: any = {
        height: 500,
        menubar: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        images_upload_handler: function (blobInfo: any, success: any, failure: any) {
            console.log('fwefwefwfwefwefwefwe');
        }
    };



    @ViewChild("crudPage") crudPage: CrudPageComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();
    tableModel: BaseTableModel = new BaseTableModel();

    constructor(public translate: TranslateService,
                private http: HttpClient,
                private imageService: ImageService,
                public menuManagementService: MenuManagementService,
                public modalService: NgbModal,
                public toasterService: ToastrService,) {

    }

    ngOnInit(): void {
        this.initCrudPage();
        this.initTableModel();
    }

    initCrudPage(): void {
        let pageActions: PageActionModel[];
        pageActions = [
            {
                actionName: 'افزودن منو',
                actionFunction: this.addNewMenu
            }
        ]
        this.crudPageModel.crudPageHeader = 'مدیریت منو';
        this.crudPageModel.pageActions = pageActions;
    }

    initTableModel(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'displayName',
                columnName_Fa: 'نام',
                dataKey: 'displayName'
            },
            {
                columnDefinitionName: 'url',
                columnName_Fa: 'آدرس',
                dataKey: 'url'
            },
            {
                columnDefinitionName: 'isActive',
                columnName_Fa: 'فعال',
                dataKey: 'isActive'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = [
            {
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editMenu
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteMenu
            }
        ]
        this.tableModel.hasGridAction = true;
        this.tableModel.selectable = false;
        this.tableModel.autoSearch = true;
        this.tableModel.tableColumns = tableColumns;
        this.tableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.menuManagementService.getAllMenus();
    }

    addNewMenu = (): void => {
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

    editMenu = (element: any): void => {
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

    deleteMenu = (element: any): void => {
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
    protected readonly toolbar = toolbar;
}
