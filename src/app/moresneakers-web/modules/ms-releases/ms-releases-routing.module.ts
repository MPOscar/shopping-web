import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//
import {ConfigResolveService} from '../../../config/services/config-resolve.service';
import {BrandsResolveService} from '../ms-brands/services/brands-resolve.service';
import {CategoriesResolveService} from '../ms-categories/services/categories-resolve.service';

import {CollectionsResolveService} from '../ms-collections/services/collections-resolve.service';
import {IdResolveService} from '../../../routing/services/id-resolve.service';
import {StylesResolveService} from '../ms-style/services/styles-resolve.service';
import {MsReleasePageComponent} from './components/ms-release-page/ms-release-page.component';
import {ShopsResolveService} from '../ms-shops/services/shops-resolve.service';
import {OffersResolveService} from '../ms-offers/services/offers-resolve.service';
import {ReleasesComponent} from './components/releases/releases.component';
import {ReleasesResolveService} from '../ms-releases/services/releases-resolve.service';
import {NameResolveService} from '../../../routing/services/name-resolve.service';
import {ReleaseSlugResolveService} from '../../../routing/services/release-slug-resolve.service';
import {UpcomingReleasesResolveService} from './services/upcoming-releases-resolve.service';


const routes: Routes = [
  {
    path: '',
    component: ReleasesComponent,
    resolve: {
      config: ConfigResolveService,
      brands: BrandsResolveService,
      categories: CategoriesResolveService,
      collections: CollectionsResolveService,
      releases: ReleasesResolveService,
    }
  },
  {
    path: 'search',
    component: ReleasesComponent,
    resolve: {
      config: ConfigResolveService,
      brands: BrandsResolveService,
      categories: CategoriesResolveService,
      collections: CollectionsResolveService,
      releases: ReleasesResolveService,
    }
  },
  {
    path: 'upcoming',
    component: ReleasesComponent,
    resolve: {
      config: ConfigResolveService,
      brands: BrandsResolveService,
      categories: CategoriesResolveService,
      collections: CollectionsResolveService,
      releases: ReleasesResolveService,
      upcoming: UpcomingReleasesResolveService
    }
  },
  {
    path: 'details/:id',
    component: MsReleasePageComponent,
    resolve: {
      releaseId: IdResolveService,
    },
    data: {closeRouteCommand: ['../']}
  },
  {
    path: ':slug',
    component: MsReleasePageComponent,
    resolve: {
      slug: ReleaseSlugResolveService,
    },
    data: {closeRouteCommand: ['../']}
  }
];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule]
// })

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsReleasesRoutingModule {
}
