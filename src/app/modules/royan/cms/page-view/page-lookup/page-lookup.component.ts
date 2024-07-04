import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../../../shared/shared-components/base-table/base-table.component";
import {BaseTableModel} from "../../../shared/shared-components/base-table/base-table.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BaseTableColumnModel} from "../../../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../../../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {PageViewService} from "../page-view.service";

@Component({
    selector: 'app-page-lookup',
    templateUrl: './page-lookup.component.html',
    styleUrls: ['./page-lookup.component.scss']
})
export class PageLookupComponent implements OnInit {

    @ViewChild("pageTable") baseTableComponent: BaseTableComponent;
    PageTableModel: BaseTableModel = new BaseTableModel();


    constructor(public pageViewService: PageViewService,
                public modal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initializePageTable();
    }

    initializePageTable(): void {
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
        gridActions = []
        this.PageTableModel.hasGridAction = false;
        this.PageTableModel.selectable = true;
        this.PageTableModel.autoSearch = true;
        this.PageTableModel.tableColumns = tableColumns;
        this.PageTableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.pageViewService.getAllPages();
    }
}
