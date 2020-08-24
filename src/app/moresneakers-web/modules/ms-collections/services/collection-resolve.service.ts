import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {CollectionsService} from '../services/collections.service';
import {Collection} from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionResolveService implements Resolve<Collection> {
  constructor(private collectionService: CollectionsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const slug = route.paramMap.get('slug');
    return this.collectionService.getAllCollections().toPromise().then(collections => {
      return collections.find(col => slug === col.name.toLowerCase().replace(/ /g, '-'));
    });
  }
}
