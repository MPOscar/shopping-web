import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandsResolveService } from '../ms-brands/services/brands-resolve.service';
import { CategoriesResolveService } from '../ms-categories/services/categories-resolve.service';
import { StylesResolveService } from '../ms-style/services/styles-resolve.service';
import { OffersResolveService } from '../ms-offers/services/offers-resolve.service';
import {DealsResolveService} from '../ms-deals/services/deals-resolve.service';
import {ReleasesResolveService} from '../ms-releases/services/releases-resolve.service';
import {ShopsResolveService} from '../ms-shops/services/shops-resolve.service';
import {CategoriesComponent} from './components/categories/categories.component';
import {CategoryResolveService} from './services/category-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    resolve: {
      releases: ReleasesResolveService,
      shops: ShopsResolveService,
      styles: StylesResolveService,
      brands: BrandsResolveService,
      categories: CategoriesResolveService,
      offers: OffersResolveService
    }
  },
  {
    path: ':slug',
    component: CategoriesComponent,
    resolve: {
      slug: CategoryResolveService,
      releases: ReleasesResolveService,
      shops: ShopsResolveService,
      styles: StylesResolveService,
      brands: BrandsResolveService,
      categories: CategoriesResolveService,
      offers: OffersResolveService
    }
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MsCategoriesRoutingModule { }
