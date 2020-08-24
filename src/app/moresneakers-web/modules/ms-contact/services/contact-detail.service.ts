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
export class ContactDetailService {

    apiEndpoint: string;

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.settings.apiEndpoint;
    }

    putContactDetails(socialNetwork: string, data: any): Observable<any> {
        return this.http.put<any>(this.apiEndpoint + socialNetwork +'/', JSON.stringify(data));
    }

    getContactDetails(socialNetwork: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + socialNetwork +'/');
    }

}

