import {Component, OnInit} from '@angular/core';
import {Authority} from "app/core/authority/authority.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService, IGroup} from "app/admin/groups";
import {UserService} from "app/core";

@Component({
    selector: 'mkh-user-groups-component',
    templateUrl: './user-groups.component.html',
    styles: []
})
export class UserGroupsComponent implements OnInit {

    user = null;
    groups: IGroup[];
    isSaving: boolean;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private groupService: GroupService,
                private userService: UserService,
               ) {
    }

    ngOnInit() {
        this.route.data.subscribe(({ user }) => {
            this.user = user.body ? user.body : user;
        });

        this.groupService.getAll().subscribe(data => this.groups = data);

    }

    previousState() {
        this.router.navigate(['/admin/users']);
    }

    evaluateGroup(group) {
        return (this.user.groups.some(x => x.id === group.id));
    }

    onChangeGroup(group, isChecked: boolean) {
        if (isChecked)
            this.user.groups.push(group);
        else
            this.user.groups.splice(this.user.groups.map(e => e.id).indexOf(group.id), 1);
    }

    submitGroups() {
        this.userService.updateGroups(this.user).subscribe(data => this.onSaveSuccess(data), err => this.onSaveError());
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

}
