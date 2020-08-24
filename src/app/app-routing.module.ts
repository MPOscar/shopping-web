import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
//
import { ConfigResolveService } from './config/services/config-resolve.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
        resolve: {
            config: ConfigResolveService
        }
    },
    {
        path: '',
        loadChildren: './moresneakers-web/moresneakers-web.module#MoresneakersWebModule',
        resolve: {
            config: ConfigResolveService
        }
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'signup',
        loadChildren: './signup/signup.module#SignupModule'
    },
    {
        path: 'error',
        loadChildren: './server-error/server-error.module#ServerErrorModule'
    },
    {
        path: 'access-denied',
        loadChildren: './access-denied/access-denied.module#AccessDeniedModule'
    },
    {
        path: 'not-found',
        loadChildren: './not-found/not-found.module#NotFoundModule'
    },
   /* {
        path: '**',
        redirectTo: 'not-found'
    }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
