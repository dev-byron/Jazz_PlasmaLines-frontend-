import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AppConfig } from '../app.config';

@Injectable()
export class UserService {

  protected apiServer = AppConfig.settings.serverUrl + '/api/users';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.apiServer, { responseType: 'json' });
  }

  getById(id): Observable<User> {
    return this.http.get<User>(this.apiServer + '/' + id, { responseType: 'json' });
  }

  getByEmail(email): Observable<User> {
    return this.http.get<User>(this.apiServer + '/byEmail/' + email, { responseType: 'json' });
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(this.apiServer, user, { responseType: 'json' });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.apiServer + '/' + id, { responseType: 'json' });
  }
}