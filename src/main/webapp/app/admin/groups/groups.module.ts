import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MkhodabandeluFrameworkSharedModule} from 'app/shared';
import {GroupDeleteDialogComponent, GroupDetailComponent, GroupsComponent, groupsRoute, GroupUpdateComponent} from "./";
import {JhiLanguageService} from "ng-jhipster";
import {MkhLanguageHelper} from "app/core";
import { GroupAuthoritiesComponent } from './group-authorities.component';
import { GroupUsersComponent } from './group-users.component';
import { GroupUserDeleteDialogeComponent } from './group-user-delete-dialoge.component';



const ENTITY_STATES = [...groupsRoute];

@NgModule({
    imports: [MkhodabandeluFrameworkSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GroupsComponent,
        GroupDetailComponent,
        GroupUpdateComponent,
        GroupDeleteDialogComponent,
        GroupAuthoritiesComponent,
        GroupUsersComponent,
        GroupUserDeleteDialogeComponent,
    ],
    entryComponents: [GroupsComponent, GroupUpdateComponent, GroupDeleteDialogComponent,GroupUserDeleteDialogeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MkhodabandeluFrameworkGroupsModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: MkhLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
