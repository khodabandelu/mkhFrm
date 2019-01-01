import { NgModule } from '@angular/core';

import { MkhodabandeluFrameworkSharedLibsModule, FindLanguageFromKeyPipe, MkhAlertComponent, MkhAlertErrorComponent } from './';

@NgModule({
    imports: [MkhodabandeluFrameworkSharedLibsModule],
    declarations: [FindLanguageFromKeyPipe, MkhAlertComponent, MkhAlertErrorComponent],
    exports: [MkhodabandeluFrameworkSharedLibsModule, FindLanguageFromKeyPipe, MkhAlertComponent, MkhAlertErrorComponent]
})
export class MkhodabandeluFrameworkSharedCommonModule {}
