import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CrudPageModel} from "./crud-page.model";
import {BaseTableModel} from "../base-table/base-table.model";
import {Observable} from "rxjs";
import {BaseTableComponent} from "../base-table/base-table.component";

@Component({
    selector: 'crud-page',
    templateUrl: './crud-page.component.html',
    styleUrls: ['./crud-page.component.scss']
})
export class CrudPageComponent implements OnInit, AfterViewInit {

    @ViewChild("crudPageTable") crudPageTable: BaseTableComponent;
    crudPageModel: CrudPageModel = new CrudPageModel();

    @Input() doSearch: () => Observable<any>;
    @Input()
    crudPageTableModel: BaseTableModel = new BaseTableModel();


    @Input() set initCrudPage(crudPageModel: CrudPageModel) {
        this.crudPageModel = crudPageModel;
    }

    constructor() {
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
    }
}
