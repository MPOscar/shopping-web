import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomizedComponent } from '../ms-customized/components/customized/customized.component';
import { MoresneakersWebComponent } from '../../component/moresneakers-web/moresneakers-web.component';
import { ReleaseComponent } from '../release/components/release/release.component';
import { CategoriesComponent } from '../ms-categories/components/categories/categories.component';
import { MsWhatsNewComponent } from '../ms-whats-new/ms-whats-new.component';
import { SalesComponent } from '../ms-sales/components/sales/sales.component';
import { SearchPageComponent } from '../ms-search/search-page.component';

import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { DealsResolveService } from '../ms-deals/services/deals-resolve.service';
import { OffersResolveService } from '../ms-offers/services/offers-resolve.service';
import { ReleasesResolveService } from '../ms-releases/services/releases-resolve.service';
import { ShopsResolveService } from '../ms-shops/services/shops-resolve.service';
import { StylesResolveService } from '../ms-style/services/styles-resolve.service';
import { BrandsResolveService } from '../ms-brands/services/brands-resolve.service';
import { CategoriesResolveService } from '../ms-categories/services/categories-resolve.service';
import { ContactComponent } from '../ms-contact/contact.component';
import { CollectionsResolveService } from '../ms-collections/services/collections-resolve.service';
import {NotFoundComponent} from '../../../not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MoresneakersWebComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: '../home/home.module#HomeModule',
        resolve: {
          config: ConfigResolveService,
        }
      },
      {
        path: 'release-calendar',
        loadChildren: '../release-calendar/release-calendar.module#ReleaseCalendarModule',
        resolve: {
          config: ConfigResolveService,
        }
      },
      {
        path: 'whats-new',
        loadChildren: '../ms-whats-new/ms-whats-new.module#MsWhatsNewModule',
        resolve: {
          config: ConfigResolveService,
        }
      },
      {
        path: 'search',
        component: SearchPageComponent,
        resolve: {
          // config: ConfigResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
        }
      },
      // {
      //   path: 'release',
      //   component: ReleaseComponent
      // },
      {
        path: 'sales',
        component: SalesComponent,
        resolve: {
          // config: ConfigResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          offers: OffersResolveService
        }
      },
      {
        path: 'customize',
        component: CustomizedComponent,
        resolve: {
          // config: ConfigResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          offers: OffersResolveService
        }
      },
      {
        path: 'categories',
        loadChildren: '../ms-categories/ms-categories.module#MsCategoriesModule',
        resolve: {
          // config: ConfigResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          offers: OffersResolveService
        }
      },
      {
        path: 'releases',
        loadChildren: '../ms-releases/ms-releases.module#MsReleasesModule',
        resolve: {
          config: ConfigResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          offers: OffersResolveService,
          collections: CollectionsResolveService,
        }
      },
      {
        path: 'brands',
        loadChildren: '../ms-brands/ms-brands.module#MsBrandsModule',
        resolve: {
          config: ConfigResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          offers: OffersResolveService
        }
      },
      {
        path: 'collections',
        loadChildren: '../ms-collections/ms-collections.module#MsCollectionsModule',
        resolve: {
          config: ConfigResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          offers: OffersResolveService
        }
      },
      {
        path: 'styles',
        loadChildren: '../ms-styles/ms-styles.module#MsStylesModule',
        resolve: {
          config: ConfigResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          offers: OffersResolveService
        }
      },
      {
        path: 'blog',
        loadChildren: '../ms-blogs/ms-blogs.module#MsBlogsModule',
        resolve: {
          config: ConfigResolveService,
        }
      },
      {
        path: 'become-partner',
        loadChildren: '../ms-become-a-partner/ms-become-a-partner.module#MsBecomeAPartnerModule',
        resolve: {
          config: ConfigResolveService,
        }
      },
      {
        path: 'who-are-we',
        loadChildren: '../ms-who-are-we/ms-who-are-we.module#MsWhoAreWeModule',
        resolve: {
          config: ConfigResolveService,
        }
      },
      {
        path: 'privacy-policy',
        loadChildren: '../ms-privacy/ms-privacy.module#MsPrivacyModule',
        resolve: {
          config: ConfigResolveService,
        }
      },
      {
        path: 'shops',
        loadChildren: '../ms-shops/ms-shops.module#MsShopsModule',
        resolve: {
          config: ConfigResolveService,
          releases: ReleasesResolveService,
          shops: ShopsResolveService,
          styles: StylesResolveService,
          brands: BrandsResolveService,
          categories: CategoriesResolveService,
          offers: OffersResolveService
        }
      },
      {
        path: 'contact',
        component: ContactComponent,
        resolve: {
          releases: ReleasesResolveService,
        }
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MoresneakersWebRoutingModule {
}
