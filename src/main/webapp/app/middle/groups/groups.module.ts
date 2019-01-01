import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupsComponent} from './groups.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {GroupService} from './group.service';
import {MODULE_ROUTES} from './groups.routes';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(MODULE_ROUTES)
  ],
  declarations: [GroupsComponent],
  providers: [GroupService]
})
export class GroupsModule {
}
