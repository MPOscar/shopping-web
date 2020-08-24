import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { MsSliderModule } from '../../../shared/modules/ms-slider/ms-slider.module';
import { MsHeaderModule } from '../../../shared/modules/ms-header/ms-header.module';
import { MsHottestReleasesModule } from '../../../shared/modules/ms-hottest-releases/ms-hottest-releases.module';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
//
import { ContactComponent } from './contact.component';
import { MsBannerModule } from '../../../shared/modules/ms-banner/ms-banner.module';
import { MsBreadcrumbModule } from '../../../shared/modules/ms-breadcrumb/ms-breadcrumb.module';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MsBannerModule,
    MsBreadcrumbModule,
    MsSliderModule,
    MsHeaderModule,
    MsHottestReleasesModule
  ],
  exports: [ContactComponent],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Lfwwb0UAAAAAPpI2zRyBdDVXcHBo00Vdu4pnOKv' } as RecaptchaSettings,
    },
  ],
})
export class MsContactModule { }
