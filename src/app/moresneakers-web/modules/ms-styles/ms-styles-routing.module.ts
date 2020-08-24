import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StylesComponent } from './components/styles/styles.component';
//
import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { BrandsResolveService } from '../ms-brands/services/brands-resolve.service';
import { StylesResolveService } from './services/styles-resolve.service';
import { CategoriesResolveService } from '../ms-categories/services/categories-resolve.service';
import { IdResolveService } from '../../../routing/services/id-resolve.service';
import { OffersResolveService } from '../ms-offers/services/offers-resolve.service';
import { ShopsResolveService } from '../ms-shops/services/shops-resolve.service';
import {StyleResolveService} from './services/style-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: StylesComponent,
        resolve: {
            config: ConfigResolveService,
            brands: BrandsResolveService,
            categories: CategoriesResolveService,
            styles: StylesResolveService,
            offers: OffersResolveService,
        }
    },
    {
      path: ':slug',
      component: StylesComponent,
      resolve: {
        slug: StyleResolveService,
        config: ConfigResolveService,
        brands: BrandsResolveService,
        categories: CategoriesResolveService,
        styles: StylesResolveService,
        offers: OffersResolveService,
      }
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MsStylesRoutingModule { }
