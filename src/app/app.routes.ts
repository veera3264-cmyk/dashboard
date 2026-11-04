import { Routes } from '@angular/router';
import { Login } from './dashboard/login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from '../guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Login
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  }
];