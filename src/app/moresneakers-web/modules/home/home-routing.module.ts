import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { ReleasesResolveService } from '../ms-releases/services/releases-resolve.service';
import { DealsResolveService } from '../ms-deals/services/deals-resolve.service';
import { OffersResolveService } from '../ms-offers/services/offers-resolve.service';
import { ShopsResolveService } from '../ms-shops/services/shops-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            // config: ConfigResolveService,
            deals: DealsResolveService,
            offers: OffersResolveService,
            releases: ReleasesResolveService,
            shops: ShopsResolveService,
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
