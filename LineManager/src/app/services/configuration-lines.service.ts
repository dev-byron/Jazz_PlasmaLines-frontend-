import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationLine } from '../models/configuration-line.model';
import { Sport } from '../models/sport.model';
import { AppConfig } from '../app.config';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class ConfigurationLinesService {

  protected apiServer = AppConfig.settings.serverUrl + '/api/';
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAll(): Observable<ConfigurationLine[]> {
    return this.http.get<ConfigurationLine[]>(this.apiServer +'configuration/user/' + this.tokenStorage.getUserId(), { responseType: 'json' });
  }

  getByCode(configurationCode: string):  Observable<ConfigurationLine> {
    return this.http.get<ConfigurationLine>(this.apiServer + 'configuration/' + configurationCode, { responseType: 'json' });
  }

  getSportsAsTree(): Observable<Sport[]> {
    return this.http.get<Sport[]>(this.apiServer + 'sports/tree', { responseType: 'json' });
  }

  save(configuration: ConfigurationLine):  Observable<ConfigurationLine> {
    return this.http.post<ConfigurationLine>(this.apiServer + 'configuration/', configuration, { responseType: 'json' });
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.apiServer + 'configuration/' + id, { responseType: 'json' });
  }

}