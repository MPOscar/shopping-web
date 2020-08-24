import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
//
import { LayoutService } from '../../../moresneakers-web/modules/ms-layout/services/layout.service';
import { OurPartner } from '../../../moresneakers-web/modules/ms-layout/models/layout';
import { Deal } from '../../../moresneakers-web/modules/ms-deals/models/deal';
import { DealsService } from '../../../moresneakers-web/modules/ms-deals/services/deals.service';
import { Offer } from '../../../moresneakers-web/modules/ms-offers/models/offer';
import { OffersService } from '../../../moresneakers-web/modules/ms-offers/services/offers.service';
import { Release } from '../../../moresneakers-web/modules/ms-releases/models/releases';
import { ReleasesService } from '../../../moresneakers-web/modules/ms-releases/services/releases.service';
import { Shop } from '../../../moresneakers-web/modules/ms-shops/models/shops';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ms-our-partners',
  templateUrl: './ms-our-partners.component.html',
  styleUrls: ['./ms-our-partners.component.scss']
})
export class MsOurPartnersComponent implements OnInit, OnDestroy {
  public partners: Array<any> = [];

  ourpartnersData: Array<OurPartner>;

  @Input() pageId: string;

  @Input() deals: Array<Deal>;

  @Input() offers: Array<Offer>;

  @Input() releases: Array<Release>;

  @Input() shops: Array<Shop>;

  subscriptions: Subscription[] = [];

  constructor(public layoutService: LayoutService) { }

  ngOnInit() {

    const subGetOurPartners = this.layoutService.getOurPartners(this.pageId).subscribe(response => {
      this.ourpartnersData = response.data;
      this.ourpartnersData.forEach(tab => {
        const items: any = [];
        tab.slides.forEach(slide => {
          let item;
          if (slide.type === 'offer') {
            item = {
              modelName: 'Offer',
              image: this.getImageOffer(slide.entityId),
              slogan: slide.description,
              link: this.getLinkOffer(slide.entityId),
            };
          } else if (slide.type === 'deal') {
            item = {
              modelName: 'Deal',
              image: this.getImageDeal(slide.entityId),
              slogan: slide.description,
              link: this.getLinkDeal(slide.entityId),
            };
          }
          items.push(item);
        });

        this.partners.push({
          tabName: tab.label,
          items: items
        });

      });
    });

    this.subscriptions.push(subGetOurPartners);
  }

  getImageOffer(offerId: string) {
    const offer = this.offers.find(offerItem => {
      return offerItem.id === offerId;
    });

    if (offer) {
      return this.releases.find(releaseItem => {
        return releaseItem.id === offer.releaseId;
      }).mainImage;
    }
    return 'assets/images/no-image.svg';
  }

  getImageDeal(dealId: string) {
    if (dealId) {
      const deal = this.deals.find(dealItem => {
        return dealItem.id === dealId;
      });
      if (deal) {
        return deal.imgUrl;
      }
    }
    return 'assets/images/no-image.svg';
  }

  getLinkOffer(offerId: string) {
    const offer = this.offers.find(offerItem => {
      return offerItem.id === offerId;
    });

    if (offer && offer.links && offer.links.length > 0) {
      const link = offer.links[0];
      return this.cleanUrl(link.bitlyUrl || link.trackedUrl || link.url);
    }

    return '#';
  }

  getLinkDeal(dealId: string) {
    const deal = this.deals.find(dealItem => {
      return dealItem.id === dealId;
    });
    if (deal) {
      return this.cleanUrl(deal.bitlyUrl || deal.trackedUrl || deal.url);
    }
    return '#';
  }

  cleanUrl(url) {
    if (url) {
      if (!url.startsWith('http')) {
        return '//' + url;
      }
      return url;
    }
    return '#';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
