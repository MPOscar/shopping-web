import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsSectionTitleComponent } from './ms-section-title.component';

@NgModule({
  declarations: [MsSectionTitleComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MsSectionTitleComponent
  ]
})
export class MsSectionTitleModule { }
