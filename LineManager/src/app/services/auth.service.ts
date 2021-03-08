import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  protected apiServer = AppConfig.settings.serverUrl + "/api/auth/";

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(this.apiServer + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

}