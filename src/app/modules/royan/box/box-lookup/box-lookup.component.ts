import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../../shared/shared-components/base-table/base-table.component";
import {BaseTableModel} from "../../shared/shared-components/base-table/base-table.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BaseTableColumnModel} from "../../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {BoxService} from "../box.service";

@Component({
    selector: 'app-box-lookup',
    templateUrl: './box-lookup.component.html',
    styleUrls: ['./box-lookup.component.scss']
})
export class BoxLookupComponent implements OnInit {

    @ViewChild("boxTable") boxTable: BaseTableComponent;
    boxTableModel: BaseTableModel = new BaseTableModel();


    constructor(public boxService: BoxService,
                public modal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initializeBoxTable();
    }

    initializeBoxTable(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'section',
                columnName_Fa: 'نام بخش',
                dataKey: 'section'
            },
            {
                columnDefinitionName: 'title',
                columnName_Fa: 'عنوان',
                dataKey: 'title'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = []
        this.boxTableModel.hasGridAction = false;
        this.boxTableModel.selectable = true;
        this.boxTableModel.autoSearch = true;
        this.boxTableModel.tableColumns = tableColumns;
        this.boxTableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.boxService.getAllBoxes();
    }
}
