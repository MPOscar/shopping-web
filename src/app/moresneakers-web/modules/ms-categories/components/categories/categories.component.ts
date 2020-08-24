import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { ReleasesTableComponent } from '../../../../../shared/modules/ms-product-table/releases-table/releases-table.component';
import { MsHottestReleaseSliderComponent } from '../../../../../shared/modules/ms-hottest-release-slider/ms-hottest-release-slider.component';
//
import { BlogsService } from '../../../ms-blogs/services/blogs.service';
import { BrandsService } from '../../../ms-brands/services/brands.service';
import { Brand } from '../../../ms-brands/models/brand';
import { Category } from '../../models/category';
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
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  @ViewChild(ReleasesTableComponent) releasesTableComponent: ReleasesTableComponent;

  @ViewChild(MsHottestReleaseSliderComponent) hottestReleaseSliderComponent: MsHottestReleaseSliderComponent;

  brands: Array<Brand>;

  categories: Array<Category>;

  category: Category;

  categoryId: string;

  categoryName: string;

  data: any;

  filters: any;

  shops: Array<Shop>;

  styles: Array<Style>;

  offers: Array<any>;

  releases: Array<any>;

  title: string;

  description: string;

  imgUrl: string;

  header: Header;

  slidersData: Sliders;

  slideDisplay = '';

  headerDisplay = '';

  hottestDisplay = '';

  displayHeadertOnPage = false;

  displaySlidersOnPage = false;

  displayHottestOnPage = false;

  displayHeadingOnPage = true;

  showFilter = true;

  subscriptions: Subscription[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public offersService: OffersService,
    public layoutService: LayoutService,
    public releasesService: ReleasesService,
    public shopsService: ShopsService,
    public router: Router,
    public msSeoService: MsSeoService
  ) { }

  ngOnInit() {
    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.offers = this.activatedRoute.snapshot.data.offers;
    this.categoryId = this.getCategoryIdFromRoute();

    const subGetLayout = this.layoutService.getLayout('categories', 'heading').subscribe(response => {
        this.displayHeadingOnPage = response.data.displayOnPage;
        this.title = response.data.title;
        this.description = response.data.description;
        this.imgUrl = response.data.imgUrl || 'assets/images/whats-new/banner.svg';
        this.msSeoService.addMetadata(response.data.keywords);
    });

    this.data = {
      'filter': {},
      // 'upcoming': 0,
    };

    if (this.categoryId) {
      this.category = this.categories.find(item => {
        return item.id === this.categoryId;
      });
      this.categoryName = this.category.name;

      this.data = {
        'filter': {
          'categoryId': this.categoryId,
        },
        // 'upcoming': 0,
      };
    }

    this.filters = JSON.stringify({
      'categoryId': [this.categoryId]
    });

    const subPostReleasesSearch1 = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      this.offers = response.data;
      this.releasesTableComponent.redrawOffers(response.data);
    });

    const subEvent = this.router.events.subscribe(path => {
      if (this.categoryId !== this.getCategoryIdFromRoute()) {
        this.categoryId = this.getCategoryIdFromRoute();
        this.showFilter = false;
        this.category = this.categories.find(item => {
          return item.id === this.categoryId;
        });

        this.categoryName = this.category.name;

        this.data = {
          'filter': {
            'categoryId': this.categoryId,
          },
          // 'upcoming': 0,
        };

        this.filters = JSON.stringify({
          'categoryId': [this.categoryId]
        });

        const subPostReleasesSearch2 = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
          this.offers = response.data;
          this.showFilter = true;
          this.releasesTableComponent.redrawOffers(response.data);
          this.hottestReleaseSliderComponent.reloadHottestSliderCategory(this.categoryId);
        });
        this.subscriptions.push(subPostReleasesSearch2);
      }
    });

    const subGetHeader = this.layoutService.getHeader('categories').subscribe(response => {
      this.header = response.data;
      this.headerDisplay = this.header.display;
      this.displayHeadertOnPage = this.header.displayOnPage;
    });

    const subGetSliders = this.layoutService.getSliders('categories').subscribe(response => {
      this.slidersData = response.data;
      this.slideDisplay = this.slidersData.display;
      this.displaySlidersOnPage = this.slidersData.displayOnPage;
    });

    const subGetHottest = this.layoutService.getHottest('categories').subscribe(response => {
      this.hottestDisplay = response.data.display;
      this.displayHottestOnPage = response.data.displayOnPage;
    });

    this.subscriptions.push(subGetLayout, subPostReleasesSearch1, subEvent, subGetHeader, subGetSliders, subGetHottest);
  }

  getCategoryIdFromRoute() {
    if (this.activatedRoute.snapshot.data.slug) {
      return this.activatedRoute.snapshot.data.slug.id;
    }
    return this.activatedRoute.snapshot.queryParams.categoryId;
  }

  filter(filters: any) {
    delete filters.styleId;
    delete filters.brandId;
    delete filters.category;
    this.data = {
      'filter': filters
    };
    this.applySortData(this.releasesTableComponent.currentSort || 3);

    const subPostReleasesSearch = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      this.offers = response.data;
      this.releasesTableComponent.redrawOffers(response.data);
    });

    this.subscriptions.push(subPostReleasesSearch);
  }

  sortByPrice(id: number = 4) {
    this.applySortData(id);
    if (id) {
      const subPostReleasesSearch = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
        this.offers = response.data;
        this.releasesTableComponent.redrawOffers(response.data);
      });
      this.subscriptions.push(subPostReleasesSearch);
    }
  }

  applySortData(id) {
    if (this.data.filter && this.data.filter.hot) {
      delete this.data.filter.hot;
    }
    if (this.data.filter && this.data.hot) {
      delete this.data.hot;
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
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
