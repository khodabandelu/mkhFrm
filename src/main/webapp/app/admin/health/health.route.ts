import { Route } from '@angular/router';

import { MkhHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
    path: 'jhi-health',
    component: MkhHealthCheckComponent,
    data: {
        pageTitle: 'health.title'
    }
};
