import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import { ReleaseCalendarRoutingModule } from './release-calendar-routing.module';
import { ReleaseCalendarComponent } from './components/release-calendar/release-calendar.component';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';

import { SharedPipesModule } from '../../../shared';
import { HttpRequestIndicatorModule } from '../../../http-request-indicator/http-request-indicator.module';

import { CalendarComponent } from './components/calendar/calendar.component';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsHottestReleasesComponent } from './components/ms-hottest-releases/ms-hottest-releases.component';
import { ReleaseCalendarHeaderComponent } from './components/ms-release-calendar-header/release-calendar-header.component';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { UpComingComponent } from './components/up-coming/up-coming.component';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsHottestReleaseSliderModule } from '../../../shared/modules/ms-hottest-release-slider/ms-hottest-release-slider.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbCarouselModule,
        NgbAlertModule,
        NgSelectModule,
        MsBreadcrumbModule,
        HttpRequestIndicatorModule,
        MsOurPartnersModule,
        ReleaseCalendarRoutingModule,
        SharedPipesModule,
        MsFiltersModule,
        NgMultiSelectDropDownModule,
        MsBannerModule,
        MsHottestReleaseSliderModule,
        MsSliderModule,
        MsHeaderModule,
        MsHottestReleasesModule
    ],
    declarations: [
        CalendarComponent,
        MsHottestReleasesComponent,
        ReleaseCalendarComponent,
        ReleaseCalendarHeaderComponent,
        UpComingComponent,
    ]
})
export class ReleaseCalendarModule { }
