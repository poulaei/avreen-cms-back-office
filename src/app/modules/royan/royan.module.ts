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
import {UserManagementComponent} from './user-management/user-management.component';
import {UploadImageComponent} from './shared/shared-components/upload-image/upload-image.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MenuManagementComponent} from './menu-management/menu-management.component';
import {SystemRoleComponent} from './system-role/system-role.component';
import {AddNewUserComponent} from './user-management/add-new-user/add-new-user.component';
import {EditUserComponent} from './user-management/edit-user/edit-user.component';
import {AddNewRoleComponent} from './system-role/add-new-role/add-new-role.component';
import {EditRoleComponent} from './system-role/edit-role/edit-role.component';
import {BoxComponent} from './box/box.component';
import {BoxItemsComponent} from './box-items/box-items.component';
import {AddNewBoxComponent} from './box/add-new-box/add-new-box.component';
import {EditBoxComponent} from './box/edit-box/edit-box.component';
import {BoxLookupComponent} from './box/box-lookup/box-lookup.component';
import {AddNewBoxItemComponent} from './box-items/add-new-box-item/add-new-box-item.component';
import {EditBoxItemComponent} from './box-items/edit-box-item/edit-box-item.component';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {BlogComponent} from './cms/blog/blog.component';
import {BlogCategoryComponent} from './cms/blog-category/blog-category.component';
import {PageViewComponent} from './cms/page-view/page-view.component';
import {AddNewBlogCategoryComponent} from './cms/blog-category/add-new-blog-category/add-new-blog-category.component';
import {EditBlogCategoryComponent} from './cms/blog-category/edit-blog-category/edit-blog-category.component';
import {AddNewBlogComponent} from './cms/blog/add-new-blog/add-new-blog.component';
import {EditBlogComponent} from './cms/blog/edit-blog/edit-blog.component';
import {AddNewPageViewComponent} from './cms/page-view/add-new-page-view/add-new-page-view.component';
import {EditPageViewComponent} from './cms/page-view/edit-page-view/edit-page-view.component';
import {MatTreeModule} from "@angular/material/tree";
import {BoxManagementComponent} from './box-management/box-management.component';
import {AddSubBoxComponent} from './box-management/add-sub-box/add-sub-box.component';
import {BlogLookupComponent} from './cms/blog/blog-lookup/blog-lookup.component';
import {PageLookupComponent} from './cms/page-view/page-lookup/page-lookup.component';
import {AddNewContentBoxComponent} from './box-management/add-new-content-box/add-new-content-box.component';
import {AddNewMenuComponent} from './menu-management/add-new-menu/add-new-menu.component';
import {AddSubMenuComponent} from './menu-management/add-sub-menu/add-sub-menu.component';
import {EditMenuComponent} from './menu-management/edit-menu/edit-menu.component';
import { EditContentBoxComponent } from './box-management/edit-content-box/edit-content-box.component';


@NgModule({
    declarations: [
        BaseTableComponent,
        CrudPageComponent,
        ConfirmModalComponent,
        DataPropertyGetterPipe,
        UserManagementComponent,
        UploadImageComponent,
        MenuManagementComponent,
        SystemRoleComponent,
        AddNewUserComponent,
        EditUserComponent,
        AddNewRoleComponent,
        EditRoleComponent,
        BoxComponent,
        BoxItemsComponent,
        AddNewBoxComponent,
        EditBoxComponent,
        BoxLookupComponent,
        AddNewBoxItemComponent,
        EditBoxItemComponent,
        BlogComponent,
        BlogCategoryComponent,
        PageViewComponent,
        AddNewBlogCategoryComponent,
        EditBlogCategoryComponent,
        AddNewBlogComponent,
        EditBlogComponent,
        AddNewPageViewComponent,
        EditPageViewComponent,
        BoxManagementComponent,
        AddSubBoxComponent,
        BlogLookupComponent,
        PageLookupComponent,
        AddNewContentBoxComponent,
        AddNewMenuComponent,
        AddSubMenuComponent,
        EditMenuComponent,
        EditContentBoxComponent
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
        EditorComponent,
        MatTreeModule,
    ]
})
export class RoyanModule {
}
