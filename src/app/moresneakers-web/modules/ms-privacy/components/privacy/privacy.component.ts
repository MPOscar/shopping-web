import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../../ms-settings/services/settings.service';


@Component({
  selector: 'ms-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  privacyPolicy: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public settingsService: SettingsService,
    public router: Router,
  ) {

  }

  ngOnInit() {
    this.getWhoAreWe();
  }

  getWhoAreWe() {
    this.settingsService.getPrivacyPolicy().subscribe(response => {
      this.privacyPolicy = response.data.value;
    });
  }

}
