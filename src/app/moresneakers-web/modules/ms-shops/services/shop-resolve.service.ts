import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {Shop} from '../models/shops';
import {ShopsService} from './shops.service';

@Injectable({
  providedIn: 'root'
})
export class ShopResolveService implements Resolve<Shop> {
  constructor(private shopsService: ShopsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const slug = route.paramMap.get('slug');
    return this.shopsService.getAllShops().toPromise().then(shops => {
      return shops.find(shop => slug === shop.name.toLowerCase().replace(/ /g, '-'));
    });
  }
}
