import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlternativeCodes } from '../../models/alternative-codes.model';
import { FeaturedSchedules } from '../../models/featured-schedules.model';
import { PlasmaLineConfig } from '../../models/plasma-line.model';
import { Schedule } from '../../models/schedule.model';
import { ConfigurationRestService } from '../rest/configuration.rest.service';
import { EventAggregator } from '../utils/event-aggregator';

@Injectable()
export class ConfigurationService {

  constructor(private plasmaLineConfigurationRestService: ConfigurationRestService,
    private eventAggregator: EventAggregator) { }

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

  getAlternativeCodes(): Observable<AlternativeCodes[]> {
    return this.plasmaLineConfigurationRestService.getAlternativeCodes().pipe(
      map((lineConfig: HttpResponse<AlternativeCodes[]>) => {
        return lineConfig.body as AlternativeCodes[];
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }


  getInitialSchedules(code: string): Observable<void> {
    return this.plasmaLineConfigurationRestService.getSchedulesByConfigurationCode(code).pipe(
      map((data: HttpResponse<Schedule[]>) => {
        const featuredSchedules = {
          schedules: data.body
        } as FeaturedSchedules;
        this.eventAggregator.featuredSchedules.next(featuredSchedules);
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
