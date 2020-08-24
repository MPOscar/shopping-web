import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import { MsWhatsNewComponent } from './ms-whats-new.component';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsProductTableModule } from '../../../shared/modules/ms-product-table/ms-product-table.module';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';
import {MsWhatsNewRoutingModule} from './ms-whats-new-routing.module';

@NgModule({
  declarations: [
    MsWhatsNewComponent
  ],
  imports: [
    CommonModule,
    MsBreadcrumbModule,
    MsProductTableModule,
    MsOurPartnersModule,
    MsFiltersModule,
    MsBannerModule,
    MsAdvertisementModule,
    MsSliderModule,
    MsHeaderModule,
    MsHottestReleasesModule,
    MsWhatsNewRoutingModule
  ],
  exports: [
    MsWhatsNewComponent
  ]
})
export class MsWhatsNewModule { }
