import {Routes} from '@angular/router';

const Routing: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    {
        path: 'royan',
        loadChildren: () => import('../modules/royan/royan.module').then((m) => m.RoyanModule)
    },
    {
        path: '**',
        redirectTo: 'error/404',
    },
];

export {Routing};
