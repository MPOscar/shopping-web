import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsTextOverflowPipe } from './ms-text-overflow.pipe';
import { MsCleanHtmlPipe } from './ms-clean-html.pipe';
import {MsSafeHtmlPipe} from './safe-html.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [MsTextOverflowPipe, MsCleanHtmlPipe, MsSafeHtmlPipe],
  exports: [MsTextOverflowPipe, MsCleanHtmlPipe, MsSafeHtmlPipe]
})
export class SharedPipesModule { }
