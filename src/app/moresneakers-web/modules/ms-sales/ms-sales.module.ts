import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import { ReleasesOnSaleComponent } from './components/releases-on-sale/releases-on-sale.component';
import { SalesComponent } from './components/sales/sales.component';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsProductTableModule } from '../../../shared/modules/ms-product-table/ms-product-table.module';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';
import { MsSectionTitleModule } from '../../../shared/modules/ms-section-title/ms-section-title.module';

@NgModule({
  declarations: [
    SalesComponent,
    ReleasesOnSaleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCarouselModule,
    NgbModule,
    NgSelectModule,
    MsBreadcrumbModule,
    MsProductTableModule,
    MsOurPartnersModule,
    MsFiltersModule,
    MsBannerModule,
    SharedPipesModule,
    MsAdvertisementModule,
    MsSectionTitleModule,
    SharedPipesModule,
    MsSliderModule,
    MsHeaderModule,
    MsHottestReleasesModule
  ],
  exports: [
    SalesComponent,
    ReleasesOnSaleComponent
  ]
})
export class MsSalesModule { }
