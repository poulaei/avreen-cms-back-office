import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../shared/shared-components/base-table/base-table.component";
import {BaseTableModel} from "../shared/shared-components/base-table/base-table.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {BaseTableColumnModel} from "../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {BoxItemsService} from "./box-items.service";
import {BoxLookupComponent} from "../box/box-lookup/box-lookup.component";
import {AddNewBoxItemComponent} from "./add-new-box-item/add-new-box-item.component";
import {ConfirmModalComponent} from "../shared/shared-components/confirm-modal/confirm-modal.component";
import {EditBoxItemComponent} from "./edit-box-item/edit-box-item.component";

@Component({
    selector: 'app-box-items',
    templateUrl: './box-items.component.html',
    styleUrls: ['./box-items.component.scss']
})
export class BoxItemsComponent implements OnInit {

    @ViewChild("boxItemsTable") boxItemsTable: BaseTableComponent;
    boxItemsTableModel: BaseTableModel = new BaseTableModel();
    filterForm: FormGroup;
    boxId: string;

    constructor(public formBuilder: FormBuilder,
                public toasterService: ToastrService,
                public translate: TranslateService,
                public boxItemsService: BoxItemsService,
                public modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.createFilterForm();
        this.initializeBoxItemsTable();
    }

    createFilterForm(): void {
        this.filterForm = this.formBuilder.group({
            boxId: ['']
        });
    }

    initializeBoxItemsTable(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'boxId',
                columnName_Fa: 'شناسه بخش',
                dataKey: 'boxId'
            },
            {
                columnDefinitionName: 'title',
                columnName_Fa: 'عنوان',
                dataKey: 'title'
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
                actionName: this.translate.instant('SHARED.ACTIONS.EDIT'),
                actionIcon: 'pencil',
                actionFunction: this.editBoxItem
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteBoxItem
            }
        ]
        this.boxItemsTableModel.hasGridAction = true
        this.boxItemsTableModel.selectable = false;
        this.boxItemsTableModel.autoSearch = false;
        this.boxItemsTableModel.tableColumns = tableColumns;
        this.boxItemsTableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.boxItemsService.getBoxItems(this.boxId);
    }

    addNewBoxItem(): void {
        if (this.boxId) {
            const modalRef: NgbModalRef = this.modalService.open(AddNewBoxItemComponent, {
                centered: true,
                size: 'xl'
            });
            modalRef.componentInstance.boxId = this.boxId;
            modalRef.result.then((isCreate: boolean): void => {
                if (isCreate) {
                    this.toasterService.success('آیتم جدید با موفقیت اضافه شد');
                    this.boxItemsTable.refreshTableData(true, 'boxItem');
                }
            }, (): void => {

            });
        } else {
            this.toasterService.warning('ابتدا نام بخش را انتخاب کنید');
        }
    }

    editBoxItem = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(EditBoxItemComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.componentInstance.boxItemId = element.id;
        modalRef.result.then((isUpdated: boolean): void => {
            if (isUpdated) {
                this.toasterService.success('آیتم مورد نظر با موفقیت ویرایش شد');
                this.boxItemsTable.refreshTableData(true, 'boxItem');
            }
        }, () => {

        });
    }

    deleteBoxItem = (element: any): void => {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.componentInstance.confirmTitle = 'حذف آیتم بخش';
        modalRef.componentInstance.confirmMessage = 'آیا از حذف ' + element.title + ' مطمئن هستید؟';
        modalRef.result.then((isDeleted: boolean) => {
            if (isDeleted) {
                this.boxItemsService.deleteBoxItem(element.id).subscribe({
                    next: (response: any): void => {
                        if (response) {
                            this.toasterService.success('آیتم مورد نظر با موفقیت حذف شد');
                            this.boxItemsTable.refreshTableData(true, 'boxItem');
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

    searchSection(): void {
        const modalRef: NgbModalRef = this.modalService.open(BoxLookupComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((boxInfo: any): void => {
            if (boxInfo) {
                this.filterForm.controls['boxId'].setValue(boxInfo.section);
                this.boxId = boxInfo.id;
                this.boxItemsTable.refreshTableData(true, 'boxItem');
            }
        }, (): void => {

        });
    }
}
