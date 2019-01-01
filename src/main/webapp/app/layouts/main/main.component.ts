import {Component, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';

import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {MkhLanguageHelper} from "../../core/language/language.helper";

@Component({
    selector: 'mkh-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    color = 'blue';
    showSettings = false;
    showMinisidebar = false;
    showDarktheme = false;

    public config: PerfectScrollbarConfigInterface = {};

    constructor(public router: Router, private mKhLanguageHelper: MkhLanguageHelper) {
    }

    ngOnInit() {
        if (this.router.url === '/') {
            // this.router.navigate(['/dashboard/']);
        }
        // this.router.events.subscribe(event => {
        //     if (event instanceof NavigationEnd) {
        //         this.mKhLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
        //     }
        // });
    }

    // private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    //     let title: string =
    //         routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'MKhodabandeluFramework';
    //     if (routeSnapshot.firstChild) {
    //         title = this.getPageTitle(routeSnapshot.firstChild) || title;
    //     }
    //     return title;
    // }

}
