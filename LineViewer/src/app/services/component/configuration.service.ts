import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlasmaLineConfig } from '../../models/plasma-line.model';
import { ConfigurationRestService } from '../rest/configuration.rest.service';

@Injectable()
export class ConfigurationService {
  
  constructor(private plasmaLineConfigurationRestService: ConfigurationRestService) { }

  getByCode(code: string): Observable<PlasmaLineConfig> { 
    return this.plasmaLineConfigurationRestService.getByCode(code).pipe(
        map((lineConfig: HttpResponse<PlasmaLineConfig>) => {
            return lineConfig.body as PlasmaLineConfig;
        }),
        catchError((error: HttpErrorResponse) => {
            return throwError(error);
        })
    );
  }

  validConfigurationCode(code: string): Observable<boolean> { 
    return this.plasmaLineConfigurationRestService.validConfigurationCode(code).pipe(
      map((lineConfig: HttpResponse<boolean>) => {
          return lineConfig.body as boolean;
      }),
      catchError((error: HttpErrorResponse) => {
          return throwError(error);
      })
    );
  }
}
