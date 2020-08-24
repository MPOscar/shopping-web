import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//
import { MsHottestReleaseSliderModule } from '../../../shared/modules/ms-hottest-release-slider/ms-hottest-release-slider.module';
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import { MsWhoAreWeRoutingModule } from './ms-who-are-we-routing.module';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';
import { MsBannerModule } from 'src/app/shared/modules/ms-banner/ms-banner.module';
import { WhoAreWeComponent } from './components/who-are-we/who-are-we.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MsAdvertisementModule,
    MsBannerModule,
    MsWhoAreWeRoutingModule,
    MsBreadcrumbModule,
    MsHeaderModule,
  ],
  declarations: [
    WhoAreWeComponent,
  ],
  exports: [
    WhoAreWeComponent,
  ]
})
export class MsWhoAreWeModule { }
