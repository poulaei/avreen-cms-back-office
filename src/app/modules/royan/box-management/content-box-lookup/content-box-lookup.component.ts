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
