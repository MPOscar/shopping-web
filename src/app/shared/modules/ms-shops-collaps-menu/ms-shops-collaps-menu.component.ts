import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsCollapsMenu } from '../ms-collaps-menu/ms-collaps-menu';
import { ShopsService } from '../../../moresneakers-web/modules/ms-shops/services/shops.service';
import { MsShopsCollapsMenuService } from './ms-shops-collaps-menu.service';

import { ShippingCountries, SHIPPINGCOUNTRIES } from '../../../moresneakers-web/modules/ms-shops/models/shippingCountries';
import { Shop } from 'src/app/moresneakers-web/modules/ms-shops/models/shops';


@Component({
  selector: 'ms-shops-collaps-menu',
  templateUrl: './ms-shops-collaps-menu.component.html',
  styleUrls: ['./ms-shops-collaps-menu.component.scss']
})
export class MsShopsCollapsMenuComponent implements OnInit, MsCollapsMenu {

  visible = false;

  allShopsToShow: Array<any> = [];

  shopsToShow: Array<any> = [];

  shops: Array<Shop> = [];

  showAllItems: boolean = false;

  shippingCountries: ShippingCountries[] = SHIPPINGCOUNTRIES;

  constructor(public activatedRoute: ActivatedRoute,
    public shopsService: ShopsService,
    public collapseService: MsShopsCollapsMenuService,
    public router: Router) {
  }

  ngOnInit() {

    this.shopsService.getAllShops().subscribe(response => {
      this.shops = response;

      this.shops.forEach(shop => {
        this.allShopsToShow.push({
          id: shop.id,
          name: shop.name,
          link: '#'
        });
      });

    });

    this.collapseService.isVisible().subscribe(
      value => {
        this.visible = value;
      }
    );
  }

  hideMenu() {
    this.collapseService.hide();
  }

  seeAllItem(flag: boolean) {
    this.showAllItems = flag;
  }

  showBrandPage(shopId: string) {
    this.router.navigate(['/shops'], { queryParams: { 'shopId': shopId } });
  }

  getRouterName(name) {
    return name.toLowerCase().replace(/ /g, '-');
  }
}

