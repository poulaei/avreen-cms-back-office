import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoyanComponent} from "./royan.component";
import {LandingComponent} from "./landing/landing.component";
import {UserManagementComponent} from "./user-management/user-management.component";

const routes: Routes = [
    {
        path: '',
        component: RoyanComponent,
        children: [
            {
                path: 'landing',
                component: LandingComponent
            },
            {
                path: 'users',
                component: UserManagementComponent
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
