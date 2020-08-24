import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { MsCollectionsModule } from '../ms-collections/ms-collections.module';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import { MsBrandsRoutingModule } from './ms-brands-routing.module';
import { BrandsComponent } from './components/brands/brands.component';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsProductTableModule } from '../../../shared/modules/ms-product-table/ms-product-table.module';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';
import { MsHottestReleaseSliderModule } from '../../../shared/modules/ms-hottest-release-slider/ms-hottest-release-slider.module';
import { Top5StoresComponent } from './components/top5-stores/top5-stores.component';
import { SharedPipesModule } from '../../../shared';

@NgModule({
  declarations: [
    BrandsComponent,
    Top5StoresComponent
  ],
  imports: [
    CommonModule,
    MsAdvertisementModule,
    MsBannerModule,
    MsBrandsRoutingModule,
    MsBreadcrumbModule,
    MsCollectionsModule,
    MsFiltersModule,
    MsHottestReleaseSliderModule,
    MsOurPartnersModule,
    MsProductTableModule,
    MsSliderModule,
    MsHeaderModule,
    MsHottestReleasesModule
  ],
  exports: [
    BrandsComponent
  ]
})
export class MsBrandsModule { }
