import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {Category} from '../models/category';
import {CategoriesService} from '../services/categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolveService implements Resolve<Category> {
  constructor(private categoryService: CategoriesService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const slug = route.paramMap.get('slug');
    return this.categoryService.getAllCategories().toPromise().then(categories => {
      return categories.find(cat => slug === cat.name.toLowerCase().replace(/ /g, '-'));
    });
  }
}
