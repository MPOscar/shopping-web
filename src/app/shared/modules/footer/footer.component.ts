import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { ContactDetailService } from '../../../moresneakers-web/modules/ms-contact/services/contact-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ms-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() showPrivacyPolicyEventEmiter = new EventEmitter<boolean>();
  @Output() showWhoWeAreEventEmiter = new EventEmitter<boolean>();
  @Output() showBecomeAPartnerEventEmiter = new EventEmitter<boolean>();

  socialInstagram: string;

  socialFacebook: string;

  socialTwitter: string;

  constructor(public contactDetailService: ContactDetailService,
              public route: Router) { }

  ngOnInit() {
    this.getContactDetails();
  }

  getContactDetails() {
    this.contactDetailService.getContactDetails('config_social_instagram').subscribe(response => {
      this.socialInstagram = response.data.value;
    });

    this.contactDetailService.getContactDetails('config_social_facebook').subscribe(response => {
      this.socialFacebook = response.data.value;
    });

    this.contactDetailService.getContactDetails('config_social_twitter').subscribe(response => {
      this.socialTwitter = response.data.value;
    });
  }

  showPrivacyPolicy() {
    this.route.navigate(['privacy-policy']);
  }

  showWhoWeAre() {
    this.route.navigate(['who-are-we']);
  }

  showBecomeAPartner() {
    this.route.navigate(['become-partner']);
  }
}
