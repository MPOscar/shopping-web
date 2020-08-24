import { Component, Input, OnInit } from '@angular/core';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import {MsRoutingService} from '../../../../../routing/services/ms-routing-service';

@Component({
    selector: 'ms-release-page-details',
    templateUrl: './ms-release-page-details.component.html',
    styleUrls: ['./ms-release-page-details.component.scss']
})
export class MsReleasePageDetailsComponent implements OnInit {
    @Input() releasePage: any;

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private routingService: MsRoutingService) {
    }

    ngOnInit() {
        this.galleryOptions = [
            {
                imageArrows: false,
                preview: false,
                width: '100%',
                height: '100%',
                thumbnailsColumns: 6,
                imageAnimation: NgxGalleryAnimation.Slide,
                thumbnailsMargin: 13,
                imageSize: 'cover',
                arrowPrevIcon: 'fas fa-chevron-left',
                arrowNextIcon: 'fas fa-chevron-right'
            },
            // max-width 768
            {
                breakpoint: 992,
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 13,
                thumbnailMargin: 13
            },
        ];

        this.galleryImages = [];
        for (const image of this.releasePage.images) {
            this.galleryImages.push({
                small: image.small,
                medium: image.medium,
                big: image.big
            });
        }
    }

    setGalleryImages(galleryImages: any) {
        this.galleryImages = [];
        for (const image of galleryImages) {
            this.galleryImages.push({
                small: image.small,
                medium: image.medium,
                big: image.big
            });
        }
    }

    getFullGender(gender: string) {
        switch (gender) {
            case 'm':
                return 'Men';
            case 'f':
                return 'Woman';
            case 'c':
                return 'Children';
            default:
                return 'Unisex';
        }
    }

    get releaseHasPrice() {
        return this.releasePage.retailerPriceEUR || this.releasePage.retailerPriceUSD || this.releasePage.retailerPriceGBP;
    }

    getRoute(name) {
      return this.routingService.getRouterName(name);
    }
}
