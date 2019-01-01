import {Component, OnInit} from '@angular/core';
import {CameraService} from "app/admin/cameras/camera.service";
import {SERVER_SHINOBI_API_URL} from "app/app.constants";

@Component({
    selector: 'mkh-cameras',
    templateUrl: './cameras.component.html',
    styles: []
})
export class CamerasComponent implements OnInit {

    src:string = SERVER_SHINOBI_API_URL +"/plfzdqmeevnPfcXnJOJ3EqJ2Vg7O3f/mp4/pmtByfUU2a/a1x48SXwwp/s.mp4";

    constructor() {
    }

    ngOnInit() {

    }

}
