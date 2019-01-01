import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Group} from "./";

@Component({
    selector: 'mkh-group-detail',
    templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent implements OnInit {
    group: Group;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data.subscribe(({group}) => {
            this.group = group.body ? group.body : group;
        });
    }
}
