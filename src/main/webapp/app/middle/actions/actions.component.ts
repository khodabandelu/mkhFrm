import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ActionService} from './action.service';
import {IAction} from './action';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  actions: IAction[];

  constructor(private actionService: ActionService) {
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.actionService.query().subscribe(
      (res: HttpResponse<IAction[]>) => {
        // this.actions = res.body.rows;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }


}
