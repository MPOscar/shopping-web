import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//
import { MsShopsCollapsMenuComponent } from './ms-shops-collaps-menu.component';

@NgModule({
  declarations: [MsShopsCollapsMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MsShopsCollapsMenuComponent
  ]
})
export class MsShopsCollapsMenuModule { }
