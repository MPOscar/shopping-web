import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../../../router.animations';
import { ActivatedRoute } from '@angular/router';

import { Deal } from '../../../ms-deals/models/deal';
import { Offer } from '../../../ms-offers/models/offer';
import { Release } from '../../../ms-releases/models/releases';
import { Shop } from '../../../ms-shops/models/shops';
import { Sliders, Header } from '../../../ms-layout/models/layout';

import { BlogsService } from '../../../ms-blogs/services/blogs.service';
import { BrandsService } from '../../../ms-brands/services/brands.service';
import { CollectionsService } from '../../../ms-collections/services/collections.service';
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../../../ms-layout/services/layout.service';
import {MsSeoService} from '../../../../../shared/services/ms-seo.service';


@Component({
    selector: 'ms-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [routerTransition()]
})
export class HomeComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];


    @ViewChild('carousel') carousel: NgbCarousel;


    pageId: string;

    deals: Array<Deal>;

    offers: Array<Offer>;

    releases: Array<Release>;

    shops: Array<Shop>;

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


    constructor(
        public activatedRoute: ActivatedRoute,
        public blogsService: BlogsService,
        public brandsService: BrandsService,
        public collectionsService: CollectionsService,
        public layoutService: LayoutService,
        public releasesService: ReleasesService,
        config: NgbCarouselConfig,
        private msSeoService: MsSeoService
    ) {
        config.showNavigationIndicators = false;
        config.interval = 7000;

        this.sliders.push(
            {
                imagePath: 'assets/images/moc-images/home/full-restock-slide1.jpg',
                label: 'First slide label',
                text:
                    'Nulla vitae elit libero, a pharetra augue mollis interdum.'
            },
            {
                imagePath: 'assets/images/moc-images/home/full-restock-slide2.jpg',
                label: 'Second slide label',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            },
            {
                imagePath: 'assets/images/moc-images/home/full-restock-slide3.jpg',
                label: 'Third slide label',
                text:
                    'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
            }
        );

        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
        this.deals = this.activatedRoute.snapshot.data.deals;
        this.deals = this.deals.filter(deal => !deal.status || deal.status !== 'Expired');
        this.offers = this.activatedRoute.snapshot.data.offers;
        this.releases = this.activatedRoute.snapshot.data.releases;
        this.shops = this.activatedRoute.snapshot.data.shops;


        this.layoutService.getLayout('home', 'heading').subscribe(response => {
          if (response.data) {
            this.displayHeadingOnPage = response.data.displayOnPage;
            this.title = response.data.title;
            this.description = response.data.keywords;
            this.imgUrl = response.data.imgUrl || 'assets/images/whats-new/banner.svg';
            this.msSeoService.addMetadata(response.data.keywords);
          }
        });

        this.layoutService.getHeader('home').subscribe(response => {
            this.header = response.data;
            this.headerDisplay = this.header.display;
            this.displayHeadertOnPage = this.header.displayOnPage;
        });

        this.layoutService.getSliders('home').subscribe(response => {
            this.slidersData = response.data;
            this.slideDisplay = this.slidersData.display;
            this.displaySlidersOnPage = this.slidersData.displayOnPage;
        });

        this.layoutService.getHottest('home').subscribe(response => {
            this.hottestDisplay = response.data.display;
            this.displayHottestOnPage = response.data.displayOnPage;
        });

    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
