import { Component, Input, OnInit } from '@angular/core';
import { Shop, WeekHours } from '../../models/shops';

@Component({
  selector: 'ms-single-shop-details',
  templateUrl: './single-shop-details.component.html',
  styleUrls: ['./single-shop-details.component.scss']
})
export class SingleShopDetailsComponent implements OnInit {

  @Input() shop: Shop;

  dayOfWeek: number;

  today: WeekHours = {
    openHour: '',
    closeHour: ''
  };

  constructor() { }

  ngOnInit() {
    this.dayOfWeek = new Date().getDay();

    this.dayOfWeek = this.dayOfWeek ? this.dayOfWeek : 7;
    this.today = this.shop.workingHours.find(
      (it) => it.dayOfWeek === this.dayOfWeek
    );
  }

}
