import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {StylesService} from '../services/styles.service';
import {Styles} from '../models/styles';

@Injectable({
  providedIn: 'root'
})
export class StyleResolveService implements Resolve<Styles> {
  constructor(private stylesService: StylesService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const slug = route.paramMap.get('slug');
    return this.stylesService.getAllStyles().toPromise().then(styles => {
      return styles.find(style => slug === style.name.toLowerCase().replace(/ /g, '-'));
    });
  }
}
