
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { TestComponent } from './test/test.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent), canActivate: [AuthGuard]
  },
  {
    path: 'state', loadComponent: () =>
      import('./state/state.component').then((m) => m.StateComponent), canActivate: [AuthGuard]
  },
];
  
