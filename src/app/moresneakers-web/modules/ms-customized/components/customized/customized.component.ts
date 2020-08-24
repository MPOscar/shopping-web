import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { CustomizedReleasesComponent } from '../customized-releases/customized-releases.component';
//
import { BlogsService } from '../../../ms-blogs/services/blogs.service';
import { BrandsService } from '../../../ms-brands/services/brands.service';
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

@Component({
  selector: 'customized',
  templateUrl: './customized.component.html',
  styleUrls: ['./customized.component.scss']
})
export class CustomizedComponent implements OnInit {

  @ViewChild(CustomizedReleasesComponent) customizedReleasesComponent: CustomizedReleasesComponent;

  brands: Array<Brand>;

  categories: Array<Category>;

  data: any;

  shops: Array<Shop>;

  styles: Array<Style>;

  offers: Array<any>;

  releases: Array<any>;

  title: string;

  description: string;

  header: Header;

  slidersData: Sliders;

  slideDisplay: string = "";

  headerDisplay: string = "";

  hottestDisplay: string = "";

  displayHeadertOnPage: boolean = false;

  displaySlidersOnPage: boolean = false;

  displayHottestOnPage: boolean = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public offersService: OffersService,
    public layoutService: LayoutService,
    public releasesService: ReleasesService,
    public shopsService: ShopsService,
  ) { }

  ngOnInit() {
    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.offers = this.activatedRoute.snapshot.data.offers;


    this.layoutService.getLayout('customized', 'heading').subscribe(response => {
      this.title = response.data.title;
      this.description = response.data.description;
    });

    this.data = {
      'customized': 1
    }

    this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      this.offers = response.data;
      this.customizedReleasesComponent.redrawOffers(response.data);
    });

    this.layoutService.getHeader('customized').subscribe(response => {
      this.header = response.data;
      this.headerDisplay = this.header.display;
      this.displayHeadertOnPage = this.header.displayOnPage;
    });

    this.layoutService.getSliders('customized').subscribe(response => {
      this.slidersData = response.data;
      this.slideDisplay = this.slidersData.display;
      this.displaySlidersOnPage = this.slidersData.displayOnPage;
    });

    this.layoutService.getHottest('customized').subscribe(response => {
      this.hottestDisplay = response.data.display;
      this.displayHottestOnPage = response.data.displayOnPage;
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
      this.data['customized'] = 1;
      this.releasesService.postReleasesSearch(this.data).subscribe(response => {
        this.releases = response.data;
        this.customizedReleasesComponent.redrawOffers(response.data);
      });
    }

  }

  filter(filters: any) {
    //delete filters.shopId;
    //delete filters.styleId;
    //delete filters.brandId;
    //delete filters.category;
    this.data = {
      'filter': filters,
      customized: 1
    }

    this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      this.releases = response.data;
      this.customizedReleasesComponent.redrawOffers(response.data);
    });
  }

}
