import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlasmaLine } from '../../models/plasma-line.model';

@Injectable()
export class ConfigurationRestService {
  //change this to config file
  api = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getByCode(code: string): Observable<HttpResponse<PlasmaLine>> { 
    return this.httpClient.get<PlasmaLine>(`${this.api}/api/configuration/${code}`, { observe: 'response' });
  }

  validConfigurationCode(code: string): Observable<HttpResponse<boolean>> { 
    return this.httpClient.get<boolean>(`${this.api}/api/configuration/${code}/isvalid`, { observe: 'response' });
  }

}
