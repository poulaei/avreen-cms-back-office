import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {BaseTableActionModel} from "../../shared/shared-components/base-table/base-table-action.model";
import {BaseTableComponent} from "../../shared/shared-components/base-table/base-table.component";
import {BaseTableModel} from "../../shared/shared-components/base-table/base-table.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {LandingService} from "../landing.service";
import {BaseTableColumnModel} from "../../shared/shared-components/base-table/base-table-column.model";
import {Observable} from "rxjs";
import {SectionLookupComponent} from "../section-lookup/section-lookup.component";
import {AddNewItemComponent} from "./add-new-item/add-new-item.component";

@Component({
    selector: 'app-section-items',
    templateUrl: './section-items.component.html',
    styleUrls: ['./section-items.component.scss']
})
export class SectionItemsComponent implements OnInit {

    @ViewChild("sectionItemsTable") sectionItemsTable: BaseTableComponent;
    sectionItemsTableModel: BaseTableModel = new BaseTableModel();
    filterForm: FormGroup;
    sectionId: string;

    constructor(public formBuilder: FormBuilder,
                public changeDetectorRef: ChangeDetectorRef,
                public toasterService: ToastrService,
                public translate: TranslateService,
                public landingService: LandingService,
                public modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.createFilterForm();
        this.initializeSectionItemsTable();
    }

    createFilterForm(): void {
        this.filterForm = this.formBuilder.group({
            sectionId: ['']
        });
    }

    initializeSectionItemsTable(): void {
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
                actionFunction: this.editItem
            },
            {
                actionName: this.translate.instant('SHARED.ACTIONS.DELETE'),
                actionIcon: 'trash',
                actionFunction: this.deleteItem
            }
        ]
        this.sectionItemsTableModel.hasGridAction = true
        this.sectionItemsTableModel.selectable = false;
        this.sectionItemsTableModel.autoSearch = false;
        this.sectionItemsTableModel.tableColumns = tableColumns;
        this.sectionItemsTableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.landingService.getSectionItems(this.sectionId);
    }

    addNewItem(): void {
        if (this.sectionId) {
            const modalRef: NgbModalRef = this.modalService.open(AddNewItemComponent, {
                centered: true,
                size: 'xl'
            });
            modalRef.result.then((isCreate: boolean): void => {
                if (isCreate) {
                    this.toasterService.success('آیتم جدید با موفقیت اضافه شد');
                    this.sectionItemsTable.refreshTableData(true, 'sectionItem');
                }
            }, (): void => {

            });
        } else {
            this.toasterService.warning('ابتدا نام بخش را انتخاب کنید');
        }
    }

    editItem = (element: any): void => {
        // this.router.navigate(["/shaliSoft/editBuyFactor", element.id]);
    }

    deleteItem = (element: any): void => {
        // const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
        //     centered: true
        // });
        // modalRef.componentInstance.confirmTitle = this.translate.instant('BUY_FACTOR.DELETE');
        // modalRef.componentInstance.confirmMessage = this.translate.instant('BUY_FACTOR.MESSAGES.DELETE_CONFIRM', {param1: element.code});
        // modalRef.result.then((isDeleted: boolean) => {
        //     if (isDeleted) {
        //         this.buyFactorService.deleteBuyFactor(element.id).subscribe({
        //             next: (response: ShaliSoftResponseBaseModel) => {
        //                 if (response.isSuccess) {
        //                     this.toasterService.success(this.translate.instant('BUY_FACTOR.MESSAGES.DELETE_OK'));
        //                     this.buyFactorTable.refreshTableData();
        //                 } else {
        //                     this.toasterService.error(response.message);
        //                 }
        //             },
        //             error: (exception) => {
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

    searchSection(): void {
        const modalRef: NgbModalRef = this.modalService.open(SectionLookupComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((sectionInfo: any): void => {
            if (sectionInfo) {
                this.filterForm.controls['sectionId'].setValue(sectionInfo.section);
                this.sectionId = sectionInfo.section;
                this.sectionItemsTable.refreshTableData(true, 'sectionItem');
            }
        }, () => {

        });
    }
}
