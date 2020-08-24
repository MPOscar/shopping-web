import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsResolveService } from '../ms-brands/services/brands-resolve.service';
import { CategoriesResolveService } from '../ms-categories/services/categories-resolve.service';
import { StylesResolveService } from '../ms-style/services/styles-resolve.service';
import { OffersResolveService } from '../ms-offers/services/offers-resolve.service';
import {MsWhatsNewComponent} from './ms-whats-new.component';
import {DealsResolveService} from '../ms-deals/services/deals-resolve.service';
import {ReleasesResolveService} from '../ms-releases/services/releases-resolve.service';
import {ShopsResolveService} from '../ms-shops/services/shops-resolve.service';
import {WhatsNewStatusResolveService} from './services/whats-new-status-resolve.service';

const routes: Routes = [
  {
    path: ':status',
    component: MsWhatsNewComponent,
    resolve: {
      status: WhatsNewStatusResolveService,
      brands: BrandsResolveService,
      categories: CategoriesResolveService,
      deals: DealsResolveService,
      offers: OffersResolveService,
      releases: ReleasesResolveService,
      shops: ShopsResolveService,
      styles: StylesResolveService,
    }
  },
  {
    path: '',
    component: MsWhatsNewComponent,
    resolve: {
      status: WhatsNewStatusResolveService,
      brands: BrandsResolveService,
      categories: CategoriesResolveService,
      deals: DealsResolveService,
      offers: OffersResolveService,
      releases: ReleasesResolveService,
      shops: ShopsResolveService,
      styles: StylesResolveService,
    }
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MsWhatsNewRoutingModule { }
