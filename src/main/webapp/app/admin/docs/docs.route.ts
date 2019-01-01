import { Route } from '@angular/router';

import { MkhDocsComponent } from './docs.component';

export const docsRoute: Route = {
    path: 'docs',
    component: MkhDocsComponent,
    data: {
        pageTitle: 'global.menu.admin.apidocs'
    }
};
