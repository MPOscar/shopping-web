import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesCollapsMenuComponent } from './categories-collaps-menu.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [CategoriesCollapsMenuComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
  exports: [CategoriesCollapsMenuComponent]
})
export class MsCategoriesCollapsMenuModule { }
