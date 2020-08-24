import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//
import { TranslateModule } from '@ngx-translate/core';
//import { EditorModule } from 'primeng/editor';
//
//import { ImageCardModule } from '../../../ui/modules/image-card/image-card.module';
//import { AskBeforeRefreshModule } from '../../../ui/modules/ask-before-refresh/ask-before-refresh.module';
//
import { MsLayoutRoutingModule } from './ms-layout-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MsLayoutRoutingModule,
    //AskBeforeRefreshModule,
    //ImageCardModule,
    //EditorModule
  ],
  declarations: [   
  ],
  exports: [
  ],
  entryComponents: [    
  ]
})
export class MsLayoutModule { }
