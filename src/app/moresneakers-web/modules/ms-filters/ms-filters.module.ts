import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
//

import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

//
import { FilterFormComponent } from './components/filters-form/filters-form.component';
import { TreeChecklistExampleComponent } from './components/styles-parent/styles-parent.component';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MsBreadcrumbModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatTreeModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
    MatRadioModule,
  ],
  declarations: [
    FilterFormComponent,
    TreeChecklistExampleComponent
  ],
  exports: [
    FilterFormComponent,
    TreeChecklistExampleComponent
  ]
})
export class MsFiltersModule { }
