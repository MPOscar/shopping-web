import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {BrandsService} from '../services/brands.service';
import {Brand} from '../models/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandResolveService implements Resolve<Brand> {
  constructor(private brandsService: BrandsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const slug = route.paramMap.get('slug');
    return this.brandsService.getAllBrands().toPromise().then(brands => {
      return brands.find(brand => slug === brand.name.toLowerCase().replace(/ /g, '-'));
    });
  }
}
