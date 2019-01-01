import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {isNullOrUndefined} from 'util';
import {SERVER_API_URL} from '../../app.constants';
import {IUser} from './user';
import {Observable} from 'rxjs';
import {createRequestOption} from '../../shared/util/request-util';



type EntityResponseType = HttpResponse<IUser>;
type EntityArrayResponseType = HttpResponse<IUser[]>;


@Injectable({providedIn: 'root'})
export class UserService {
  private url = 'http://localhost:8082/';
  private resourceUrl = SERVER_API_URL + 'app/security/user';

  constructor(private http: HttpClient) {
  }

  getUsers(search?: string, page?: number, size?: number) {
    let params = new HttpParams();
    params = isNullOrUndefined(search) ? params : params.append('search', search);
    params = isNullOrUndefined(page) ? params : params.append('page', (page - 1).toString());
    params = isNullOrUndefined(page) ? params : params.append('size', size.toString());
    params = params.append('sort', 'e.createdDate desc');
    return this.http.get(this.resourceUrl + '/public/list', {params: params});
  }

  create(bankAccount: IUser): Observable<EntityResponseType> {
    return this.http.post<IUser>(this.resourceUrl, bankAccount, {observe: 'response'});
  }

  update(bankAccount: IUser): Observable<EntityResponseType> {
    return this.http.put<IUser>(this.resourceUrl, bankAccount, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUser>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl+ '/public/list',{params: options, observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

}
