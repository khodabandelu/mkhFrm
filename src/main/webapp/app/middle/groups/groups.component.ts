import {Component, OnInit} from '@angular/core';
import {UserService} from '../users/user.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {IGroup} from './group';
import {GroupService} from './group.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: IGroup[];

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.groupService.query().subscribe(
      (res: HttpResponse<IGroup[]>) => {
        // this.groups = res.body.rows;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

}
