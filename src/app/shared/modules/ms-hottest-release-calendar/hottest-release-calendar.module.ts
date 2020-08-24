import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HottestReleaseCalendarComponent } from './hottest-release-calendar.component';

import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbAlertModule
  ],
  declarations: [
    HottestReleaseCalendarComponent
  ],
  exports: [
    HottestReleaseCalendarComponent
  ]
})
export class HottestReleaseCalendarModule { }
