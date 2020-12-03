import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { ReleasesTableComponent } from '../../../../../shared/modules/ms-product-table/releases-table/releases-table.component';
import { Brand } from '../../../ms-brands/models/brand';
import { Category } from '../../../ms-categories/models/category';
import { Collection } from '../../models/collection';
import { CollectionsService } from '../../services/collections.service';
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { OffersService } from '../../../ms-offers/services/offers.service';
import { Shop } from '../../../ms-shops/models/shops';
import { ShopsService } from '../../../ms-shops/services/shops.service';
import { Style } from '../../../ms-style/models/style';
import { LayoutService } from '../../../ms-layout/services/layout.service';
import {
  CollectionShopsTableComponent
} from '../../../../../shared/modules/ms-product-table/collection-shops-table/collection-shops-table.component';
import {MsSeoService} from '../../../../../shared/services/ms-seo.service';


@Component({
  selector: 'ms-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  @ViewChild(ReleasesTableComponent) releasesTableComponent: ReleasesTableComponent;

  @ViewChild(CollectionShopsTableComponent) shopsTableComponent: CollectionShopsTableComponent;

  brands: Array<Brand>;

  brandName: string;

  categories: Array<Category>;

  collections: Array<Collection>;

  collection: Collection;

  collectionId: string;

  data: any = {};

  linkedShops: Array<string>;

  collectionShops: Array<any> = [];

  shops: Array<Shop>;

  styles: Array<Style>;

  offers: Array<any>;

  releases: Array<any>;

  releaseName: string;

  title: string;

  description: string;

  imgUrl: string;

  displayHeadingOnPage = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public collectionsService: CollectionsService,
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
    this.collections = this.activatedRoute.snapshot.data.collections;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.offers = this.activatedRoute.snapshot.data.offers;
    this.collectionId = this.getCollectionIdFromRoute();

    // this.layoutService.getLayout('collections', 'heading').subscribe(response => {
    //   this.displayHeadingOnPage = response.data.displayOnPage;
    //   this.title = response.data.title;
    //   this.description = response.data.description;
    //   this.imgUrl = response.data.imgUrl || 'assets/images/whats-new/banner.svg';
    //   this.msSeoService.addMetadata(response.data.keywords);
    // });

    this.data = {};
    if (this.collectionId) {
      this.loadData();
    }

    this.router.events.subscribe(path => {
      if (this.collectionId !== this.getCollectionIdFromRoute()) {
        this.collectionId = this.getCollectionIdFromRoute();
        this.loadData();
      }
    });

  }

  loadData() {
    this.collection = this.collections.find(collection => {
      return collection.id === this.collectionId;
    });
    this.data = {
      filter: {
        'collectionId': this.collectionId,
      }
    };

    const brandId = this.collections.find(item => {
      return item.id === this.collectionId;
    }).brand;
    this.brandName = this.brands.find(item => {
      return item.id === brandId;
    }).name;
    this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      this.releases = response.data;
      this.releasesTableComponent.redrawOffers(response.data);
    });

    this.collectionsService.getCollectionLinkedShops(this.collectionId).subscribe(response => {
      this.collectionShops = [];
      response.data.forEach(item => {
        item.shop = this.shops.find(shop => {
          return shop.id === item.shopId;
        });
        if (item.shop && item.shop.active && item.shop.type === 'virtual') {
          this.collectionShops = [...this.collectionShops, item];
        }
      });
      this.shopsTableComponent.redrawItems(this.collectionShops);
    });

    if (this.collection) {
      this.title = this.collection.name;
      this.description = this.collection.description;
      this.imgUrl = this.collection.imgUrl;
    }
  }

  filter(filters: any) {
    delete filters.styleId;
    delete filters.brandId;
    delete filters.category;
    this.data = {
      'filter': filters
    };

    this.releasesService.postReleasesCalendar(this.data).subscribe(response => {
      this.offers = response.data;
      this.releasesTableComponent.redrawOffers(response.data);
    });
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

      this.releasesService.postReleasesCalendar(this.data).subscribe(response => {
        this.releases = response.data;
        this.releasesTableComponent.redrawOffers(response.data);
      });
    }

  }

  getCollectionIdFromRoute() {
    if (this.activatedRoute.snapshot.data.slug) {
      return this.activatedRoute.snapshot.data.slug.id;
    }
    return this.activatedRoute.snapshot.queryParams.collectionId;
  }

}
