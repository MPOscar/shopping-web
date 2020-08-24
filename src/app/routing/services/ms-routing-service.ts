import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {Slide} from '../../moresneakers-web/modules/ms-layout/models/layout';
import {ReleasesService} from '../../moresneakers-web/modules/ms-releases/services/releases.service';
import {OffersService} from '../../moresneakers-web/modules/ms-offers/services/offers.service';
import {CollectionsService} from '../../moresneakers-web/modules/ms-collections/services/collections.service';

@Injectable({
  providedIn: 'root'
})
export class MsRoutingService {
  constructor(private router: Router,
              private releasesService: ReleasesService,
              private offersService: OffersService,
              private collectionsService: CollectionsService,
  ) { }

  routeFromSlide(slide: Slide) {
    if (slide.entityType === 'release') {
      this.releasesService.getRelease(slide.entityId).toPromise().then(release => {
        const name = release.data ? release.data.name : null;
        if (name) {
          this.router.navigate(['/releases', this.getRouterName(name)]);
        }
      });
    } else if (slide.entityType === 'offer') {
      this.offersService.getOffer(slide.entityId).toPromise().then(offer => {
        const trackedUrl = (offer.data &&
          offer.data.links &&
          offer.data.links.length > 0) ? (offer.data.links[0].bitlyUrl || offer.data.links[0].trackedUrl) : null;
        if (trackedUrl) {
          window.open(trackedUrl, '_blank');
        }
      });
    } else {
      this.collectionsService.getCollection(slide.entityId).toPromise().then(collection => {
        const name = collection.data ? collection.data.name : null;
        if (name) {
          this.router.navigate(['/collections', this.getRouterName(name)]);
        }
      });
    }
  }

  getRouterName(name) {
    if (!name) {
      return '';
    }
    return name.toLowerCase().replace(/ /g, '-');
  }
}
