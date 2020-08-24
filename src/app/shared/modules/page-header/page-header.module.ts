import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//
import {PageHeaderComponent} from './page-header.component';
import {NavigationComponent} from './navigation/navigation.component';
import {SearchComponent} from './search/search.component';

import {MsBrandsCollapsMenuModule} from '../ms-brands-collaps-menu/ms-brands-collaps-menu.module';
import {MsCategoriesCollapsMenuModule} from '../ms-categories-collaps-menu/ms-categories-collaps-menu.module';
import {MsShopsCollapsMenuModule} from '../ms-shops-collaps-menu/ms-shops-collaps-menu.module';
import {MsWhatsNewCollapsMenuModule} from '../ms-whats-new-collaps-menu/ms-whats-new-collaps-menu.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MsBrandsCollapsMenuModule,
    MsCategoriesCollapsMenuModule,
    MsShopsCollapsMenuModule,
    MsWhatsNewCollapsMenuModule
  ],
  declarations: [
    PageHeaderComponent,
    NavigationComponent,
    SearchComponent
  ],
  exports: [
    PageHeaderComponent,
    NavigationComponent,
    SearchComponent
  ]
})
export class PageHeaderModule {
}
