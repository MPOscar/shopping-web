import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
//
import { TranslateModule } from '@ngx-translate/core';
//
import { MsOffersRoutingModule } from './ms-offers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MsOffersRoutingModule,
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    DatePipe
  ],
  entryComponents: [
  ]
})
export class MsOffersModule { }
