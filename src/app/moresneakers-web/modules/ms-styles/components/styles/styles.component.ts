import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { ReleasesTableComponent } from '../../../../../shared/modules/ms-product-table/releases-table/releases-table.component';
import { ShopsTableComponent } from '../../../../../shared/modules/ms-product-table/shops-table/shops-table.component';

import { Brand } from '../../../ms-brands/models/brand';
import { Category } from '../../../ms-categories/models/category';
import { Styles } from '../../models/styles';
import { StylesService } from '../../services/styles.service';
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { OffersService } from '../../../ms-offers/services/offers.service';
import { Shop } from '../../../ms-shops/models/shops';
import { ShopsService } from '../../../ms-shops/services/shops.service';
import { Style } from '../../../ms-style/models/style';
import { LayoutService } from '../../../ms-layout/services/layout.service';
import {
  CollectionShopsTableComponent
} from '../../../../../shared/modules/ms-product-table/collection-shops-table/collection-shops-table.component';

@Component({
  selector: 'ms-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss']
})
export class StylesComponent implements OnInit {

  @ViewChild(ReleasesTableComponent) releasesTableComponent: ReleasesTableComponent;

  @ViewChild(CollectionShopsTableComponent) shopsTableComponent: CollectionShopsTableComponent;

  brands: Array<Brand>;

  brandName: string;

  categories: Array<Category>;

  collections: Array<Styles>;

  style: Styles;

  styleId: string;

  data: any = {};

  stylesShops: Array<any> = [];

  shops: Array<Shop>;

  styles: Array<Style>;

  offers: Array<any>;

  releases: Array<any>;

  releaseName: string;

  title: string;

  description: string;

  constructor(
    public activatedRoute: ActivatedRoute,
    public stylesService: StylesService,
    public offersService: OffersService,
    public layoutService: LayoutService,
    public releasesService: ReleasesService,
    public router: Router,
    public shopsService: ShopsService,
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
    this.styleId = this.getStyleIdFromRoute();

    // this.layoutService.getLayout('collection', 'heading').subscribe(response => {
    //   this.title = response.data.title;
    //   this.description = response.data.description;
    // });

    this.data = {};
    if (this.styleId) {
      this.loadData();
    }

    this.router.events.subscribe(path => {
      if (this.styleId !== this.getStyleIdFromRoute()) {
        this.styleId = this.getStyleIdFromRoute();
        this.loadData();
      }
    });

  }

  loadData() {
    this.style = this.styles.find(style1 => {
      return style1.id === this.styleId;
    });

    // Filter style and all direct descendants
    const stylesFilter = this.getDescendants(this.styleId);
    stylesFilter.push(this.styleId);

    this.data = {
      filter: {
        'styleId': stylesFilter
      }
    };

    const brandId = this.styles.find(item => {
      return item.id === this.styleId;
    }).brand;
    this.brandName = this.brands.find(item => {
      return item.id === brandId;
    }).name;
    this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      this.releases = response.data;
      this.releasesTableComponent.redrawOffers(response.data);
    });

    this.stylesService.getStyleLinkedShops(this.styleId).subscribe(response => {
      this.stylesShops = [];
      response.data.forEach(item => {
        item.shop = this.shops.find(shop => {
          return shop.id === item.shopId;
        });
        if (item.shop.active) {
          this.stylesShops = [...this.stylesShops, item];
        }
      });
      this.shopsTableComponent.redrawItems(this.stylesShops);
    });
  }

  getDescendants(styleId: string) {
    return this.styles.filter((style) => {
      return style.parent === styleId;
    }).map(st => st.id);
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

  getStyleIdFromRoute() {
    if (this.activatedRoute.snapshot.data.slug) {
      return this.activatedRoute.snapshot.data.slug.id;
    }
    return this.activatedRoute.snapshot.queryParams.styleId;
  }

}
