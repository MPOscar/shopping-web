import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../../ms-settings/services/settings.service';


@Component({
  selector: 'ms-who-are-we',
  templateUrl: './who-are-we.component.html',
  styleUrls: ['./who-are-we.component.scss']
})
export class WhoAreWeComponent implements OnInit {

  whoAreWe: any;

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
    this.settingsService.getWhoWeAre().subscribe(response => {
      this.whoAreWe = response.data.value;
    });
  }

}
