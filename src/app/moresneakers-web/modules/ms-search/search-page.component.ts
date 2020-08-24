import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { MsProductTableComponent } from '../../../shared/modules/ms-product-table/ms-product-table.component';
//
import { BlogsService } from '../ms-blogs/services/blogs.service';
import { BrandsService } from '../ms-brands/services/brands.service';
import { Brand } from '../ms-brands/models/brand';
import { Category } from '../ms-categories/models/category';
import { CollectionsService } from '../ms-collections/services/collections.service';
import { FilterFormComponent } from '../ms-filters/components/filters-form/filters-form.component';
import { ReleasesService } from '../ms-releases/services/releases.service';
import { OffersService } from '../ms-offers/services/offers.service';
import { Shop } from '../ms-shops/models/shops';
import { ShopsService } from '../ms-shops/services/shops.service';
import { Style } from '../ms-style/models/style';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  @ViewChild(FilterFormComponent) filterFormComponent: FilterFormComponent;
  @ViewChild(MsProductTableComponent) productTableComponent: MsProductTableComponent;

  brands: Array<Brand>;

  categories: Array<Category>;

  count: number = 0;

  shops: Array<Shop>;

  styles: Array<Style>;

  offers: Array<any>;

  releases: Array<any>;

  filters: any;

  data: any;

  showFilter: boolean = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public offersService: OffersService,
    public releasesService: ReleasesService,
    public router: Router,
    public shopsService: ShopsService,
  ) { }

  ngOnInit() {
    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.filters = this.activatedRoute.snapshot.queryParams.filters;

    this.data = {
      filter: JSON.parse(this.filters),
    };

    this.offersService.posOffersSearch(this.data).subscribe(response => {
      this.offers = response.data;
      this.count = response.dataCount;
      this.productTableComponent.redrawOffers(this.offers);
    });

    this.router.events.subscribe(path => {
      if (this.activatedRoute.snapshot.queryParams.filters != this.filters) {
        this.showFilter = false;
        this.filters = this.activatedRoute.snapshot.queryParams.filters;
        this.data = {
          filter: JSON.parse(this.filters),
        }

        this.offersService.posOffersSearch(this.data).subscribe(response => {
          this.offers = response.data;
          this.count = response.dataCount;
          this.showFilter = true;
          this.productTableComponent.redrawOffers(this.offers);
        });

      }

    });
  }

  filter(filters: any) {
    delete filters.category;
    delete filters.color;
    this.data = {
      'filter': filters
    }

    this.offersService.posOffersSearch(this.data).subscribe(response => {
      this.offers = response.data;
      this.count = response.dataCount;
      this.productTableComponent.redrawOffers(response.data);
    });
  }

  sortByPrice(id: number) {
    if (id) {
      if (id === 1) {
        this.data['ordering'] = '-priceEUR'
      } else if (id === 2) {
        this.data['ordering'] = 'priceEUR'
      }

      this.offersService.posOffersSearch(this.data).subscribe(response => {
        this.offers = response.data;
        this.count = response.dataCount;
        this.productTableComponent.redrawOffers(response.data);
      });
    }

  }

}
