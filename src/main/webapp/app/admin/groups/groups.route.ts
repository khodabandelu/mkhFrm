import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {JhiResolvePagingParams} from 'ng-jhipster';

import {Principal} from 'app/core';
import {Group, GroupDetailComponent, GroupsComponent, GroupService, GroupUpdateComponent} from "./";
import {GroupAuthoritiesComponent} from "app/admin/groups/group-authorities.component";
import {GroupUsersComponent} from "app/admin/groups/group-users.component";

@Injectable({providedIn: 'root'})
export class GroupResolve implements CanActivate {
    constructor(private principal: Principal) {
    }

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}

@Injectable({providedIn: 'root'})
export class GroupMgmtResolve implements Resolve<any> {
    constructor(private service: GroupService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Group();
    }
}

export const groupsRoute: Routes = [
    {
        path: 'groups',
        component: GroupsComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            pageTitle: 'groups.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'groups/:id/view',
        component: GroupDetailComponent,
        resolve: {
            group: GroupMgmtResolve
        },
        data: {
            pageTitle: 'groups.home.title'
        }
    },
    {
        path: 'groups/new',
        component: GroupUpdateComponent,
        resolve: {
            group: GroupMgmtResolve
        }
    },
    {
        path: 'groups/:id/edit',
        component: GroupUpdateComponent,
        resolve: {
            group: GroupMgmtResolve
        }
    },
    {
        path: 'groups/:id/authorities',
        component: GroupAuthoritiesComponent,
        resolve: {
            group: GroupMgmtResolve
        },
        data:{
            group:'group'
        }
    },
    {
        path: 'groups/:id/users',
        component: GroupUsersComponent,
        resolve: {
            group: GroupMgmtResolve
        },
        data:{
            group:'group'
        }
    }

];
