import {Component, OnInit} from '@angular/core';
import {Group} from "app/admin/groups/group.model";
import {GroupService} from "app/admin/groups/group.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {JhiEventManager} from "ng-jhipster";
import {User} from "app/core";

@Component({
    selector: 'mkh-group-user-delete',
    templateUrl: './group-user-delete-dialoge.component.html',
    styles: []
})
export class GroupUserDeleteDialogeComponent implements OnInit {

    group : Group;
    user : User;

    constructor(private groupService: GroupService,
                public activeModal: NgbActiveModal,
                private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id) {
        this.group.users.splice(this.group.users.map(e => e.id).indexOf(this.user.id), 1);
        this.groupService.deleteUserFromGroup(this.group.id,this.user.id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'groupListModification',
                content: 'Deleted a user from group'
            });
            this.activeModal.dismiss(true);
        });
    }

    ngOnInit() {
    }
}
