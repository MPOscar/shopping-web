import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//
import { MsStylesRoutingModule } from './ms-styles-routing.module';
import { StylesComponent } from './components/styles/styles.component';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsProductTableModule } from '../../../shared/modules/ms-product-table/ms-product-table.module';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';


@NgModule({
  declarations: [
    StylesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    MsAdvertisementModule,
    MsBannerModule,
    MsStylesRoutingModule,
    MsBreadcrumbModule,
    MsFiltersModule,
    MsOurPartnersModule,
    MsProductTableModule,
  ],
  exports: [
    StylesComponent
  ]
})
export class MsStylesModule { }
