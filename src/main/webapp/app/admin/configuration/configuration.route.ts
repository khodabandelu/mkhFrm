import { Route } from '@angular/router';

import { MkhConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
    path: 'jhi-configuration',
    component: MkhConfigurationComponent,
    data: {
        pageTitle: 'configuration.title'
    }
};
