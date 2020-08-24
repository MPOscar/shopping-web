import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedPipesModule } from '../../../shared/pipes/shared-pipes.module';
import { HttpRequestIndicatorModule } from '../../../http-request-indicator/http-request-indicator.module';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { MsReleasesRoutingModule } from './ms-releases-routing.module';
import { MsReleasePageComponent } from './components/ms-release-page/ms-release-page.component';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';
import { MsReleasePageDetailsComponent } from './components/ms-release-page-details/ms-release-page-details.component';
import { MsReleasePageShopsComponent } from './components/ms-release-page-shops/ms-release-page-shops.component';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsProductTableModule } from '../../../shared/modules/ms-product-table/ms-product-table.module';

import { NgxGalleryModule } from 'ngx-gallery';

import { ReleasesComponent } from './components/releases/releases.component';
import { MsSectionTitleModule } from '../../../shared/modules/ms-section-title/ms-section-title.module';
import { RouterModule } from '@angular/router';



//import { MsOffersModule } from '../ms-offers/ms-offers.module';
//import { NewOfferComponent } from '../ms-offers/ms-release-page/new-offer/new-offer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxGalleryModule,
    NgSelectModule,
    MsBreadcrumbModule,
    MsBannerModule,
    MsFiltersModule,
    MsReleasesRoutingModule,
    MsAdvertisementModule,
    NgbModule.forRoot(),
    NgbCarouselModule,
    SharedPipesModule,
    MsOurPartnersModule,
    MsSectionTitleModule,
    MsProductTableModule,
    RouterModule,
    //
    //AskBeforeRefreshModule,
    //ErrorMessagesModule,
    HttpRequestIndicatorModule,
    //ImagesCardModule,
    //MsOffersModule,
    MsSliderModule,
    MsHeaderModule,
    MsHottestReleasesModule

  ],
  declarations: [
    ReleasesComponent,
    MsReleasePageComponent,
    MsReleasePageDetailsComponent,
    MsReleasePageShopsComponent
  ],
  exports: [
    ReleasesComponent,
    MsReleasePageComponent,
    MsReleasePageDetailsComponent,
    MsReleasePageShopsComponent
  ],
  entryComponents: [
  ]
})
export class MsReleasesModule { }
