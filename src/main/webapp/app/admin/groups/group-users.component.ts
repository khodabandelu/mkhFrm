import {Component, OnInit} from '@angular/core';
import {Group} from "app/admin/groups/group.model";
import {ActivatedRoute} from "@angular/router";
import {GroupService} from "app/admin/groups/group.service";
import {GroupDeleteDialogComponent} from "app/admin/groups/group-delete-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GroupUserDeleteDialogeComponent} from "app/admin/groups/group-user-delete-dialoge.component";

@Component({
    selector: 'mkh-group-users',
    templateUrl: './group-users.component.html',
    styles: []
})
export class GroupUsersComponent implements OnInit {

    group: Group;


    constructor(private route: ActivatedRoute,
                private groupService: GroupService,
                private modalService: NgbModal) {
    }

    //TODO : "change resolver to get only one query "
    ngOnInit() {
        this.route.data.subscribe(({group}) => {
            this.groupService.findWithUsers(group.body.id).subscribe(data => {
                this.group = data.body;
            });
        });
    }

    deleteUserFromGroup(user) {
        const modalRef = this.modalService.open(GroupUserDeleteDialogeComponent, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.user = user;
        modalRef.componentInstance.group = this.group;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );

    }




}
