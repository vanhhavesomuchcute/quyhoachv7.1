import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: { layout: 'empty-layout' }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: { layout: 'empty-layout' }
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
    data: { layout: 'light-header' }
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
