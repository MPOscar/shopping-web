import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseComponent } from './components/release/release.component';
import {MsBreadcrumbModule} from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';

@NgModule({
  declarations: [ReleaseComponent],
  imports: [
    CommonModule,
    MsBreadcrumbModule
  ],
  exports: [ReleaseComponent]
})
export class ReleaseModule { }
