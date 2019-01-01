import {Component, OnInit} from '@angular/core';
import {ROUTES} from './menu-items';
import {Account, AuthorityService, Principal} from "app/core";

declare var $: any;

@Component({
    selector: 'mkh-sidebar',
    templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements OnInit {
    account: Account;
    showMenu: string = '';
    showSubMenu: string = '';
    public sidebarnavItems: any[];
    menuItems: any;

    //this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';

        } else {
            this.showMenu = element;
        }
    }

    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';

        } else {
            this.showSubMenu = element;
        }
    }

    constructor(private principal: Principal, private authorityService: AuthorityService) {

    }

    // End open close
    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });

        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);

        this.authorityService.getMenuItems().subscribe(items => {
            this.menuItems = items.body;
        });
        $(function () {
            $(".sidebartoggler").on('click', function () {
                if ($("#main-wrapper").hasClass("mini-sidebar")) {
                    $("body").trigger("resize");
                    $("#main-wrapper").removeClass("mini-sidebar");

                } else {
                    $("body").trigger("resize");
                    $("#main-wrapper").addClass("mini-sidebar");
                }
            });

        });

    }
}
