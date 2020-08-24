import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import { ShopsPageComponent } from './components/shops-page.component';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MostPopularShopsComponent } from './components/most-popular-shops/most-popular-shops.component';
import { MsSectionTitleModule } from '../../../shared/modules/ms-section-title/ms-section-title.module';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { ShopsLetterTableComponent } from './components/shops-letter-table/shops-letter-table.component';
import { SingleShopPageComponent } from './components/single-shop-page/single-shop-page.component';
import { SingleShopDetailsComponent } from './components/single-shop-details/single-shop-details.component';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';
import { SingleShopMapComponent } from './components/single-shop-map/single-shop-map.component';
import { MsProductTableModule } from '../../../shared/modules/ms-product-table/ms-product-table.module';
import { MsShopsRoutingModule } from './ms-shops-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MsBannerModule,
    MsBreadcrumbModule,
    MsSectionTitleModule,
    MsShopsRoutingModule,
    MsFiltersModule,
    MsAdvertisementModule,
    MsProductTableModule,
    MsSliderModule,
    MsHeaderModule,
    MsHottestReleasesModule
  ],
  declarations: [
    ShopsPageComponent,
    MostPopularShopsComponent,
    ShopsLetterTableComponent,
    SingleShopPageComponent,
    SingleShopDetailsComponent,
    SingleShopMapComponent
  ],
  exports: [
    ShopsPageComponent,
    SingleShopPageComponent
  ]
})
export class MsShopsModule {
}
