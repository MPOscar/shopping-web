import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReleaseCalendarComponent } from './components/release-calendar/release-calendar.component';

import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { ReleasesResolveService } from '../ms-releases/services/releases-resolve.service';
import { ShopsResolveService } from '../ms-shops/services/shops-resolve.service';
import { StylesResolveService } from '../ms-style/services/styles-resolve.service';
import { BrandsResolveService } from '../ms-brands/services/brands-resolve.service';
import { CategoriesResolveService } from '../ms-categories/services/categories-resolve.service';


const routes: Routes = [
    {
        path: '', 
        component: ReleaseCalendarComponent,
        resolve: {
            //config: ConfigResolveService,
            releases: ReleasesResolveService,
            shops: ShopsResolveService,
            styles: StylesResolveService,
            brands: BrandsResolveService,   
            categories: CategoriesResolveService,        
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReleaseCalendarRoutingModule {
}
