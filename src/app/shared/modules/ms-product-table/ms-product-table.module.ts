import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { BlogsTableComponent } from './blogs-table/blogs-table.component';
import { MsProductTableComponent } from './ms-product-table.component';
import { ReleasesTableComponent } from './releases-table/releases-table.component';
import { ShopsTableComponent } from './shops-table/shops-table.component';

import { SharedPipesModule } from '../..';

import { NgSelectModule } from '@ng-select/ng-select';
import { ListViewModule } from '../list-view/list-view.module';
import { ShopsTableParentComponent } from './shops-table-parent/shops-table-parent.component';
import {CollectionShopsTableComponent} from './collection-shops-table/collection-shops-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedPipesModule,
    NgSelectModule,
    ListViewModule
  ],
  declarations: [
    BlogsTableComponent,
    MsProductTableComponent,
    ReleasesTableComponent,
    ShopsTableComponent,
    ShopsTableParentComponent,
    CollectionShopsTableComponent
  ],
  exports: [
    BlogsTableComponent,
    MsProductTableComponent,
    ReleasesTableComponent,
    ShopsTableComponent,
    ShopsTableParentComponent,
    CollectionShopsTableComponent
  ]
})
export class MsProductTableModule {
}
