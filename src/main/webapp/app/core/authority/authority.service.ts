import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IAuthority} from 'app/core/authority/authority.model';

@Injectable({providedIn: 'root'})
export class AuthorityService {
    private resourceUrl = SERVER_API_URL + 'api/authorities';

    constructor(private http: HttpClient) {
    }

    query(req?: any): Observable<HttpResponse<IAuthority[]>> {
        const options = createRequestOption(req);
        return this.http.get<IAuthority[]>(this.resourceUrl + '/getAllGrid', {params: options, observe: 'response'});
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(this.resourceUrl);
    }

    getAll(): Observable<IAuthority[]> {
        return this.http.get<IAuthority[]>(this.resourceUrl + '/all',);
    }

    getMenuItems(parentId?:number): Observable<HttpResponse<any>> {
        return this.http.get<any>(`${this.resourceUrl}/menu`, { observe: 'response' });
    }
}
