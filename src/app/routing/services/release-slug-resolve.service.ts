import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {ReleasesService} from '../../moresneakers-web/modules/ms-releases/services/releases.service';
import {Release} from '../../moresneakers-web/modules/ms-releases/models/releases';

@Injectable({
  providedIn: 'root'
})
export class ReleaseSlugResolveService implements Resolve<Release> {
  constructor(private releasesService: ReleasesService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const slug = route.paramMap.get('slug');
    return this.releasesService.getReleaseBySlug(slug).toPromise().then(slugs => slugs.data ? slugs.data[0] : null);
  }
}
