import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { BlogsComponent } from './components/blogs/blogs.component';
import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { BrandsResolveService } from '../ms-brands/services/brands-resolve.service';
import { IdResolveService } from '../../../routing/services/id-resolve.service';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { ReleasesResolveService } from '../ms-releases/services/releases-resolve.service';
import {BlogNotFoundComponent} from './components/blog-not-found/blog-not-found.component';
import {BlogResolveService} from './services/blog-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: BlogsComponent,
    resolve: {
      config: ConfigResolveService,
      releases: ReleasesResolveService,
    }
  },
  {
    path: 'view/:id',
    component: BlogPostComponent,
    resolve: {
      blogId: IdResolveService,
      config: ConfigResolveService
    }
  },
  {
    path: ':slug',
    component: BlogPostComponent,
    resolve: {
      slug: BlogResolveService,
      blogId: IdResolveService,
      config: ConfigResolveService
    }
  },
  {
    path: '**',
    component: BlogNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsBlogsRoutingModule {
}
