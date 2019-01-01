import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MODULE_ROUTES} from './actions.routes';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(MODULE_ROUTES)
  ],
  declarations: [ActionsComponent]
})
export class ActionsModule { }
