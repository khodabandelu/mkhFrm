import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MkhodabandeluFrameworkSharedModule } from 'app/shared';
import { LOGIN_ROUTE, LoginComponent } from './';
import {JhiLanguageService} from "ng-jhipster";
import {MkhLanguageHelper} from "app/core";

@NgModule({
    imports: [MkhodabandeluFrameworkSharedModule, RouterModule.forChild([LOGIN_ROUTE])],
    declarations: [LoginComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MkhodabandeluFrameworkLoginModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: MkhLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
