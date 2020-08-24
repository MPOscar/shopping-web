import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page.component';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsProductTableModule } from '../../../shared/modules/ms-product-table/ms-product-table.module';
import {MsAdvertisementModule} from '../../../shared/modules/ms-advertisement/ms-advertisement.module';

@NgModule({
  declarations: [
    SearchPageComponent
  ],
  imports: [
    CommonModule,
    MsBreadcrumbModule,
    MsProductTableModule,
    MsOurPartnersModule,
    MsFiltersModule,
    MsBannerModule,
    MsAdvertisementModule
  ],
  exports: [
    SearchPageComponent
  ]
})
export class MsSearchPageModule { }
