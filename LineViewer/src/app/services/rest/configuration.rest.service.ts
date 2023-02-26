import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
import { AlternativeCodes } from '../../models/alternative-codes.model';
import { PlasmaLineConfig } from '../../models/plasma-line.model';
import { Schedule } from '../../models/schedule.model';

@Injectable()
export class ConfigurationRestService {
 
  protected apiServer = AppConfig.settings.serverUrl + "/api/configuration/";
  protected configFileServer = AppConfig.settings.imagesServerUrl;

  constructor(private httpClient: HttpClient) { }

  getByCode(code: string): Observable<HttpResponse<PlasmaLineConfig>> { 
    return this.httpClient.get<PlasmaLineConfig>(`${this.apiServer}${code}`, { observe: 'response' });
  }

  getAlternativeCodes(): Observable<HttpResponse<AlternativeCodes[]>> { 
    return this.httpClient.get<AlternativeCodes[]>(`${this.configFileServer}/configurations/alternate_codes.json`, { observe: 'response' });
  }

  validConfigurationCode(code: string): Observable<HttpResponse<boolean>> { 
    return this.httpClient.get<boolean>(`${this.apiServer}${code}/isvalid`, { observe: 'response' });
  }

  getSchedulesByConfigurationCode(code: string): Observable<HttpResponse<Schedule[]>> { 
    return this.httpClient.get<Schedule[]>(`${this.apiServer}${code}/schedules`, { observe: 'response' });
  }

}
