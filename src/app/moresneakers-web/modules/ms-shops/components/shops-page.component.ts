import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//
import { Shop } from '../models/shops';
import { Style } from '../../ms-style/models/style';
import { Category } from '../../ms-categories/models/category';
import { Brand } from '../../ms-brands/models/brand';
import { LayoutService } from '../../ms-layout/services/layout.service';
import { Sliders, Header } from '../../ms-layout/models/layout';
import { ShopsService } from '../services/shops.service';
import { Subscription } from 'rxjs';
import {MsSeoService} from '../../../../shared/services/ms-seo.service';

@Component({
  selector: 'ms-shops-page',
  templateUrl: './shops-page.component.html',
  styleUrls: ['./shops-page.component.scss']
})
export class ShopsPageComponent implements OnInit, OnDestroy {

  title: string;

  imgUrl: string;

  description: string;

  shops: Array<Shop> = [];

  mostPopularShops: Array<Shop> = [];

  brands: Array<Brand> = [];

  categories: Array<Category> = [];

  styles: Array<Style> = [];

  header: Header;

  shipping: string;

  slidersData: Sliders;

  slideDisplay = '';

  headerDisplay = '';

  hottestDisplay = '';

  displayHeadingOnPage = true;

  displayHeadertOnPage = false;

  displaySlidersOnPage = false;

  displayHottestOnPage = false;

  defaultFilters: any;

  subscriptions: Subscription[] = [];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public layoutService: LayoutService,
    public shopsService: ShopsService,
    private msSeoService: MsSeoService) {
  }

  displayData() {
    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.styles = this.activatedRoute.snapshot.data.styles;

    const sub1 = this.layoutService.getLayout('shops', 'heading')
      .subscribe(response => {
        this.displayHeadingOnPage = response.data.displayOnPage;
        this.title = response.data.title;
        this.description = response.data.description;
        this.imgUrl = response.data.imgUrl || 'assets/images/shops-page/banner.png';
        this.msSeoService.addMetadata(response.data.keywords);
      });

    const sub2 = this.layoutService.getHeader('shops')
      .subscribe(response => {
        this.header = response.data;
        this.headerDisplay = this.header.display;
        this.displayHeadertOnPage = this.header.displayOnPage;
      });

    const sub3 = this.layoutService.getSliders('shops')
      .subscribe(response => {
        this.slidersData = response.data;
        this.slideDisplay = this.slidersData.display;
        this.displaySlidersOnPage = this.slidersData.displayOnPage;
      });

    const sub4 = this.layoutService.getHottest('shops')
      .subscribe(response => {
        this.hottestDisplay = response.data.display;
        this.displayHottestOnPage = response.data.displayOnPage;
      });

    const sub5 = this.shopsService.getMostPopularShops()
      .subscribe(response => {
        this.mostPopularShops = response.data;
      });

    // Filter shop when select shpping countries on shop's menu
    if (this.shipping) {
      this.filter({shipping: [this.shipping]});
      this.defaultFilters = {shipping: [this.shipping]};
    } else {
      this.filter({type: 'virtual'});
      this.defaultFilters = {shipping: ['Worldwide','USA', 'Europe']};
    }

    this.mostPopularShops.push({
      name: 'Footlocker',
      active: true,
      mainImage: 'assets/images/images-server/imgr0eh4jjqwgwtfy.jpg',
      address: '#'
    });

    this.mostPopularShops.push({
      name: 'Pure Nike',
      active: true,
      mainImage: '#',
      address: 'assets/images/images-server/imgr0eh4jjqwghnil.jpg'
    });

    this.mostPopularShops.push({
      name: 'Adidas',
      active: true,
      mainImage: '#',
      address: 'assets/images/images-server/imgr0eh4jjqwle53e.jpg'
    });

    this.subscriptions.push(sub1, sub2, sub3, sub4, sub5);
  }

  ngOnInit() {
    this.shipping = this.activatedRoute.snapshot.data.shipping;
    this.displayData();
    this.router.events.subscribe(path => {
      if (this.shipping !== this.activatedRoute.snapshot.data.shipping) {
        this.shipping = this.activatedRoute.snapshot.data.shipping;
        this.displayData();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  filter(filters: any) {
    const data = Object.assign({ active: 1 }, filters);
    if (data.styleId) {
      delete data.styleId;
    }
    this.shopsService.postShopsSearch(data).subscribe(response => {
       this.shops = response.data;
    });
  }

}
