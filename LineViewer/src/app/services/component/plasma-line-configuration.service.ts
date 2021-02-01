import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PlasmaLine } from '../../models/plasma-line.model';
import { PlasmaLineConfigurationRestService } from '../rest/plasma-line-configuration.rest.service';

@Injectable()
export class PlasmaLineConfigurationService {
  
  constructor(private plasmaLineConfigurationRestService: PlasmaLineConfigurationRestService) { }

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

}
