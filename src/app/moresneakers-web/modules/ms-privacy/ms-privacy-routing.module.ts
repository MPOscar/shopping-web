import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { PrivacyComponent } from './components/privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyComponent,
    resolve: {
      config: ConfigResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsPrivacyRoutingModule {
}
