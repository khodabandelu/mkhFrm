import {Route, RouterModule} from '@angular/router';
import {MainComponent} from 'app/layouts/main/main.component';
import {UserRouteAccessService} from 'app/core';
import {sidebarRoute} from "app/layouts/sidebar/sidebar.route";
import {errorRoute} from "app/layouts/error/error.route";
import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

export const MAIN_ROUTE: Route = {
    path: '',
    component: MainComponent,
    data: {
        authorities: ['ROLE_USER']
    },
    canActivate: [UserRouteAccessService],
    children: [{
        path: 'admin',
        loadChildren: '../../admin/admin.module#MkhodabandeluFrameworkAdminModule'
    }]
};

const LAYOUT_ROUTES = [sidebarRoute, ...errorRoute];

@NgModule({
    imports: [RouterModule.forChild(
        [
            ...LAYOUT_ROUTES,
            {
                path: '',
                component: MainComponent,
                data: {
                    authorities: ['ROLE_USER']
                },
                canActivate: [UserRouteAccessService],
                children: [{
                    path: 'admin',
                    loadChildren: '../../admin/admin.module#MkhodabandeluFrameworkAdminModule'
                }]
            }
            // {
            //   path: 'admin',
            //   loadChildren: './admin/admin.module#MkhodabandeluFrameworkAdminModule'
            // }
        ],
    ), NgbModule],
    exports: [RouterModule]
})
export class MkhodabandeluFrameworkMainRoutingModule {
}
