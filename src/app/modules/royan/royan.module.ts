import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoyanRoutingModule} from './royan-routing.module';
import {TranslationModule} from "../i18n";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgbTimepickerModule, NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {DropdownMenusModule} from "../../_metronic/partials";
import {SharedModule} from "../../_metronic/shared/shared.module";
import {MatRadioModule} from "@angular/material/radio";
import {MatTabsModule} from "@angular/material/tabs";
import {BaseTableComponent} from './shared/shared-components/base-table/base-table.component';
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {DataPropertyGetterPipe} from "./shared/shared-components/base-table/data-property-getter.pipe";
import {CrudPageComponent} from "./shared/shared-components/crud-page/crud-page.component";
import {ConfirmModalComponent} from "./shared/shared-components/confirm-modal/confirm-modal.component";
import {LandingComponent} from './landing/landing.component';
import { UserManagementComponent } from './user-management/user-management.component';


@NgModule({
    declarations: [
        BaseTableComponent,
        CrudPageComponent,
        ConfirmModalComponent,
        DataPropertyGetterPipe,
        LandingComponent,
        UserManagementComponent
    ],
    imports: [
        CommonModule,
        RoyanRoutingModule,
        TranslationModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatSortModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatMenuModule,
        MatTooltipModule,
        NgbTimepickerModule,
        DropdownMenusModule,
        SharedModule,
        MatRadioModule,
        MatTabsModule,
        FormsModule,
        NgbTypeahead,
        MatExpansionModule,
        MatCardModule,
    ]
})
export class RoyanModule {
}
