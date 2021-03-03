import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const API_URL = 'http://localhost:3000/api/users';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'json' });
  }

  getById(id): Observable<User> {
    return this.http.get<User>(API_URL + '/' + id, { responseType: 'json' });
  }

  getByEmail(email): Observable<User> {
    return this.http.get<User>(API_URL + '/byEmail/' + email, { responseType: 'json' });
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(API_URL, user, { responseType: 'json' });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(API_URL + '/' + id, { responseType: 'json' });
  }
}