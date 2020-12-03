import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { ReleasesTableComponent } from '../../../../../shared/modules/ms-product-table/releases-table/releases-table.component';
import {
  MsHottestReleaseSliderComponent
} from '../../../../../shared/modules/ms-hottest-release-slider/ms-hottest-release-slider.component';
import { BrandsService } from '../../services/brands.service';
import { Brand } from '../../models/brand';
import { Category } from '../../../ms-categories/models/category';
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { OffersService } from '../../../ms-offers/services/offers.service';
import { Shop } from '../../../ms-shops/models/shops';
import { ShopsService } from '../../../ms-shops/services/shops.service';
import { Style } from '../../../ms-style/models/style';
import { LayoutService } from '../../../ms-layout/services/layout.service';
import { Sliders, Header } from '../../../ms-layout/models/layout';
import { Top5StoresComponent } from '../top5-stores/top5-stores.component';
import {MsSeoService} from '../../../../../shared/services/ms-seo.service';

@Component({
  selector: 'brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  @ViewChild(ReleasesTableComponent) releasesTableComponent: ReleasesTableComponent;

  @ViewChild(Top5StoresComponent) top5StoresComponent: Top5StoresComponent;

  @ViewChild(MsHottestReleaseSliderComponent) hottestReleaseSliderComponent: MsHottestReleaseSliderComponent;




  brandId: string;

  brands: Array<Brand>;

  categories: Array<Category>;

  data: any = {};

  description: string;

  displayHeadertOnPage: boolean = false;

  displaySlidersOnPage: boolean = false;

  displayHottestOnPage: boolean = false;

  filters: any;

  header: Header;

  headerDisplay: string = "";

  hottestDisplay: string = "";

  imgUrl = '';

  offers: Array<any>;

  releases: Array<any>;

  releaseName: string;

  shops: Array<Shop>;

  styles: Array<Style>;

  showAll: boolean = false;

  selectedBrand: Brand;

  shopsSellingThisBrand: Array<any> = [];

  shopsSellingThisBrandToShow: Array<any> = [];

  shopsIdSellingThisBrand: Array<any>;

  slidersData: Sliders;

  slideDisplay: string = "";

  title: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public brandsService: BrandsService,
    public offersService: OffersService,
    public layoutService: LayoutService,
    public releasesService: ReleasesService,
    public router: Router,
    public shopsService: ShopsService,
    private msSeoService: MsSeoService
  ) {

  }

  ngOnInit() {

    this.releaseName = this.activatedRoute.snapshot.queryParams.releaseName;

    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.offers = this.activatedRoute.snapshot.data.offers;
    this.brandId = this.getBrandIdFromRoute();

    this.hottestReleaseSliderComponent.reloadHottestSliderBrand(this.brandId);

    this.selectedBrand = this.brands.find(brand => {
      return brand.id === this.brandId;
    });

    this.layoutService.getLayout('brands', 'heading').subscribe(response => {
      this.title = response.data.title;
      this.description = response.data.description;
      this.msSeoService.addMetadata(response.data.keywords);
      this.imgUrl = response.data.imgUrl;
    });

    this.data = {
      'filter': {
        'brandId': this.brandId,
      },
      'upcoming': 0
    };

    this.filters = JSON.stringify({
      'brandId': [this.brandId]
    });

    this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      this.releasesTableComponent.redrawOffers(response.data, false);
    });

    this.router.events.subscribe(path => {
      if (this.brandId !== this.getBrandIdFromRoute()) {
        this.brandId = this.getBrandIdFromRoute();
        this.top5StoresComponent.findStoresSellingThisBrand(this.brandId);
        this.hottestReleaseSliderComponent.reloadHottestSliderBrand(this.brandId);

        this.selectedBrand = this.brands.find(brand => {
          return brand.id === this.brandId;
        });

        this.data = {
          'filter': {
            'brandId': this.brandId,
          },
          'upcoming': 0,
        };

        this.filters = JSON.stringify({
          'brandId': [this.brandId]
        });

        this.releasesService.postReleasesSearch(this.data).subscribe(response => {
          this.releasesTableComponent.redrawOffers(response.data, false);
        });
      }
    });

    this.layoutService.getHeader('brands').subscribe(response => {
      this.header = response.data;
      this.headerDisplay = this.header.display;
      this.displayHeadertOnPage = this.header.displayOnPage;
    });

    this.layoutService.getSliders('brands').subscribe(response => {
      this.slidersData = response.data;
      this.slideDisplay = this.slidersData.display;
      this.displaySlidersOnPage = this.slidersData.displayOnPage;
    });

    this.layoutService.getHottest('brands').subscribe(response => {
      this.hottestDisplay = response.data.display;
      this.displayHottestOnPage = response.data.displayOnPage;
    });

  }

  filter(filters: any) {
    delete filters.shopId;
    delete filters.category;
    Object.assign(this.data.filter, filters);
    if (this.data.filter && this.data.filter.brandId && this.data.filter.styleId) {
      delete this.data.filter.brandId;
    }

    this.releasesService.postReleasesCalendar(this.data).subscribe(response => {
      this.offers = response.data;
      this.releasesTableComponent.redrawOffers(response.data, false);
    });
  }

  sortByPrice(id: number) {
    if (this.data.filter && this.data.filter.hot) {
      delete this.data.filter.hot;
    }
    if (this.data.filter && this.data.hot) {
      delete this.data.hot;
    }
    Object.assign(this.data.filter, {
      'brandId': this.brandId,
      'upcoming': 0
    });
    if (this.data.filter && this.data.filter.brandId && this.data.filter.styleId) {
      delete this.data.filter.brandId;
    }
    if (id) {
      if (id === 1) {
        this.data['ordering'] = '-priceEUR';
      } else if (id === 2) {
        this.data['ordering'] = 'priceEUR';
      } else if (id === 3) {
        this.data['ordering'] = ['-hot', '-updatedAt'];
      } else if (id === 4) {
        this.data['ordering'] = '-updatedAt';
      } else if (id === 5) {
        this.data['ordering'] = '-releaseDate';
      } else if (id === 6) {
        this.data['ordering'] = '-createdAt';
      }

      this.releasesService.postReleasesCalendar(this.data).subscribe(response => {
        this.releases = response.data;
        this.releasesTableComponent.redrawOffers(response.data, false);
      });
    } else if (id === 0) {
      this.releasesService.postReleasesCalendar(this.data).subscribe(response => {
        this.releases = response.data;
        this.releasesTableComponent.redrawOffers(response.data, false);
      });
    }
  }

  getBrandIdFromRoute() {
    if (this.activatedRoute.snapshot.data.slug) {
      return this.activatedRoute.snapshot.data.slug.id;
    }
    return this.activatedRoute.snapshot.queryParams.brandId
  }

  showAllStores(flag: boolean) {
    this.showAll = flag;
    if (flag) {
      this.shopsSellingThisBrandToShow = this.shopsSellingThisBrand;
    } else {
      this.shopsSellingThisBrandToShow = this.shopsSellingThisBrand.slice(0, 5);
    }
  }

}
