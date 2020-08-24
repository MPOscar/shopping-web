import {Component, OnInit, Input, ViewChild, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
//
import {ReleasesTableComponent} from '../../../../../shared/modules/ms-product-table/releases-table/releases-table.component';
//
import {BlogsService} from '../../../ms-blogs/services/blogs.service';
import {BrandsService} from '../../../ms-brands/services/brands.service';
import {Brand} from '../../../ms-brands/models/brand';
import {Category} from '../../../ms-categories/models/category';
import {CollectionsService} from '../../../ms-collections/services/collections.service';
import {ReleasesService} from '../../services/releases.service';
import {OffersService} from '../../../ms-offers/services/offers.service';
import {Shop} from '../../../ms-shops/models/shops';
import {ShopsService} from '../../../ms-shops/services/shops.service';
import {Style} from '../../../ms-style/models/style';
import {LayoutService} from '../../../ms-layout/services/layout.service';
import {Sliders, Header} from '../../../ms-layout/models/layout';
import {Subscription} from 'rxjs';
import {MsSeoService} from '../../../../../shared/services/ms-seo.service';

@Component({
  selector: 'releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit, OnDestroy {

  @ViewChild(ReleasesTableComponent) releasesTableComponent: ReleasesTableComponent;

  brands: Array<Brand>;

  categories: Array<Category>;

  data: any = {};

  shops: Array<Shop>;

  styles: Array<Style>;

  releases: Array<any>;

  releaseName: string;

  title: string;

  description: string;

  imgUrl: string;

  header: Header;

  slidersData: Sliders;

  slideDisplay = '';

  headerDisplay = '';

  hottestDisplay = '';

  displayHeadingOnPage = true;

  displayHeadertOnPage = false;

  displaySlidersOnPage = false;

  displayHottestOnPage = false;

  sortId = 4;

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

    this.releaseName = this.activatedRoute.snapshot.queryParams.releaseName;

    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.releases = this.activatedRoute.snapshot.data.releases;

    const subgetLayout = this.layoutService.getLayout('releases', 'heading').subscribe(response => {
      this.displayHeadingOnPage = response.data.displayOnPage;
      this.title = response.data.title;
      this.description = response.data.description;
      this.imgUrl = response.data.imgUrl || 'assets/images/whats-new/banner.svg';
      this.msSeoService.addMetadata(response.data.keywords);
    });
    this.subscriptions.push(subgetLayout);

    this.setDefaultData({});
    this.loadData();

    const sub = this.router.events.subscribe(path => {
      if (this.activatedRoute.snapshot.queryParams.releaseName !== this.releaseName || this.activatedRoute.snapshot.queryParams.upcoming) {
        this.releaseName = this.activatedRoute.snapshot.queryParams.releaseName;
        this.loadData();
      }
    });
    this.subscriptions.push(sub);

    const subGetHeader = this.layoutService.getHeader('releases').subscribe(response => {
      this.header = response.data;
      this.headerDisplay = this.header.display;
      this.displayHeadertOnPage = this.header.displayOnPage;
    });
    this.subscriptions.push(subGetHeader);


    const subGetSliders = this.layoutService.getSliders('releases').subscribe(response => {
      this.slidersData = response.data;
      this.slideDisplay = this.slidersData.display;
      this.displaySlidersOnPage = this.slidersData.displayOnPage;
    });
    this.subscriptions.push(subGetSliders);

    const subGetHottest = this.layoutService.getHottest('releases').subscribe(response => {
      this.hottestDisplay = response.data.display;
      this.displayHottestOnPage = response.data.displayOnPage;
    });
    this.subscriptions.push(subGetHottest);

  }

  loadData() {
    this.setDefaultData({});
    const subPostReleasesSearch = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      this.releases = response.data;
      this.releasesTableComponent.redrawOffers(response.data);
    });
    this.subscriptions.push(subPostReleasesSearch);
  }

  filter(filters: any) {
    this.setDefaultData(filters);
    const subPostReleasesCalendar = this.releasesService.postReleasesCalendar(this.data).subscribe(response => {
      this.releases = response.data;
      this.releasesTableComponent.redrawOffers(response.data);
    });
    this.subscriptions.push(subPostReleasesCalendar);

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
      } else if (id === 5) {
        this.data['ordering'] = '-releaseDate';
      } else if (id === 6) {
        this.data['ordering'] = '-createdAt';
      }
      const subPostReleasesSearch = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
        this.releases = response.data;
        this.releasesTableComponent.redrawOffers(response.data);
      });
      this.subscriptions.push(subPostReleasesSearch);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  setDefaultData(filters) {
    const oldSorting = this.data ? this.data.ordering : '-updatedAt';
    this.data = {
      filter: filters,
      'ordering': '-updatedAt'
    };
    if (this.activatedRoute.snapshot.data.upcoming) {
      this.data.upcoming = 1;
    }
    if (this.releaseName) {
      this.data.filter.query = this.releaseName;
    }
    if (oldSorting) {
      this.data.ordering = oldSorting;
    }
  }
}
