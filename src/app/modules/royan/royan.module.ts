import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
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
import { AddNewSectionComponent } from './landing/add-new-section/add-new-section.component';
import { EditSectionComponent } from './landing/edit-section/edit-section.component';
import { SectionItemsComponent } from './landing/section-items/section-items.component';
import { SectionLookupComponent } from './landing/section-lookup/section-lookup.component';
import { AddNewItemComponent } from './landing/section-items/add-new-item/add-new-item.component';
import { EditItemComponent } from './landing/section-items/edit-item/edit-item.component';
import { UploadImageComponent } from './shared/shared-components/upload-image/upload-image.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { MenuManagementComponent } from './menu-management/menu-management.component';
import { SystemRoleComponent } from './system-role/system-role.component';
import { AddNewUserComponent } from './user-management/add-new-user/add-new-user.component';
import { EditUserComponent } from './user-management/edit-user/edit-user.component';
import { AddNewRoleComponent } from './system-role/add-new-role/add-new-role.component';
import { EditRoleComponent } from './system-role/edit-role/edit-role.component';


@NgModule({
    declarations: [
        BaseTableComponent,
        CrudPageComponent,
        ConfirmModalComponent,
        DataPropertyGetterPipe,
        LandingComponent,
        UserManagementComponent,
        AddNewSectionComponent,
        EditSectionComponent,
        SectionItemsComponent,
        SectionLookupComponent,
        AddNewItemComponent,
        EditItemComponent,
        UploadImageComponent,
        MenuManagementComponent,
        SystemRoleComponent,
        AddNewUserComponent,
        EditUserComponent,
        AddNewRoleComponent,
        EditRoleComponent
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
        MatToolbarModule,
        NgOptimizedImage,
    ]
})
export class RoyanModule {
}
