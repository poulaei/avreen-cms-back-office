import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../../shared/shared-components/base-table/base-table.component";
import {BaseTableModel} from "../../shared/shared-components/base-table/base-table.model";
import {LandingService} from "../landing.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {BaseTableActionModel} from "../../shared/shared-components/base-table/base-table-action.model";
import {BaseTableColumnModel} from "../../shared/shared-components/base-table/base-table-column.model";

@Component({
    selector: 'app-section-lookup',
    templateUrl: './section-lookup.component.html',
    styleUrls: ['./section-lookup.component.scss']
})
export class SectionLookupComponent implements OnInit {

    @ViewChild("sectionTable") sectionTable: BaseTableComponent;
    sectionTableModel: BaseTableModel = new BaseTableModel();


    constructor(public toasterService: ToastrService,
                public landingService: LandingService,
                public modal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initializeSectionTable();
    }

    initializeSectionTable(): void {
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
        this.sectionTableModel.hasGridAction = false;
        this.sectionTableModel.selectable = true;
        this.sectionTableModel.autoSearch = true;
        this.sectionTableModel.tableColumns = tableColumns;
        this.sectionTableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.landingService.getAllSections();
    }
}
