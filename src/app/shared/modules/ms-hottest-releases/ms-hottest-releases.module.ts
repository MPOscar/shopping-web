import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MsHottestReleasesComponent } from './ms-hottest-releases.component';
import { SharedPipesModule } from '../..';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MsHottestReleasesComponent
  ],
  imports: [   
    RouterModule,
    CommonModule,
    SharedPipesModule,
    NgbCarouselModule,
    NgbAlertModule,
  ],
  exports: [
    MsHottestReleasesComponent
  ]
})
export class MsHottestReleasesModule { }
