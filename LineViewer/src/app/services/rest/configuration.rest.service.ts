import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { FeaturedSchedules } from '../../models/featured-schedules.model';
import { PlasmaLineConfig } from '../../models/plasma-line.model';

@Injectable()
export class ConfigurationRestService {
 
  protected apiServer = AppConfig.settings.serverUrl + "/api/configuration/";

  constructor(private httpClient: HttpClient) { }

  getByCode(code: string): Observable<HttpResponse<PlasmaLineConfig>> { 
    return this.httpClient.get<PlasmaLineConfig>(`${this.apiServer}${code}`, { observe: 'response' });
  }

  validConfigurationCode(code: string): Observable<HttpResponse<boolean>> { 
    return this.httpClient.get<boolean>(`${this.apiServer}${code}/isvalid`, { observe: 'response' });
  }

  getSchedulesByConfigurationCode(code: string): Observable<HttpResponse<FeaturedSchedules>> { 
    return this.httpClient.get<FeaturedSchedules>(`${this.apiServer}${code}/schedules`, { observe: 'response' });
  }

}
