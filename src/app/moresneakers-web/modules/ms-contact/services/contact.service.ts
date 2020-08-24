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
export class ContactService {

    apiEndpoint: string;

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.contact.apiEndpoint;
    }

    postSendEmail(data: any): Observable<any> {
        return this.http.post<any>(this.apiEndpoint, JSON.stringify(data));
    }

}

