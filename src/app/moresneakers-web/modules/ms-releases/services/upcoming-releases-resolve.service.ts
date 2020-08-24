import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
//
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
//
import { ErrorHandlingService } from '../../../../error-handling/services/error-handling.service';
import { ReleasesService } from './releases.service';
// import { setTranslationsstyles.service

const errorKey = 'Error';

@Injectable({
    providedIn: 'root'
})
export class UpcomingReleasesResolveService implements Resolve<any> {
    constructor(
        private releasesService: ReleasesService,
        private translate: TranslateService,
        private errorHandlingService: ErrorHandlingService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return of(true);
    }
}
