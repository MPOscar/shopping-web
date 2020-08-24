import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//
import { MsHottestReleaseSliderModule } from '../../../shared/modules/ms-hottest-release-slider/ms-hottest-release-slider.module';
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
//
import { MsBlogsRoutingModule } from './ms-blogs-routing.module';
import { BlogsComponent } from './components/blogs/blogs.component';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';
import { MsOurPartnersModule } from '../../../shared/modules/ms-our-partners/ms-our-partners.module';
import { MsFiltersModule } from '../ms-filters/ms-filters.module';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsProductTableModule } from '../../../shared/modules/ms-product-table/ms-product-table.module';
import { MsAdvertisementModule } from '../../../shared/modules/ms-advertisement/ms-advertisement.module';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import {BlogNotFoundComponent} from './components/blog-not-found/blog-not-found.component';
import {SharedPipesModule} from '../../../shared';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    MsAdvertisementModule,
    MsBannerModule,
    MsBlogsRoutingModule,
    MsBreadcrumbModule,
    MsFiltersModule,
    MsHottestReleaseSliderModule,
    MsOurPartnersModule,
    MsProductTableModule,
    MsSliderModule,
    MsHeaderModule,
    MsHottestReleasesModule,
    SharedPipesModule
  ],
  declarations: [
    BlogsComponent,
    BlogPostComponent,
    BlogNotFoundComponent
  ],
  exports: [
    BlogsComponent
  ]
})
export class MsBlogsModule { }
