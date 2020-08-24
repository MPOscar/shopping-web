import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoresneakersWebComponent } from './component/moresneakers-web/moresneakers-web.component';


import { TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { SharedPipesModule } from '../shared';

import { MoresneakersWebRoutingModule } from './modules/moresneakers-web-routing/moresneakers-web-routing.module';
import { MsCustomizedModule } from './modules/ms-customized/customized.module';
import { PageHeaderModule } from '../shared/modules';
import { FooterModule } from '../shared/modules/footer/footer.module';
import { ReleaseModule } from './modules/release/release.module';
import { MsReleasesModule } from './modules/ms-releases/ms-releases.module';
import { MsCategoriesModule } from './modules/ms-categories/ms-categories.module';
import { MsWhatsNewModule } from './modules/ms-whats-new/ms-whats-new.module';
import { MsSalesModule } from './modules/ms-sales/ms-sales.module';
import { MsSearchPageModule } from './modules/ms-search/search-page.module';
import { MsLayoutModule } from './modules/ms-layout/ms-layout.module';
import { MsShopsModule } from './modules/ms-shops/ms-shops.module';
import { MsContactModule } from './modules/ms-contact/ms-contact.module';
import {NotFoundModule} from '../not-found/not-found.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    MoresneakersWebRoutingModule,
    TranslateModule,
    PageHeaderModule,
    FooterModule,
    ReleaseModule,
    MsCategoriesModule,
    MsCustomizedModule,
    MsLayoutModule,
    MsReleasesModule,
    MsSalesModule,
    MsSearchPageModule,
    MsWhatsNewModule,
    MsShopsModule,
    MsContactModule,
    SharedPipesModule,
    NotFoundModule
  ],
  providers: [
    CookieService
  ],
  declarations: [
    // NavComponent,
    MoresneakersWebComponent,
    // TopnavComponent,
    // SidebarComponent,
  ]
})
export class MoresneakersWebModule {
}
