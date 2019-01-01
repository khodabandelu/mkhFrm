import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import {
    MkhodabandeluFrameworkSharedLibsModule,
    MkhodabandeluFrameworkSharedCommonModule,
    MkhLoginModalComponent,
    HasAnyAuthorityDirective
} from './';

@NgModule({
    imports: [MkhodabandeluFrameworkSharedLibsModule, MkhodabandeluFrameworkSharedCommonModule],
    declarations: [MkhLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [MkhLoginModalComponent],
    exports: [MkhodabandeluFrameworkSharedCommonModule, MkhLoginModalComponent, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MkhodabandeluFrameworkSharedModule {}
