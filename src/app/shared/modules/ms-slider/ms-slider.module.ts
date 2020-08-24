import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MsSliderComponent } from './ms-slider.component';
import {SharedPipesModule} from '../..';
import {NgbAlertModule, NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MsSliderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SharedPipesModule,
    NgbCarouselModule,
    NgbAlertModule
  ],
  exports: [
    MsSliderComponent
  ]
})
export class MsSliderModule { }
