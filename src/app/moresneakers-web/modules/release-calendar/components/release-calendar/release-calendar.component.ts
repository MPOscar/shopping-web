import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { routerTransition } from '../../../../../router.animations';
import { ConfigService } from '../../../../../config/services/config.service';
//
import { BlogsService } from '../../../ms-blogs/services/blogs.service';
import { BrandsService } from '../../../ms-brands/services/brands.service';
import { Brand } from '../../../ms-brands/models/brand';
import { Category } from '../../../ms-categories/models/category';
import { CollectionsService } from '../../../ms-collections/services/collections.service';
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { Shop } from '../../../ms-shops/models/shops';
import { Style } from '../../../ms-style/models/style';
import { LayoutService } from '../../../ms-layout/services/layout.service';
import { Sliders, Header } from '../../../ms-layout/models/layout';


import { LoadingService } from '../../../../../http-request-indicator/services/loading.service';

import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {MsSeoService} from '../../../../../shared/services/ms-seo.service';

@Component({
    selector: 'ms-release-calendar',
    templateUrl: './release-calendar.component.html',
    styleUrls: ['./release-calendar.component.scss'],
    animations: [routerTransition()]
})
export class ReleaseCalendarComponent implements OnInit {

    public alerts: Array<any> = [];

    public sliders: Array<any> = [];

    @ViewChild('carousel') carousel: NgbCarousel;

    brands: Array<Brand>;

    categories: Array<Category>;

    shops: Array<Shop>;

    styles: Array<Style>;

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

    constructor(
        public activatedRoute: ActivatedRoute,
        public blogsService: BlogsService,
        public brandsService: BrandsService,
        public collectionsService: CollectionsService,
        public configService: ConfigService,
        public layoutService: LayoutService,
        public loadingService: LoadingService,
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
        this.layoutService.getLayout('release_calendar', 'heading').subscribe(response => {
            this.displayHeadingOnPage = response.data.displayOnPage;
            this.title = response.data.title;
            this.description = response.data.description;
            this.imgUrl = response.data.imgUrl || 'assets/images/home-shoe-pattern.svg';
            this.msSeoService.addMetadata(response.data.keywords);
        });

        this.brands = this.activatedRoute.snapshot.data.brands;
        this.categories = this.activatedRoute.snapshot.data.categories;
        this.shops = this.activatedRoute.snapshot.data.shops;
        this.styles = this.activatedRoute.snapshot.data.styles;

        this.layoutService.getHeader('release_calendar').subscribe(response => {
            this.header = response.data;
            this.headerDisplay = this.header.display;
            this.displayHeadertOnPage = this.header.displayOnPage;
        });

        this.layoutService.getSliders('release_calendar').subscribe(response => {
            this.slidersData = response.data;
            this.slideDisplay = this.slidersData.display;
            this.displaySlidersOnPage = this.slidersData.displayOnPage;
        });

        this.layoutService.getHottest('release_calendar').subscribe(response => {
            this.hottestDisplay = response.data.display;
            this.displayHottestOnPage = response.data.displayOnPage;
        });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
