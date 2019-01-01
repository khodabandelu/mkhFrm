import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MkhodabandeluFrameworkSharedModule} from "app/shared";
import {RouterModule} from "@angular/router";
import {JhiLanguageService} from "ng-jhipster";
import {MkhLanguageHelper} from "app/core";
import {CamerasComponent} from './cameras.component';
import { CameraVideosComponent } from './camera-videos/camera-videos.component';


@NgModule({
    imports: [MkhodabandeluFrameworkSharedModule, RouterModule.forChild([
        {
            path: 'cameras',
            component:CamerasComponent,
        },
        {
            path: 'videos',
            component:CameraVideosComponent
        }
    ])],
    declarations: [CamerasComponent, CameraVideosComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class MkhodabandeluFrameworkCamerasModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: MkhLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
