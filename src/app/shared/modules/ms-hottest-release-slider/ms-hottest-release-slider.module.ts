import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MsHottestReleaseSliderComponent } from './ms-hottest-release-slider.component';
import {SharedPipesModule} from '../..';
import {NgbAlertModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MsHottestReleaseSliderComponent],
  imports: [   
    RouterModule,
    CommonModule,
    SharedPipesModule,
    NgbCarouselModule,
    NgbAlertModule,
  ],
  exports: [MsHottestReleaseSliderComponent]
})
export class MsHottestReleaseSliderModule { }
