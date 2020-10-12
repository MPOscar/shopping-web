import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
//
import { Shop } from '../../models/shops';
import { Category } from '../../../ms-categories/models/category';
import { Brand } from '../../../ms-brands/models/brand';
import { Style } from '../../../ms-style/models/style';
import { Offer } from '../../../ms-offers/models/offer';
import { Release } from '../../../ms-releases/models/releases';
import { LayoutService } from '../../../ms-layout/services/layout.service';
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { OffersService } from '../../../ms-offers/services/offers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopsService } from '../../services/shops.service';
import { ShopsImgesService } from '../../services/shops-images.service';
import { MsProductTableComponent } from '../../../../../shared/modules/ms-product-table/ms-product-table.component';
import { ErrorHandlingService } from '../../../../../error-handling/services/error-handling.service';
import {Slide} from '../../../ms-layout/models/layout';

const errorKey = 'Error';

@Component({
  selector: 'ms-single-shop-page',
  templateUrl: './single-shop-page.component.html',
  styleUrls: ['./single-shop-page.component.scss']
})
export class SingleShopPageComponent implements OnInit {

  @ViewChild(MsProductTableComponent) productTableComponent: MsProductTableComponent;

  data: any;

  shop: Shop;

  brands: Array<Brand>;

  categories: Array<Category>;

  count = 0;

  offers: Array<Offer>;

  releases: Array<Release>;

  shops: Array<Shop>;

  styles: Array<Style>;

  filters: any;

  showFilter = true;

  showPageDetails = false;

  showImages = false;

  shopId: string;

  shopName = '';

  sliders: Slide[] = [];

  constructor(public activatedRoute: ActivatedRoute,
    public errorHandlingService: ErrorHandlingService,
    public offersService: OffersService,
    public layoutService: LayoutService,
    public releasesService: ReleasesService,
    public router: Router,
    public shopsService: ShopsService,
    public shopsImgesService: ShopsImgesService) {

  }

  ngOnInit() {
    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.filters = this.activatedRoute.snapshot.queryParams.filters;

    if (this.activatedRoute.snapshot.data.shop) {
      this.shop = this.activatedRoute.snapshot.data.shop;
      this.shopId = this.shop.id;
      this.shopName = this.shop.name;
      this.sliders.push({
        id: 'abf5rt',
        entityId: 'a',
        entityType: 'b',
        type: 'wewe',
        imgUrl: this.shop.headerImage,
        description: this.shop.name
      });
      this.sliders.push({
        id: 'abf5rt',
        entityId: 'a',
        entityType: 'b',
        type: 'wewe',
        imgUrl: this.shop.mainImage,
        description: this.shop.name
      });
    } else {
      this.shopId = this.activatedRoute.snapshot.data.shopId;
      this.shopsService.getShop(this.shopId).subscribe(response => {
        this.shop = response.data;
        this.shopName = this.shop.name;
        this.sliders.push({
          id: 'abf5rt',
          entityId: 'a',
          entityType: 'b',
          type: 'wewe',
          imgUrl: this.shop.headerImage,
          description: this.shop.name
        });
        this.sliders.push({
          id: 'abf5rt',
          entityId: 'a',
          entityType: 'b',
          type: 'wewe',
          imgUrl: this.shop.mainImage,
          description: this.shop.name
        });
      });
    }

    this.showPageDetails = true;
    this.scrollTop();

    /*this.shopsImgesService.getShopAllImages(this.shopId).subscribe(response => {
      let images: Array<String> = [];
      response.data.forEach(element => {
        images = [...images, element.imgUrl];
      });
      this.shop.images = images;
      this.showImages = true;
    });*/

    if (!this.shop.isParent && this.shop.type === 'virtual') {
      this.data = {
        'ordering': '-updatedAt',
        'shopId': this.shopId
      };

      this.offersService.posOffersSearch(this.data).subscribe(response => {
        this.offers = response.data;
        this.count = response.dataCount;
        this.productTableComponent.redrawOffers(this.offers);
        this.scrollTop();
      });

    }

  }

  scrollTop() {
    let delay_observable = of('').pipe(delay(500));
    delay_observable.subscribe(delay => {
      window.scroll(0, 0);
    });
    delay_observable = of('').pipe(delay(1000));
    delay_observable.subscribe(delay => {
      window.scroll(0, 0);
    });
    delay_observable = of('').pipe(delay(1500));
    delay_observable.subscribe(delay => {
      window.scroll(0, 0);
    });
    delay_observable = of('').pipe(delay(2000));
    delay_observable.subscribe(delay => {
      window.scroll(0, 0);
    });
  }

  sortByPrice(id: number) {
    if (id) {
      this.data = {
      };
      if (id === 1) {
        this.data['ordering'] = '-priceEUR';
      } else if (id === 2) {
        this.data['ordering'] = 'priceEUR';
      } else if (id === 3) {
        this.data['ordering'] = ['-hot', '-updatedAt'];
      } else if (id === 4) {
        this.data['ordering'] = '-updatedAt';
      }
      this.data['shopId'] = this.shopId;
      this.offersService.postWhatsNewOffers(this.data).subscribe(response => {
        this.offers = response.data;
        this.productTableComponent.redrawOffers(response.data);
      });
    }
  }

  filter(filters: any) {
    this.data = {
      filter: {
        'upcoming': 0,
      }
    };
    delete filters.styleId;
    delete filters.brandId;
    delete filters.category;
    this.data = {
      'filter': filters,
      'shopId': this.shopId
    };

    this.offersService.posOffersSearch(this.data).subscribe(response => {
      this.offers = response.data;
      this.productTableComponent.redrawOffers(response.data);
    });
  }

}
