import {Injectable} from '@angular/core';
import {SERVER_SHINOBI_API_URL} from "app/app.constants";
import {Observable} from "rxjs";
import {IGroup} from "app/admin/groups";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class CameraService {

    private resourceUrl = SERVER_SHINOBI_API_URL ;

    // ${"api_key"}/videos/${"group_key"}/${"monitor_id"}

    constructor(private http: HttpClient) {
    }

    getAllVideos(apiKey: string, groupKey: string, monitorId: string): Observable<any> {
        return this.http.get<any>(this.resourceUrl + `/${apiKey}/videos/${groupKey}/${monitorId}`);
    }
}
