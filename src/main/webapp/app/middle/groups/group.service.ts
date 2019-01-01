import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../app.constants';
import {Observable} from 'rxjs';
import {createRequestOption} from '../../shared/util/request-util';
import {IGroup} from './group';


type EntityResponseType = HttpResponse<IGroup>;
type EntityArrayResponseType = HttpResponse<IGroup[]>;

@Injectable({providedIn: 'root'})
export class GroupService {
  private resourceUrl = SERVER_API_URL + 'app/security/group';

  constructor(private http: HttpClient) {
  }

  create(bankAccount: IGroup): Observable<EntityResponseType> {
    return this.http.post<IGroup>(this.resourceUrl, bankAccount, {observe: 'response'});
  }

  update(bankAccount: IGroup): Observable<EntityResponseType> {
    return this.http.put<IGroup>(this.resourceUrl, bankAccount, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroup>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroup[]>(this.resourceUrl + '/public/list', {params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }
}
