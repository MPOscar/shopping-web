import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UiModule } from './ui/ui.module';
import { ConfigModule } from './config/config.module';
import { ErrorHandlingModule } from './error-handling/error-handling.module';
import { HttpRequestIndicatorModule } from './http-request-indicator/http-request-indicator.module';

import { LoadingComponent } from './http-request-indicator/components/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';
//
import { GoogleAnalyticsService } from "./google-analythics/services/google-analytics.service";
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { NgbModule, NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { CustomSnackbarComponent } from './error-handling/modules/custom-snackbar/components/custom-snackbar/custom-snackbar.component';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        NgbModule,
        NgbCarouselModule,
        NgbAlertModule,
        NgxGalleryModule,
        OverlayModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        ConfigModule,
        ErrorHandlingModule,
        HttpRequestIndicatorModule,
        UiModule,
        FormsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        AuthGuard,
        GoogleAnalyticsService
    ],
    entryComponents: [
        LoadingComponent,
        CustomSnackbarComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
