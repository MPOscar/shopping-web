import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {Offer} from '../../ms-offers/models/offer';

@Injectable({
  providedIn: 'root'
})
export class WhatsNewStatusResolveService implements Resolve<Offer> {
  constructor() {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const status = route.paramMap.get('status');
    if (status) {
      return of(status.replace('-', '_'));
    }
    return of(null);
  }
}
/**
export const STATUS: Status[] = [
    { id: 'available', name: 'Available' },
    { id: 'on_sale', name: 'On Sale' },
    { id: 'restock', name: 'Restock' },
    { id: 'sold_out', name: 'Sold Out' },
    { id: 'coming_soon', name: 'Coming Soon' },
];
*/
