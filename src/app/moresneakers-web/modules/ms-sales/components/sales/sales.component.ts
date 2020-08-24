import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { MsProductTableComponent } from '../../../../../shared/modules/ms-product-table/ms-product-table.component';
import { ReleasesOnSaleComponent } from '../releases-on-sale/releases-on-sale.component';
//
import { BlogsService } from '../../../ms-blogs/services/blogs.service';
import { DealsService } from '../../../ms-deals/services/deals.service';
import { Brand } from '../../../ms-brands/models/brand';
import { Category } from '../../../ms-categories/models/category';
import { CollectionsService } from '../../../ms-collections/services/collections.service';
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { OffersService } from '../../../ms-offers/services/offers.service';
import { Shop } from '../../../ms-shops/models/shops';
import { ShopsService } from '../../../ms-shops/services/shops.service';
import { Style } from '../../../ms-style/models/style';
import { LayoutService } from '../../../ms-layout/services/layout.service';
import { Sliders, Header } from '../../../ms-layout/models/layout';
import { Subscription } from 'rxjs';
import {MsSeoService} from '../../../../../shared/services/ms-seo.service';

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  @ViewChild(MsProductTableComponent) productTableComponent: MsProductTableComponent;

  @ViewChild(ReleasesOnSaleComponent) releasesOnSaleComponent: ReleasesOnSaleComponent;

  @Input() buttonText: string;

  brands: Array<Brand>;

  categories: Array<Category>;

  data: any;

  shops: Array<Shop>;

  styles: Array<Style>;

  offers: Array<any>;

  releases: Array<any>;

  title: string;

  description: string;

  imgUrl: string;

  dealsItems: Array<any> = [];

  relatedDeals: any = [];

  allDeals: any = [];

  count = 0;

  countDeals = 0;

  hotItems: Array<any> = [];

  relatedReleases: any = [];

  allRelatedReleases: number;

  header: Header;

  slidersData: Sliders;

  slideDisplay = '';

  headerDisplay = '';

  hottestDisplay = '';

  displayHeadingOnPage = true;

  displayHeadertOnPage = false;

  displaySlidersOnPage = false;

  displayHottestOnPage = false;

  subscriptions: Subscription[] = [];

  filters = {};

  constructor(
    public activatedRoute: ActivatedRoute,
    public dealsService: DealsService,
    public offersService: OffersService,
    public layoutService: LayoutService,
    public releasesService: ReleasesService,
    public shopsService: ShopsService,
    private msSeoService: MsSeoService
  ) { }

  ngOnInit() {
    if (this.buttonText == null || this.buttonText === '') {
      this.buttonText = 'WHERE TO BUY';
    }

    this.filters = {status: ['on_sale']};

    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.offers = this.activatedRoute.snapshot.data.offers;

    const subGetLayout = this.layoutService.getLayout('sales', 'heading').subscribe(response => {
      this.displayHeadingOnPage = response.data.displayOnPage;
      this.title = response.data.title;
      this.description = response.data.description;
      this.imgUrl = response.data.imgUrl || 'assets/images/whats-new/banner.svg';
      this.msSeoService.addMetadata(response.data.keywords);
    });

    const subGetHeader = this.layoutService.getHeader('sales').subscribe(response => {
      this.header = response.data;
      this.headerDisplay = this.header.display;
      this.displayHeadertOnPage = this.header.displayOnPage;
    });

    const subGetSliders = this.layoutService.getSliders('sales').subscribe(response => {
      this.slidersData = response.data;
      this.slideDisplay = this.slidersData.display;
      this.displaySlidersOnPage = this.slidersData.displayOnPage;
    });

    const subGetHottest = this.layoutService.getHottest('sales').subscribe(response => {
      this.hottestDisplay = response.data.display;
      this.displayHottestOnPage = response.data.displayOnPage;
    });

    this.setDefaultData({});

    const subPosOffersSearch = this.offersService.posOffersSearch(this.data).subscribe(response => {
      this.offers = response.data;
      this.productTableComponent.redrawOffers(response.data);
    });

    const subGetLatestDeal = this.dealsService.getLatestDeal().subscribe(response => {
      response.data.forEach(item => {
        if ( !item.status || item.status !== 'Expired') {
          const dealShop = this.shops.find(shop => {
            return shop.id === item.shopId;
          });
          this.relatedDeals.push({
            id: item.id,
            image: item.imgUrl,
            shopName: dealShop ? dealShop.name : '',
            url: item.bitlyUrl || item.trackedUrl || item.url,
            promoCode: item.promoCode
          });
        }

      });

      this.allDeals = this.relatedDeals.length;
      if (this.allDeals > 8) {
        this.dealsItems = this.relatedDeals.slice(0, 8);
      } else {
        this.dealsItems = this.relatedDeals.slice(0, this.allDeals);
      }

    });

    const subGgetAllOffersDisplayOnSale = this.offersService.getAllOffersDisplayOnSale().subscribe(response => {
      response.forEach(item => {

        const release = this.releases.find(release => {
          return item.releaseId === release.id;
        });

        const style = this.styles.find(styleItem => {
          return styleItem.id === release.styleId;
        });

        let brandLogo = '';
        if (style) {
          const brand = this.brands.find(brandItem => {
            return brandItem.id === style.brand;
          });
          brandLogo = brand.imgUrl;
        }

        const store = this.shops.find(shop => {
          return item.shopId === shop.id;
        });

        let link = '#';

        if (item.links) {
          if (item.links.length > 0) {
            link = item.links[0].bitlyUrl || item.links[0].trackedUrl || item.links[0].url;
          } else {
            if (store) {
              link = store.trackingListBaseUrl ? store.trackingListBaseUrl : '#';
            }
          }
        } else {
          if (store) {
            link = store.trackingListBaseUrl ? store.trackingListBaseUrl : '#';
          }
        }

        const price = item.priceEUR;
        const salePercentage = item.salePercentage;

        let priceAfterDiscount: number;

        if (!salePercentage || salePercentage === 0) {
          priceAfterDiscount = -1;
        } else {
          priceAfterDiscount = price - (salePercentage * price / 100);
        }

        this.relatedReleases.push({
          id: item.id,
          name: release.name,
          store: store ? store.name : '',
          styleCode: release.sku,
          status: item.status,
          hot: release.hot,
          image: release.mainImage,
          priceEUR: price,
          priceAfterDiscount: priceAfterDiscount,
          brandLogo: brandLogo,
          link: link,
        });
      });

      this.allRelatedReleases = this.relatedReleases.length;
      if (this.allRelatedReleases > 4) {
        this.hotItems = this.relatedReleases.slice(0, 4);
      } else {
        this.hotItems = this.relatedReleases.slice(0, this.allRelatedReleases);
      }

    });
    this.subscriptions.push(subGetLayout, subGetHeader, subGetSliders,
                            subGetHottest, subPosOffersSearch, subGetLatestDeal,
                            subGgetAllOffersDisplayOnSale);
  }

  filter(filters: any) {
    this.setDefaultData(filters);

    this.offersService.posOffersSearch(this.data).subscribe(response => {
      this.offers = response.data;
      this.productTableComponent.redrawOffers(response.data);
    });
  }

  onSlideDeals(slideData) {
    if (slideData.direction === 'left') {
      this.getDealsNext();
    } else {
      this.getDealsPrev();
    }

    // your JS here
  }

  getDealsNext() {
    if (this.allDeals > 8) {
      this.countDeals += 8;
      this.countDeals %= this.allDeals;
      this.dealsItems = [];
      for (let i = this.countDeals; i < this.countDeals + 8; i++) {
        this.dealsItems.push(this.relatedDeals[i % this.allDeals]);
      }
    }
  }

  getDealsPrev() {
    if (this.allDeals > 8) {
      this.countDeals = (this.countDeals - 8 + this.allDeals) % this.allDeals;
      this.dealsItems = [];
      for (let i = this.countDeals; i < this.countDeals + 8; i++) {
        this.dealsItems.push(this.relatedDeals[i % this.allDeals]);
      }
    }
  }

  onSlide(slideData) {
    if (slideData.direction === 'left') {
      this.getRelatedReleasesNext();
    } else {
      this.getRelatedReleasesPrev();
    }
  }

  getRelatedReleasesNext() {
    if (this.allRelatedReleases > 4) {
      this.count += 4;
      this.count %= this.allRelatedReleases;
      this.hotItems = [];
      for (let i = this.count; i < this.count + 4; i++) {
        this.hotItems.push(this.relatedReleases[i % this.allRelatedReleases]);
      }
    }
  }

  getRelatedReleasesPrev() {
    if (this.allRelatedReleases > 4) {
      this.count = this.count - 4 + this.allRelatedReleases;
      this.count %= this.allRelatedReleases;
      this.hotItems = [];
      for (let i = this.count; i < this.count + 4; i++) {
        this.hotItems.push(this.relatedReleases[i % this.allRelatedReleases]);
      }
    }
  }

  sortByPrice(id: number) {
    if (id) {
      if (id === 1) {
        this.data['ordering'] = '-priceEUR';
      } else if (id === 2) {
        this.data['ordering'] = 'priceEUR';
      } else if (id === 3) {
        this.data['ordering'] = ['-hot', '-updatedAt'];
      } else if (id === 4) {
        this.data['ordering'] = '-updatedAt';
      }
      this.offersService.posOffersSearch(this.data).subscribe(response => {
        this.offers = response.data;
        this.productTableComponent.redrawOffers(response.data);
      });
    }
  }

  setDefaultData(filters) {
    const oldSorting = this.data ? this.data.ordering : '-updatedAt';
    this.data = {
      'status': 'on_sale',
      'active': 1,
      'filter': filters,
      'ordering': '-updatedAt'
    };
    if (oldSorting) {
      this.data.ordering = oldSorting;
    }
  }
}
