import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsBannerComponent } from './ms-banner.component';
import {SharedPipesModule} from '../..';

@NgModule({
  declarations: [MsBannerComponent],
  imports: [
    CommonModule,
    SharedPipesModule
  ],
  exports: [MsBannerComponent]
})
export class MsBannerModule { }
