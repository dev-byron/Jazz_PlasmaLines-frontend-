import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationLine } from '../models/configuration-line.model';

const API_URL = 'http://localhost:3000/api/configuration';

@Injectable()
export class ConfigurationLinesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ConfigurationLine[]> {
    return this.http.get<ConfigurationLine[]>(API_URL, { responseType: 'json' });
  }

  getByCode(configurationCode: string):  Observable<ConfigurationLine> {
    return this.http.get<ConfigurationLine>(API_URL + '/' + configurationCode, { responseType: 'json' });
  }

}