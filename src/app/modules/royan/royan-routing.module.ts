import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoyanComponent} from "./royan.component";
import {LandingComponent} from "./landing/landing.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {SectionItemsComponent} from "./landing/section-items/section-items.component";
import {MenuManagementComponent} from "./menu-management/menu-management.component";
import {SystemRoleComponent} from "./system-role/system-role.component";

const routes: Routes = [
    {
        path: '',
        component: RoyanComponent,
        children: [
            {
                path: 'section',
                component: LandingComponent
            },
            {
                path: 'items',
                component: SectionItemsComponent
            },
            {
                path: 'users',
                component: UserManagementComponent
            },
            {
                path: 'roles',
                component: SystemRoleComponent
            },
            {
                path: 'menu',
                component: MenuManagementComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoyanRoutingModule {
}
