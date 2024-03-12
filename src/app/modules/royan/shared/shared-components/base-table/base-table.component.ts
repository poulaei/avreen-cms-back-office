import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {BaseTableModel} from "./base-table.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BaseTableColumnModel} from "./base-table-column.model";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {SelectionModel} from "@angular/cdk/collections";
import {MatPaginator} from "@angular/material/paginator";

@Component({
    selector: 'base-table-component',
    templateUrl: './base-table.component.html',
    styleUrls: ['./base-table.component.scss']
})
export class BaseTableComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    public tableDataSource: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
    selection = new SelectionModel<any>(true, []);
    baseTableModel: BaseTableModel = new BaseTableModel();
    public displayedColumns: string[];
    @Input() doSearch: () => Observable<any>;

    @Input() set initTableData(baseTableModel: BaseTableModel) {
        this.baseTableModel = baseTableModel;
        this.initTable(baseTableModel);
    }

    constructor(public activeModal: NgbActiveModal,
                public toasterService: ToastrService) {

    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.tableDataSource.paginator = this.paginator;
        if (this.baseTableModel.autoSearch) {
            this.refreshTableData();
        }
    }

    initTable(baseTableModel: BaseTableModel): void {
        const columnNames: string[] = baseTableModel.tableColumns.map((tableColumn: BaseTableColumnModel) => tableColumn.columnDefinitionName);
        this.displayedColumns = ['position', ...columnNames];
        if (baseTableModel.hasGridAction) {
            this.displayedColumns.push('action');
        }
        if (baseTableModel.hasSelection) {
            this.displayedColumns.unshift('select');
        }
    }

    refreshTableData(): void {
        this.doSearch().subscribe({
            next: (response: any) => {
                if (response.isSuccess) {
                    if (Array.isArray(response.data)) {
                        this.tableDataSource.data = response.data;
                    } else {
                        this.tableDataSource.data = response.data.data;
                    }
                } else {
                    this.toasterService.error(response.message);
                }
            },
            error: (exception) => {
                if (exception.error) {
                    this.toasterService.error(exception.error.message);
                }
            }
        });
    }

    selectRow(row: any): void {
        if (this.baseTableModel.selectable) {
            this.activeModal.close(row);
        }
    }

    addRowManually(element: any): void {
        this.tableDataSource.data.push(element);
        this.tableDataSource._updateChangeSubscription();
    }

    deleteRowManually(element: any): void {
        let index: number = this.tableDataSource.data.indexOf(element);
        this.tableDataSource.data.splice(index, 1);
        this.tableDataSource._updateChangeSubscription();
    }

    clearRowManually(): void {
        this.tableDataSource.data = [];
        this.tableDataSource._updateChangeSubscription();
    }
}
