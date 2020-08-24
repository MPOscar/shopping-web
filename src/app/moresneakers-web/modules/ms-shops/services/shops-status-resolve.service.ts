import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {Shop} from '../models/shops';

@Injectable({
  providedIn: 'root'
})
export class ShopShippingResolveService implements Resolve<Shop> {
  constructor() {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const shipping = route.paramMap.get('shipping');
    switch (shipping) {
      case 'usa': return of('USA');
      case 'europe': return of('Europe');
      case 'worldwide': return of('Worldwide');
      case 'marketplaces': return of('Select Countries');
    }
    return of(null);
  }
}
