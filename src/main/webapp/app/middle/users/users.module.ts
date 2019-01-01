import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {RouterModule} from '@angular/router';
import {MODULE_ROUTES} from './users.routes';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(MODULE_ROUTES)
  ],
  declarations: [
    UsersComponent,
    UserDetailComponent
  ],
  providers: [UserService]
})
export class UsersModule {
}
