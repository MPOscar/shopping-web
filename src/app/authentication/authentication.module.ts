import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
//
//import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
//
/*import {
  AppHeaderModule,
  AskBeforeRefreshModule,
  CapsLockModule,
  CustomSnackbarModule,
  ErrorMessagesModule,
  InputFocusModule,
  SmsImageModule,
  SpinnerIndicator200Module,
} from '@c/ui';*/
//import { AskBeforeRefreshModule } from '../ui/modules/ask-before-refresh/ask-before-refresh.module';
import {  } from '../ui/modules/spinner-indicator-200/spinner-indicator-200.module';
//import { ErrorMessagesModule } from '../ui/modules/error-messages/error-messages.module';
import { ErrorHandlingModule } from '../error-handling/error-handling.module';
import { ConfigModule } from '../config/config.module';
import { HttpRequestIndicatorModule } from '../http-request-indicator/http-request-indicator.module';
//import { NgrxModule } from '../ngrx/ngrx.module';
/*import { NgxTranslateModule } from '@c/ngx-translate';
import { ValidationModule } from '@c/validation';*/
//

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //InputFocusModule,
    ReactiveFormsModule,    
    //ToastrModule,
    TranslateModule.forChild(),
    //AppHeaderModule,
    //AskBeforeRefreshModule,
    //CapsLockModule,
    //CustomSnackbarModule,
    ConfigModule,
    ErrorHandlingModule,
    //ErrorMessagesModule,
    //InputFocusModule,
    HttpRequestIndicatorModule,
    //NgrxModule,
    //NgxTranslateModule,
    //SmsImageModule,
    //SpinnerIndicator200Module,
    //ValidationModule
  ],
  declarations: [    
  ],
  exports: [    
  ]
})
export class AuthenticationModule { }
