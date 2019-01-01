import {Route} from '@angular/router';
import {UsersComponent} from './users.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

export const MODULE_ROUTES: Route[] = [
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UserDetailComponent}
];


