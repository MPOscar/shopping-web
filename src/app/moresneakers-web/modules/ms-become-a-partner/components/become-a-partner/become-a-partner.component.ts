import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../../ms-settings/services/settings.service';


@Component({
  selector: 'ms-become-a-partner',
  templateUrl: './become-a-partner.component.html',
  styleUrls: ['./become-a-partner.component.scss']
})
export class BecomeAPartnerComponent implements OnInit {

  becomeAPartner: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public settingsService: SettingsService,
    public router: Router,
  ) {

  }

  ngOnInit() {
    this.getBecomeAPartner();
  }

  getBecomeAPartner() {
    this.settingsService.getBecomeAPartner().subscribe(response => {
      this.becomeAPartner = response.data.value;
    });
  }

}
