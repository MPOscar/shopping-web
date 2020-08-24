import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgSelectModule} from '@ng-select/ng-select';
import {SharedPipesModule} from '../../../shared/pipes/shared-pipes.module';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import {CategoriesComponent} from './components/categories/categories.component';
import {MsBreadcrumbModule} from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import {MsOurPartnersModule} from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import {MsFiltersModule} from '../ms-filters/ms-filters.module';
import {MsBannerModule} from '../../../shared/modules/ms-banner/ms-banner.module';
import {MsProductTableModule} from '../../../shared/modules/ms-product-table/ms-product-table.module';
import {MsHottestReleaseSliderModule} from '../../../shared/modules/ms-hottest-release-slider/ms-hottest-release-slider.module';
import {MsCategoriesRoutingModule} from './ms-categories-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    MsBreadcrumbModule,
    MsHottestReleaseSliderModule,
    MsProductTableModule,
    MsOurPartnersModule,
    MsFiltersModule,
    MsBannerModule,
    SharedPipesModule,
    MsSliderModule,
    MsHeaderModule,
    MsHottestReleasesModule,
    MsCategoriesRoutingModule
  ],
  declarations: [
    CategoriesComponent,
  ],
  exports: [
    CategoriesComponent,
  ]
})
export class MsCategoriesModule {
}
