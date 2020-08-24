import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
//
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';
import { MsBannerModule } from 'src/app/shared/modules/ms-banner/ms-banner.module';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { MsPrivacyRoutingModule } from './ms-privacy-routing.module';
import { SharedPipesModule } from 'src/app/shared';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MsAdvertisementModule,
    MsBannerModule,
    MsPrivacyRoutingModule,
    MsBreadcrumbModule,
    MsHeaderModule,
    SharedPipesModule,
  ],
  declarations: [
    PrivacyComponent,
  ],
  exports: [
    PrivacyComponent,
  ]
})
export class MsPrivacyModule { }
