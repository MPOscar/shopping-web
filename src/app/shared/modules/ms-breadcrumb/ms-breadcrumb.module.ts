import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsBreadcrumbComponent } from './ms-breadcrumb.component';

@NgModule({
  declarations: [MsBreadcrumbComponent],
  imports: [
    CommonModule
  ],
  exports: [MsBreadcrumbComponent]
})
export class MsBreadcrumbModule { }
