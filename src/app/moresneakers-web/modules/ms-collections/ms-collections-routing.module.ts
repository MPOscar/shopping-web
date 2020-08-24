import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
//import { BrandsTableComponent } from './ms-release-page/brands-table/brands-table.component';
//import { BrandCreatorComponent } from './ms-release-page/brand-creator/brand-creator.component';
//import { DeleteBrandComponent } from './ms-release-page/delete-brand/delete-brand.component';
//import { EditBrandComponent } from './ms-release-page/edit-brand/edit-brand.component';
import { CollectionsComponent } from './components/collections/collections.component';
//
import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { BrandsResolveService } from '../ms-brands/services/brands-resolve.service';
import { CollectionsResolveService } from './services/collections-resolve.service';
import { CategoriesResolveService } from '../ms-categories/services/categories-resolve.service';
import { IdResolveService } from '../../../routing/services/id-resolve.service';
import { OffersResolveService } from '../ms-offers/services/offers-resolve.service';
import { ShopsResolveService } from '../ms-shops/services/shops-resolve.service';
import {CollectionResolveService} from './services/collection-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: CollectionsComponent,
        resolve: {
            config: ConfigResolveService,
            brands: BrandsResolveService,
            categories: CategoriesResolveService,
            collections: CollectionsResolveService,
            offers: OffersResolveService
        }
    },
    {
      path: ':slug',
      component: CollectionsComponent,
      resolve: {
        slug: CollectionResolveService,
        config: ConfigResolveService,
        brands: BrandsResolveService,
        categories: CategoriesResolveService,
        collections: CollectionsResolveService,
        offers: OffersResolveService
      }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MsCollectionsRoutingModule { }
