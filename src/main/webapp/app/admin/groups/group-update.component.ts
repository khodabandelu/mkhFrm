import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MkhLanguageHelper} from 'app/core';
import {Group, GroupService} from "./";


@Component({
    selector: 'mkh-group-update',
    templateUrl: './group-update.component.html'
})
export class GroupUpdateComponent implements OnInit {
    group: Group;
    isSaving: boolean;

    constructor(
        private languageHelper: MkhLanguageHelper,
        private groupService: GroupService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({group}) => {
            this.group = group.body ? group.body : group;
        });
    }

    previousState() {
        this.router.navigate(['/admin/groups']);
    }

    save() {
        this.isSaving = true;
        if (this.group.id !== null) {
            this.groupService.update(this.group).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.groupService.create(this.group).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
