import { Injectable } from '@angular/core';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
//
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { ConfigService } from '../../../../config/services/config.service';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

    apiEndpoint: string;

    previousFilter: any = {};

    previousSortColumn: string = 'title';

    previousSortDirection: string = 'asc';

    previousPageIndex: number = 0;

    previousPageSize: number = 10;

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.settings.apiEndpoint;
    }

    //
    // Begin functions that most services have.
    //

    getGDPR(): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + 'gdpr/');
    }

    getPrivacyPolicy(): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + 'privacy/');
    }

    getPrivacyPolicyi(): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + 'privacy/');
    }

    getWhoWeAre() {
        return this.http.get<any>(this.apiEndpoint + 'who_are_we/');
    }

    getBecomeAPartner(){
        return this.http.get<any>(this.apiEndpoint + 'become_partner/');
    }

}

