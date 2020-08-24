import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//
import { ConfigResolveService } from '../../../config/services/config-resolve.service';
import { WhoAreWeComponent } from './components/who-are-we/who-are-we.component';
 
const routes: Routes = [
  {
    path: '',
    component: WhoAreWeComponent,
    resolve: {
      config: ConfigResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MsWhoAreWeRoutingModule {
}
