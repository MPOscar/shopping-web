import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
//import { BrandsTableComponent } from './ms-release-page/brands-table/brands-table.component';
//import { BrandCreatorComponent } from './ms-release-page/brand-creator/brand-creator.component';
//import { DeleteBrandComponent } from './ms-release-page/delete-brand/delete-brand.component';
//import { EditBrandComponent } from './ms-release-page/edit-brand/edit-brand.component';
import { BrandsComponent } from './components/brands/brands.component';
//
import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { BrandsResolveService } from './services/brands-resolve.service';
import { CollectionsResolveService } from '../ms-collections/services/collections-resolve.service';
import { CategoriesResolveService } from '../ms-categories/services/categories-resolve.service';
import { IdResolveService } from '../../../routing/services/id-resolve.service';
import { OffersResolveService } from '../ms-offers/services/offers-resolve.service';
import { ShopsResolveService } from '../ms-shops/services/shops-resolve.service';
import { StylesResolveService } from '../ms-style/services/styles-resolve.service';
//
import { CollectionsComponent } from '../ms-collections/components/collections/collections.component';
import {BrandResolveService} from './services/brand-resolve.service';


const routes: Routes = [
    {
        path: '',
        component: BrandsComponent,
        resolve: {
            config: ConfigResolveService,
            brands: BrandsResolveService,
            categories: CategoriesResolveService,
            collections: CollectionsResolveService,
            offers: OffersResolveService,
            shops: ShopsResolveService,
            styles: StylesResolveService,
        }
    },
    {
      path: ':slug',
      component: BrandsComponent,
      resolve: {
        slug: BrandResolveService,
        config: ConfigResolveService,
        brands: BrandsResolveService,
        categories: CategoriesResolveService,
        collections: CollectionsResolveService,
        offers: OffersResolveService,
        shops: ShopsResolveService,
        styles: StylesResolveService,
      }
    },
    {
        path: 'collections',
        component: CollectionsComponent,
        resolve: {
            config: ConfigResolveService,
            brands: BrandsResolveService,
            categories: CategoriesResolveService,
            collections: CollectionsResolveService,
            styles: StylesResolveService,
            shops: ShopsResolveService,
            //releases: ReleasesResolveService,

        },
        data: { closeRouteCommand: ['../'] }
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MsBrandsRoutingModule { }
