import { Routes } from '@angular/router';
import { AdminLayout } from './admin.layout';
import { authGuard } from './guards/auth.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(c => c.Login)
  },
  {
    path: '',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(c => c.Dashboard)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
