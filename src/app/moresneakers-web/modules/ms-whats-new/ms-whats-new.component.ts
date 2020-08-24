import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { MsProductTableComponent } from '../../../shared/modules/ms-product-table/ms-product-table.component';
//
import { BlogsService } from '../ms-blogs/services/blogs.service';
import { BrandsService } from '../ms-brands/services/brands.service';
import { Brand } from '../ms-brands/models/brand';
import { Category } from '../ms-categories/models/category';
import { Deal } from '../ms-deals/models/deal';
import { CollectionsService } from '../ms-collections/services/collections.service';
import { Release } from '../ms-releases/models/releases';
import { ReleasesService } from '../ms-releases/services/releases.service';
import { Offer } from '../ms-offers/models/offer';
import { OffersService } from '../ms-offers/services/offers.service';
import { Shop } from '../ms-shops/models/shops';
import { ShopsService } from '../ms-shops/services/shops.service';
import { Style } from '../ms-style/models/style';
//
import { Sliders, Header } from '../ms-layout/models/layout';
import { LayoutService } from '../ms-layout/services/layout.service';
import { Subscription } from 'rxjs';
import {MsSeoService} from '../../../shared/services/ms-seo.service';

@Component({
  selector: 'ms-whats-new',
  templateUrl: './ms-whats-new.component.html',
  styleUrls: ['./ms-whats-new.component.scss']
})
export class MsWhatsNewComponent implements OnInit, OnDestroy {

  @ViewChild(MsProductTableComponent) productTableComponent: MsProductTableComponent;

  AllOffers: Array<Offer>;

  brands: Array<Brand>;

  categories: Array<Category>;

  data: any;

  deals: Array<Deal>;

  count = 0;

  offers: Array<Offer>;

  releases: Array<Release>;

  shops: Array<Shop>;

  styles: Array<Style>;

  filters: any;

  showFilter = true;

  title: '';

  description: '';

  imgUrl: '';

  header: Header;

  slidersData: Sliders;

  slideDisplay = '';

  headerDisplay = '';

  hottestDisplay = '';

  displayHeadingOnPage = true;

  displayHeadertOnPage = false;

  displaySlidersOnPage = false;

  displayHottestOnPage = false;

  status: string;

  subscriptions: Subscription[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public offersService: OffersService,
    public layoutService: LayoutService,
    public releasesService: ReleasesService,
    public router: Router,
    public shopsService: ShopsService,
    private msSeoService: MsSeoService
  ) {
  }

  ngOnInit() {
    this.brands = this.activatedRoute.snapshot.data.brands;
    this.deals = this.activatedRoute.snapshot.data.deals;
    this.deals = this.deals.filter(deal => !deal.status || deal.status !== 'Expired');
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.AllOffers = this.activatedRoute.snapshot.data.offers;
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.status = this.activatedRoute.snapshot.data.status;

    this.filters = this.status ? { status: [this.status] } : {};

    this.setDefaultData(this.filters);

    const sub2 = this.layoutService.getLayout('whats_new', 'heading')
      .subscribe(response => {
        this.displayHeadingOnPage = response.data.displayOnPage;
        this.title = response.data.title;
        this.description = response.data.description;
        this.imgUrl = response.data.imgUrl || 'assets/images/whats-new/banner.svg';
        this.msSeoService.addMetadata(response.data.keywords);
      });

    const sub3 = this.router.events.subscribe(path => {
      if (this.activatedRoute.snapshot.data.status !== this.status) {
        this.status = this.activatedRoute.snapshot.data.status;
        this.filters = this.status ? { status: [this.status] } : {};

        this.showFilter = false;
        this.setDefaultData(this.filters);

        this.offersService.posOffersSearch(this.data).subscribe(response => {
          this.offers = response.data;
          this.count = response.dataCount;
          this.showFilter = true;
          this.productTableComponent.redrawOffers(this.offers);
        });

      }

    });

    const sub4 = this.layoutService.getHeader('whats_new')
      .subscribe(response => {
        this.header = response.data;
        this.headerDisplay = this.header.display;
        this.displayHeadertOnPage = this.header.displayOnPage;
      });

    const sub5 = this.layoutService.getSliders('whats_new')
      .subscribe(response => {
        this.slidersData = response.data;
        this.slideDisplay = this.slidersData.display;
        this.displaySlidersOnPage = this.slidersData.displayOnPage;
      });

    const sub6 = this.layoutService.getHottest('whats_new')
      .subscribe(response => {
        this.hottestDisplay = response.data.display;
        this.displayHottestOnPage = response.data.displayOnPage;
      });

    this.subscriptions.push(sub2, sub3, sub4, sub5, sub6);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  filter(filters: any) {
    this.setDefaultData(filters);
    const sub = this.offersService.postWhatsNewOffers(this.data)
      .subscribe(response => {
        this.offers = response.data;
        this.productTableComponent.redrawOffers(response.data);
      });

    this.subscriptions.push(sub);
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
      const sub = this.offersService.postWhatsNewOffers(this.data)
        .subscribe(response => {
          this.offers = response.data;
          this.productTableComponent.redrawOffers(response.data);
        });
      this.subscriptions.push(sub);
    }

  }

  setDefaultData(filters) {
    const oldSorting = this.data ? this.data.ordering : '-updatedAt';
    this.data = {
      'displayWhatsNew': 1,
      'active': 1,
      'filter': filters,
      'ordering': '-updatedAt'
    };
    if (oldSorting) {
      this.data.ordering = oldSorting;
    }
  }

}
