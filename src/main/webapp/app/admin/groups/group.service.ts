import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {createRequestOption} from 'app/shared/util/request-util';
import {IGroup} from "./";


@Injectable({providedIn: 'root'})
export class GroupService {
    private resourceUrl = SERVER_API_URL + 'api/groups';

    constructor(private http: HttpClient) {
    }

    create(group: IGroup): Observable<HttpResponse<IGroup>> {
        return this.http.post<IGroup>(this.resourceUrl, group, {observe: 'response'});
    }

    update(group: IGroup): Observable<HttpResponse<IGroup>> {
        return this.http.put<IGroup>(this.resourceUrl, group, {observe: 'response'});
    }

    updateAuthorities(group: IGroup): Observable<HttpResponse<IGroup>> {
        return this.http.put<IGroup>(this.resourceUrl+'/groupAuthorities', group, {observe: 'response'});
    }

    find(id: string): Observable<HttpResponse<IGroup>> {
        return this.http.get<IGroup>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    findWithAuthorities(id: string): Observable<HttpResponse<IGroup>> {
        return this.http.get<IGroup>(`${this.resourceUrl}/withAuthorities/${id}`, {observe: 'response'});
    }

    findWithUsers(id: string): Observable<HttpResponse<IGroup>> {
        return this.http.get<IGroup>(`${this.resourceUrl}/withUsers/${id}`, {observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<IGroup[]>> {
        const options = createRequestOption(req);
        return this.http.get<IGroup[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    deleteUserFromGroup(groupId:string,userId:string){
        return this.http.delete(this.resourceUrl+`/groupUsers/${groupId}/${userId}`, {observe: 'response'});
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/groups/authorities');
    }

    getAll(): Observable<IGroup[]> {
        return this.http.get<IGroup[]>(this.resourceUrl + '/all',);
    }

}
