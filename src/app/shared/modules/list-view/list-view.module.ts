import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListViewComponent } from './categories-list-view/categories-list-view.component';
import { OffersListViewComponent } from './offers-list-view/offers-list-view.component';
import { RouterModule } from '@angular/router';
import { MsTextOverflowPipe } from '../../pipes/ms-text-overflow.pipe';
import { SharedPipesModule } from '../..';
import { ShopsListViewComponent } from './shops-list-view/shops-list-view.component';
import {CollectionShopsListViewComponent} from './collection-shops-list-view/collection-shops-list-view.component';

@NgModule({
  declarations: [
    CategoriesListViewComponent,
    OffersListViewComponent,
    ShopsListViewComponent,
    CollectionShopsListViewComponent
 ],
  imports: [
    CommonModule,
    RouterModule,
    SharedPipesModule
  ],
  exports: [
    CategoriesListViewComponent,
    OffersListViewComponent,
    ShopsListViewComponent,
    CollectionShopsListViewComponent
  ]
})
export class ListViewModule {
}
