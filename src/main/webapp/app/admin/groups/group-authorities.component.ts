import {Component, OnInit} from '@angular/core';
import {Group} from "app/admin/groups/group.model";
import {Authority} from "app/core/authority/authority.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorityService} from "app/core/authority/authority.service";
import {GroupService} from "app/admin/groups/group.service";

@Component({
    selector: 'mkh-group-authorities-component',
    templateUrl: './group-authorities.component.html',
    styles: []
})
export class GroupAuthoritiesComponent implements OnInit {

    group = null;
    isSaving: boolean;

    authorities: Authority[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authorityService: AuthorityService,
                private groupService: GroupService) {
    }

    ngOnInit() {
        this.authorityService.getAll().subscribe(data => this.authorities = data);

        this.route.data.subscribe(data => {
            this.groupService.findWithAuthorities(data.group.body.id).subscribe(data => {
                this.group = data.body;
            });
        });
    }

    previousState() {
        this.router.navigate(['/admin/groups']);
    }


    evaluateAuthority(authority) {
        return (this.group.authorities.some(x => x.id === authority.id));
    }

    onChangeAuthority(authority, isChecked: boolean) {
        if (isChecked)
            this.group.authorities.push(authority);
        else
            this.group.authorities.splice(this.group.authorities.map(e => e.id).indexOf(authority.id), 1);
    }

    submitAuthorities() {
        this.groupService.updateAuthorities(this.group).subscribe(data => this.onSaveSuccess(data), err => this.onSaveError());
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
