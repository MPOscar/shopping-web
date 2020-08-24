import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { BrandsResolveService } from '../ms-brands/services/brands-resolve.service';
import { CategoriesResolveService } from '../ms-categories/services/categories-resolve.service';

import { CollectionsResolveService } from '../ms-collections/services/collections-resolve.service';
import { IdResolveService } from '../../../routing/services/id-resolve.service';
import { StylesResolveService } from '../ms-style/services/styles-resolve.service';
import { ShopsPageComponent } from './components/shops-page.component';
import { SingleShopPageComponent } from './components/single-shop-page/single-shop-page.component';
import { ShopsResolveService } from './services/shops-resolve.service';
import { OffersResolveService } from '../ms-offers/services/offers-resolve.service';
import {ShopShippingResolveService} from './services/shops-status-resolve.service';
import {ShopResolveService} from './services/shop-resolve.service';


const routes: Routes = [
    {
        path: ':shipping',
        component: ShopsPageComponent,
        resolve: {
            shipping: ShopShippingResolveService,
            config: ConfigResolveService,
            brands: BrandsResolveService,
            categories: CategoriesResolveService,
            collections: CollectionsResolveService,
            offers: OffersResolveService,
        }
    },
    {
      path: '',
      component: ShopsPageComponent,
      resolve: {
        shipping: ShopShippingResolveService,
        config: ConfigResolveService,
        brands: BrandsResolveService,
        categories: CategoriesResolveService,
        collections: CollectionsResolveService,
        offers: OffersResolveService,
      }
    },
    {
        path: 'details/:slug',
        component: SingleShopPageComponent,
        resolve: {
            brands: BrandsResolveService,
            config: ConfigResolveService,
            collections: CollectionsResolveService,
            shopId: IdResolveService,
            styles: StylesResolveService,
            shops: ShopsResolveService,
            shop: ShopResolveService
        },
        data: { closeRouteCommand: ['../'] }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MsShopsRoutingModule { }
