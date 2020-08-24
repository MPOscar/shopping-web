import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsNewCollapsMenuComponent } from './whats-new-collaps-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WhatsNewCollapsMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [WhatsNewCollapsMenuComponent]
})
export class MsWhatsNewCollapsMenuModule { }
