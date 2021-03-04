import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationLine } from '../models/configuration-line.model';
import { Sport } from '../models/sport.model';

const API_URL = 'http://localhost:3000/api/';

@Injectable()
export class ConfigurationLinesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<ConfigurationLine[]> {
    return this.http.get<ConfigurationLine[]>(API_URL +'configuration/', { responseType: 'json' });
  }

  getByCode(configurationCode: string):  Observable<ConfigurationLine> {
    return this.http.get<ConfigurationLine>(API_URL + 'configuration/' + configurationCode, { responseType: 'json' });
  }

  getSportsAsTree(): Observable<Sport[]> {
    return this.http.get<Sport[]>(API_URL + 'sports/tree', { responseType: 'json' });
  }

  save(configuration: any):  Observable<ConfigurationLine> {
    return this.http.post<ConfigurationLine>(API_URL + 'configuration/', configuration, { responseType: 'json' });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(API_URL + 'configuration/' + id, { responseType: 'json' });
  }

}