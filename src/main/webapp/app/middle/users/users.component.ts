import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {IUser} from './user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // public users: any;
  users: IUser[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadAll();
  }

  // getUsers() {
  //   return this.userService.getUsers().subscribe(res => this.users = res);
  // }

  loadAll() {
    this.userService.query().subscribe(
      (res: HttpResponse<IUser[]>) => {
        // this.users = res.body.rows;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

}
