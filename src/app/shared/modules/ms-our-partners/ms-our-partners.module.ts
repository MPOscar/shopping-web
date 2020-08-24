import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsOurPartnersComponent } from './ms-our-partners.component';

import {NgbCarouselModule, NgbAlertModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedPipesModule} from '../..';

@NgModule({
  declarations: [MsOurPartnersComponent],
  imports: [
    CommonModule,
    NgbCarouselModule,
    NgbAlertModule,
    NgbTabsetModule,
    SharedPipesModule
  ],
  exports: [MsOurPartnersComponent]
})
export class MsOurPartnersModule { }
