import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {LocalStorageService, Ng2Webstorage, SessionStorageService} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MkhodabandeluFrameworkAppRoutingModule} from './app-routing.module';
import {SpinnerComponent} from './shared/spinner.component';
import {ErrorComponent} from 'app/layouts/error/error.component';
import {MkhodabandeluFrameworkSharedModule} from 'app/shared';
import {MkhodabandeluFrameworkCoreModule} from 'app/core';
import {JhiEventManager} from 'ng-jhipster';
import {AuthInterceptor} from 'app/blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from 'app/blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from 'app/blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from 'app/blocks/interceptor/notification.interceptor';
import {NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {AppComponent} from 'app/app.component';
import {MkhodabandeluFrameworkMainModule} from 'app/layouts/main';
import {MkhodabandeluFrameworkLoginModule} from 'app/login';


@NgModule({
    imports: [
        BrowserModule,
        MkhodabandeluFrameworkAppRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'mkh', separator: '-'}),
        MkhodabandeluFrameworkSharedModule,
        MkhodabandeluFrameworkCoreModule,
        MkhodabandeluFrameworkMainModule,
        // MkhodabandeluFrameworkAccountModule,
        // MkhodabandeluFrameworkEntityModule,
        MkhodabandeluFrameworkLoginModule,
        MkhodabandeluFrameworkMainModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        ErrorComponent,
        // ActiveMenuDirective,
        SpinnerComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [JhiEventManager]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [Injector]
        },

        // {
        //   provide: LocationStrategy,
        //   useClass: HashLocationStrategy
        // }
    ],
    bootstrap: [AppComponent]
})
export class MkhodabandeluFrameworkAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = {year: moment().year() - 100, month: 1, day: 1};
    }
}
