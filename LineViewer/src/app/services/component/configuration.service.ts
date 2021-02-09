import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlasmaLine } from '../../models/plasma-line.model';
import { ConfigurationRestService } from '../rest/configuration.rest.service';

@Injectable()
export class ConfigurationService {
  
  constructor(private plasmaLineConfigurationRestService: ConfigurationRestService) { }

  getByCode(code: string): Observable<PlasmaLine> { 
    return this.plasmaLineConfigurationRestService.getByCode(code).pipe(
        map((lineConfig: HttpResponse<PlasmaLine>) => {
            return lineConfig.body as PlasmaLine;
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
