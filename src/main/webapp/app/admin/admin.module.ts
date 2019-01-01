import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MkhLanguageHelper } from 'app/core';
import { MkhodabandeluFrameworkSharedModule} from 'app/shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import {
    adminState,
    AuditsComponent,
    UsersComponent,
    UserDetailComponent,
    UsersUpdateComponent,
    UsersDeleteDialogComponent,
    LogsComponent,
    MkhMetricsMonitoringModalComponent,
    MkhMetricsMonitoringComponent,
    MkhHealthModalComponent,
    MkhHealthCheckComponent,
    MkhConfigurationComponent,
    MkhDocsComponent
} from './';
import {MkhodabandeluFrameworkGroupsModule} from "app/admin/groups/groups.module";
import { UserGroupsComponent } from './users/user-groups.component';
import {MkhodabandeluFrameworkCamerasModule} from "app/admin/cameras/cameras.module";

@NgModule({
    imports: [
        MkhodabandeluFrameworkSharedModule,
        MkhodabandeluFrameworkGroupsModule,
        MkhodabandeluFrameworkCamerasModule,
        RouterModule.forChild(adminState)
        /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    ],
    declarations: [
        AuditsComponent,
        UsersComponent,
        UserDetailComponent,
        UsersUpdateComponent,
        UsersDeleteDialogComponent,
        LogsComponent,
        MkhConfigurationComponent,
        MkhHealthCheckComponent,
        MkhHealthModalComponent,
        MkhDocsComponent,
        MkhMetricsMonitoringComponent,
        MkhMetricsMonitoringModalComponent,
        UserGroupsComponent
    ],
    entryComponents: [UsersDeleteDialogComponent, MkhHealthModalComponent, MkhMetricsMonitoringModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MkhodabandeluFrameworkAdminModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: MkhLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
