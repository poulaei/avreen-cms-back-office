import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../../shared/shared-components/base-table/base-table.component";
import {BaseTableModel} from "../../shared/shared-components/base-table/base-table.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BaseTableColumnModel} from "../../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {BoxManagementService} from "../box-management.service";

@Component({
    selector: 'app-content-box-lookup',
    templateUrl: './content-box-lookup.component.html',
    styleUrls: ['./content-box-lookup.component.scss']
})
export class ContentBoxLookupComponent implements OnInit {

    @ViewChild("contentBoxTable") baseTableComponent: BaseTableComponent;
    contentBoxTableModel: BaseTableModel = new BaseTableModel();


    constructor(public boxManagementService: BoxManagementService,
                public modal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initializeContentBoxTable();
    }

    initializeContentBoxTable(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'section',
                columnName_Fa: 'شناسه باکس',
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
        gridActions = []
        this.contentBoxTableModel.hasGridAction = false;
        this.contentBoxTableModel.selectable = true;
        this.contentBoxTableModel.autoSearch = true;
        this.contentBoxTableModel.tableColumns = tableColumns;
        this.contentBoxTableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.boxManagementService.getContentBoxRoot();
    }
}
