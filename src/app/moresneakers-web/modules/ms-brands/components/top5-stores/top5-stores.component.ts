import { Component, Input, OnInit } from '@angular/core';
//
import { BrandsService } from '../../services/brands.service';

@Component({
  selector: 'ms-top5-stores',
  templateUrl: './top5-stores.component.html',
  styleUrls: ['./top5-stores.component.scss']
})
export class Top5StoresComponent implements OnInit {
  public name: '';

  @Input() brandId: string;

  @Input() brands: Array<any>;

  @Input() shops: Array<any>;

  shopsSellingThisBrand: Array<any> = [];

  shopsSellingThisBrandShowOnTop5: Array<any> = [];

  shopsSellingThisBrandToShow: Array<any> = [];

  shopsIdSellingThisBrand: Array<any>;

  showAll = false;

  constructor(public brandsService: BrandsService) {
  }

  ngOnInit() {
    this.brandsService.getBrandLinkedShops(this.brandId).subscribe(response => {
      this.shopsIdSellingThisBrand = response.data;

      this.shopsSellingThisBrand = [];
      this.shopsSellingThisBrandShowOnTop5 = [];
      this.shopsIdSellingThisBrand.forEach(shopItem => {
        let shop = this.shops.find(shop => {
            return shop.id === shopItem.shopId;
        });
        if (shop) {
          if (shopItem.displayOnBrands) {
            this.shopsSellingThisBrandShowOnTop5.push({
              id: shop.id,
              image: shop.mainImage,
              link: shop.trackingListBaseUrl ? shop.trackingListBaseUrl : '#',
              name: shop.name,
            });
          }

          this.shopsSellingThisBrand.push({
            id: shop.id,
            image: shop.mainImage,
            link: shop.trackingListBaseUrl ? shop.trackingListBaseUrl : '#',
            name: shop.name,
          });

        }

      });

      this.shopsSellingThisBrandShowOnTop5 = this.shopsSellingThisBrandShowOnTop5.slice(0, 5);

      this.name = this.brands.find(item => {
        return item.id === this.brandId;
      }).name;

      this.shopsSellingThisBrandToShow = this.shopsSellingThisBrandShowOnTop5;
    });
  }

  showAllStores(flag: boolean) {
    this.showAll = flag;
    if (flag) {
      this.shopsSellingThisBrandToShow = this.shopsSellingThisBrand;
    } else {
      this.shopsSellingThisBrandToShow = this.shopsSellingThisBrandShowOnTop5;
    }
  }

  findStoresSellingThisBrand(brandId: string) {

    this.brandsService.getBrandLinkedShops(brandId).subscribe(response => {
      this.shopsIdSellingThisBrand = response.data;

      this.shopsSellingThisBrand = [];
      this.shopsIdSellingThisBrand.forEach(shopItem => {
        let shop = this.shops.find(shop => {
            return shop.id === shopItem.shopId;
        });
        if (shop) {
          if (shopItem.displayOnBrands) {
            this.shopsSellingThisBrandShowOnTop5.push({
              id: shop.id,
              image: shop.mainImage,
              link: shop.trackingListBaseUrl ? shop.trackingListBaseUrl : '#',
              name: shop.name,
            });
          }

          this.shopsSellingThisBrand.push({
            id: shop.id,
            image: shop.mainImage,
            link: shop.trackingListBaseUrl ? shop.trackingListBaseUrl : '#',
            name: shop.name,
          });

        }

      });

      this.shopsSellingThisBrandShowOnTop5 = this.shopsSellingThisBrandShowOnTop5.slice(0, 5);

      this.name = this.brands.find(item => {
        return item.id === this.brandId;
      }).name;

      this.shopsSellingThisBrandToShow = this.shopsSellingThisBrandShowOnTop5;

    });
  }

}
