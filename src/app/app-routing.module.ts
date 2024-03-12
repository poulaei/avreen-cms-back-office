import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './modules/auth/services/auth.guard';


export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
