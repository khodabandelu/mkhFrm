import {Route, Routes} from '@angular/router';

import {auditsRoute, configurationRoute, docsRoute, healthRoute, logsRoute, metricsRoute, usersRoute} from './';

import {UserRouteAccessService} from 'app/core';


const groutes: Route =
    {
        path: 'groups',
        loadChildren:'./groups/groups.module#MkhodabandeluFrameworkGroupsModule'
    };
const ADMIN_ROUTES = [auditsRoute, configurationRoute, docsRoute, healthRoute, logsRoute, ...usersRoute, metricsRoute];

export const adminState: Routes = [
    {
        path: '',
        data: {
            authorities: ['ROLE_ADMIN']
        },
        canActivate: [UserRouteAccessService],
        children: ADMIN_ROUTES
    }
];


