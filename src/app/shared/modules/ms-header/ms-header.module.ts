import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MsHeaderComponent } from './ms-header.component';
import { SharedPipesModule } from '../..';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MsHeaderComponent
  ],
  imports: [   
    RouterModule,
    CommonModule,
    SharedPipesModule,
    NgbCarouselModule,
    NgbAlertModule,
  ],
  exports: [
    MsHeaderComponent
  ]
})
export class MsHeaderModule { }
