import { Component, OnInit } from '@angular/core';
import {CameraService} from "app/admin/cameras/camera.service";
import {SERVER_SHINOBI_API_URL} from "app/app.constants";

@Component({
  selector: 'mkh-camera-videos',
  templateUrl: './camera-videos.component.html',
  styles: []
})
export class CameraVideosComponent implements OnInit {

    videos: any[];
    resourceUrl = SERVER_SHINOBI_API_URL ;
    apiKey:string  = 'plfzdqmeevnPfcXnJOJ3EqJ2Vg7O3f';
    groupKey:string  = 'pmtByfUU2a';
    monitorId:string  = 'a1x48SXwwp';

    constructor(private cameraService: CameraService) {
    }

    ngOnInit() {
        this.cameraService.getAllVideos(this.apiKey,this.groupKey,this.monitorId).subscribe(res => {
            this.videos = res.videos;
        })
    }

}
