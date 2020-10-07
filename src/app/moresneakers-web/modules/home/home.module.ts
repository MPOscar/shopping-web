import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
//
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';

import { MsBrandsModule } from '../ms-brands/ms-brands.module';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsHottestReleasesComponent } from './components/ms-hottest-releases/ms-hottest-releases.component';
import { MsLatestNewsComponent } from './components/ms-latest-news/ms-latest-news.component';
import { SharedPipesModule } from '../../../shared';
import { SocialSectionComponent } from './components/social-section/social-section.component';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        HomeRoutingModule,
        MsBrandsModule,
        MsOurPartnersModule,
        SharedPipesModule,
        MsSliderModule,
        MsHeaderModule,
        MsHottestReleasesModule,
        MsBannerModule
    ],
    declarations: [
        HomeComponent,
        ComingSoonComponent,
        MsHottestReleasesComponent,
        MsLatestNewsComponent,
        SocialSectionComponent,
    ]
})
export class HomeModule { }
