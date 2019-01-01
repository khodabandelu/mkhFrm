import {Route} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const MODULE_ROUTES: Route[] = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: DashboardComponent}
];

