import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'findLanguageFromKey'})
export class FindLanguageFromKeyPipe implements PipeTransform {
    private languages: any = {
        en: {name: 'English', icon: 'flag-icon-gb'},
        fa: {name: 'فارسی', icon: 'flag-icon-ir', rtl: true}
        // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
    };

    transform(lang: string): string {
        return this.languages[lang].name;
    }

    isRTL(lang: string): boolean {
        return this.languages[lang].rtl;
    }

    get(lang: string): string {
        return this.languages[lang];
    }

    all(): any[] {
        return this.languages;
    }
}
