import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';
import {PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {MainComponent} from "app/layouts/main/main.component";
import {MkhodabandeluFrameworkSharedModule} from "app/shared";
import {MAIN_ROUTE, MkhodabandeluFrameworkMainRoutingModule} from "app/layouts/main/main.route";
import {SidebarComponent} from "app/layouts/sidebar/sidebar.component";
import {FooterComponent} from "app/layouts/footer/footer.component";
import {NavigationComponent} from "app/layouts/header-navigation/navigation.component";
import {BreadcrumbComponent} from "app/shared/breadcrumb/breadcrumb.component";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {NotificationInterceptor} from "app/blocks/interceptor/notification.interceptor";
import {ActiveMenuDirective} from "app/layouts/header-navigation/active-menu.directive";
import {JhiLanguageService} from "ng-jhipster";
import {MkhLanguageHelper} from "app/core";
import {RouterModule} from "@angular/router";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true,
};

@NgModule({
    imports: [
        MkhodabandeluFrameworkSharedModule,
        //MkhodabandeluFrameworkMainRoutingModule,
         RouterModule.forChild([MAIN_ROUTE]),
        PerfectScrollbarModule
    ],
    declarations: [MainComponent, SidebarComponent, FooterComponent, NavigationComponent, BreadcrumbComponent, ActiveMenuDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    // providers: [
    //     {
    //         provide: HTTP_INTERCEPTORS,
    //         useClass: NotificationInterceptor,
    //         multi: true,
    //         deps: [Injector]
    //     }
    // ],
    // bootstrap: [MainComponent]
})
export class MkhodabandeluFrameworkMainModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: MkhLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
