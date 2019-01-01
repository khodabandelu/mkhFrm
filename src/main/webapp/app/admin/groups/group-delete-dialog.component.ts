import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';
import {Group, GroupService} from "./";


@Component({
    selector: 'mkh-group-delete-dialog',
    templateUrl: './group-delete-dialog.component.html'
})
export class GroupDeleteDialogComponent {
    group: Group;

    constructor(private groupService: GroupService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id) {
        this.groupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'groupListModification',
                content: 'Deleted a group'
            });
            this.activeModal.dismiss(true);
        });
    }
}
