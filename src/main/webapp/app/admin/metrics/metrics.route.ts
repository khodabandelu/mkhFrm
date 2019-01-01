import { Route } from '@angular/router';

import { MkhMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
    path: 'jhi-metrics',
    component: MkhMetricsMonitoringComponent,
    data: {
        pageTitle: 'metrics.title'
    }
};
