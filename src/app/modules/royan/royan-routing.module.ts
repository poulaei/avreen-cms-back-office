import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoyanComponent} from "./royan.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {MenuManagementComponent} from "./menu-management/menu-management.component";
import {SystemRoleComponent} from "./system-role/system-role.component";
import {BoxComponent} from "./box/box.component";
import {BoxItemsComponent} from "./box-items/box-items.component";

const routes: Routes = [
    {
        path: '',
        component: RoyanComponent,
        children: [
            {
                path: 'box',
                component: BoxComponent
            },
            {
                path: 'boxItems',
                component: BoxItemsComponent
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
