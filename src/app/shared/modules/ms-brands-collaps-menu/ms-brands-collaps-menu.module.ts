import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsCollapsMenuComponent } from './brands-collaps-menu.component';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import {RouterModule} from '@angular/router';
// import {MsCollapsMenuModule} from '../ms-collaps-menu/ms-collaps-menu.module';


@NgModule({
  declarations: [BrandsCollapsMenuComponent],
    imports: [
        CommonModule,
        SharedPipesModule,
        RouterModule
    ],
  exports: [BrandsCollapsMenuComponent]
})
export class MsBrandsCollapsMenuModule { }
