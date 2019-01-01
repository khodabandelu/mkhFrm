import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LoginService, MkhLanguageHelper, Principal, Account} from 'app/core';
import {SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {JhiLanguageService} from 'ng-jhipster';


declare var $: any;

@Component({
    selector: 'mkh-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, AfterViewInit {
    account: Account;
    name: string;
    languages: any[];
    langs: any;
    currentLanguage: any;
    public config: PerfectScrollbarConfigInterface = {};

    constructor(private principal: Principal,
                private loginService: LoginService,
                private router: Router,
                private modalService: NgbModal,
                private sessionStorage: SessionStorageService,
                private languageService: JhiLanguageService,
                private languageHelper: MkhLanguageHelper
    ) {
    }

    ngOnInit() {
        // this.languageHelper.getAll().then(languages => {
        //     this.languages = languages;
        // });
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.languageHelper.getAllWithInfo().then(langs => {
            this.langs = langs;
            this.languageService.getCurrent().then(current => {
                    this.currentLanguage = langs[current];
                }
            );
        });

        // this.languageService.getCurrent().then(current => {
        //         this.languageHelper.getLanguage(current).then(language => {
        //             this.currentLanguage = language;
        //         });
        //     }
        // );
    }

    changeLanguage(languageKey: string) {
        console.log(languageKey)
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
        this.currentLanguage = this.langs[languageKey];

        // this.languageHelper.getLanguage(languageKey).then(language => this.currentLanguage = language);
    }

    getIconLanguage(languageKey: string) {
        this.languageHelper.getLanguage(languageKey).then(language => {
            return language.icon;
        });

    }

    getCurrentLanguage() {
        this.languageService.getCurrent().then(current => {
                this.languageHelper.getLanguage(current).then(language => {
                    this.currentLanguage = language;
                });
            }
        );
    }

    generateArray(obj) {
        return Object.keys(obj).map((key) => {
            return obj[key]
        });
    }

    // This is for Notifications
    notifications: Object[] = [{
        round: 'round-danger',
        icon: 'ti-link',
        title: 'Luanch Admin',
        subject: 'Just see the my new admin!',
        time: '9:30 AM'
    }, {
        round: 'round-success',
        icon: 'ti-calendar',
        title: 'Event today',
        subject: 'Just a reminder that you have event',
        time: '9:10 AM'
    }, {
        round: 'round-info',
        icon: 'ti-settings',
        title: 'Settings',
        subject: 'You can customize this template as you want',
        time: '9:08 AM'
    }, {
        round: 'round-primary',
        icon: 'ti-user',
        title: 'Pavan kumar',
        subject: 'Just see the my admin!',
        time: '9:00 AM'
    }];

    // This is for Mymessages
    mymessages: Object[] = [{
        useravatar: 'assets/images/users/1.jpg',
        status: 'online',
        from: 'Pavan kumar',
        subject: 'Just see the my admin!',
        time: '9:30 AM'
    }, {
        useravatar: 'assets/images/users/2.jpg',
        status: 'busy',
        from: 'Sonu Nigam',
        subject: 'I have sung a song! See you at',
        time: '9:10 AM'
    }, {
        useravatar: 'assets/images/users/2.jpg',
        status: 'away',
        from: 'Arijit Sinh',
        subject: 'I am a singer!',
        time: '9:08 AM'
    }, {
        useravatar: 'assets/images/users/4.jpg',
        status: 'offline',
        from: 'Pavan kumar',
        subject: 'Just see the my admin!',
        time: '9:00 AM'
    }];

    ngAfterViewInit() {
        const set = function () {
            const width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
            const topOffset = 0;
            if (width < 1170) {
                $('#main-wrapper').addClass('mini-sidebar');
            } else {
                $('#main-wrapper').removeClass('mini-sidebar');
            }
        };
        $(window).ready(set);
        $(window).on('resize', set);

        $('.search-box a, .search-box .app-search .srh-btn').on('click', function () {
            $('.app-search').toggle(200);
        });

        $('body').trigger('resize');
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['login']);
    }
}
