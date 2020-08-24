import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { IdResolveService } from '../../../routing/services/id-resolve.service';
import { BecomeAPartnerComponent } from './components/become-a-partner/become-a-partner.component';
 
const routes: Routes = [
  {
    path: '',
    component: BecomeAPartnerComponent,
    resolve: {
      config: ConfigResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsBecomeAPartnerRoutingModule {
}
