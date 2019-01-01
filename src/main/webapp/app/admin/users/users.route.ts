import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';

import { Principal, User, UserService } from 'app/core';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail.component';
import { UsersUpdateComponent } from './user-update.component';
import {UserGroupsComponent} from "app/admin/users/user-groups.component";

@Injectable({ providedIn: 'root' })
export class UserResolve implements CanActivate {
    constructor(private principal: Principal) {}

    canActivate() {
        return this.principal.identity().then(account => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
    }
}

@Injectable({ providedIn: 'root' })
export class UsersResolveWithGroups implements Resolve<any> {
    constructor(private service: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findWithGroups(id);
        }
        return new User();
    }
}

@Injectable({ providedIn: 'root' })
export class UsersResolve implements Resolve<any> {
    constructor(private service: UserService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.findById(id);
        }
        return new User();
    }
}

export const usersRoute: Routes = [
    {
        path: 'users',
        component: UsersComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            pageTitle: 'users.home.title',
            defaultSort: 'id,asc'
        }
    },
    {
        path: 'users/:id/view',
        component: UserDetailComponent,
        resolve: {
            user: UsersResolve
        },
        data: {
            pageTitle: 'users.home.title'
        }
    },
    {
        path: 'users/new',
        component: UsersUpdateComponent,
        resolve: {
            user: UsersResolve
        }
    },
    {
        path: 'users/:id/edit',
        component: UsersUpdateComponent,
        resolve: {
            user: UsersResolve
        }
    },
    {
        path: 'users/:id/groups',
        component: UserGroupsComponent,
        resolve: {
            user: UsersResolveWithGroups
        }
        // ,
        // data:{
        //     user:'user'
        // }
    }
];
