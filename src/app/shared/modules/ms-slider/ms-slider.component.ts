import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Release } from '../../../moresneakers-web/modules/ms-releases/models/releases';
import { ReleasesService } from '../../../moresneakers-web/modules/ms-releases/services/releases.service';
import { catchError, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
//
import { Sliders, Slide } from '../../../moresneakers-web/modules/ms-layout/models/layout';
import { ErrorHandlingService } from '../../../error-handling/services/error-handling.service';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';
import {MsRoutingService} from '../../../routing/services/ms-routing-service';

const errorKey = 'Error';

@Component({
  selector: 'ms-slider',
  templateUrl: './ms-slider.component.html',
  styleUrls: ['./ms-slider.component.scss']
})
export class MsSliderComponent implements OnInit, OnDestroy {
  public hotItems: Array<any> = [];

  @Input() sliders: Array<Slide>;

  @Input() releases: any;

  @Input() brandId: any;

  @Input() categoryId: any;

  @Input() normalTitle = 'HOTTEST';
  @Input() italicTitle = 'RELEASES';

  data: any;

  subscriptions: Subscription[] = [];

  constructor(private releasesService: ReleasesService,
    private translate: TranslateService,
    private errorHandlingService: ErrorHandlingService,
    private routingService: MsRoutingService) {
  }

  ngOnInit() {
    if (this.brandId) {

      this.data = {
        'filter': {
          'brandId': this.categoryId,
        }
      };

      const subPostReleasesSearch = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
        response.data.forEach(item => {
          if (item.hot) {
            this.hotItems.push({
              id: item.id,
              link: '#',
              image: item.mainImage,
              // image: 'assets/images/images-server/imgr0e6qwjqpg1sad.jpg',
              slogan: item.name,
            });
          }
        });
      });
      this.subscriptions.push(subPostReleasesSearch);

    } else if (this.categoryId) {
      this.data = {
        'filter': {
          'categoryId': this.categoryId,
        }
      };
      const subPostReleasesSearch1 = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
        response.data.forEach(item => {
          if (item.hot) {
            this.hotItems.push({
              id: item.id,
              link: '#',
              image: item.mainImage,
              // image: 'assets/images/images-server/imgr0e6qwjqpg1sad.jpg',
              slogan: item.name,
            });
          }
        });
      });
      this.subscriptions.push(subPostReleasesSearch1);

    } else {
      this.data = {
        'filter': {}
      };
      const postPostReleasesSearch2 = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
        response.data.forEach(item => {
          if (item.hot) {
            this.hotItems.push({
              id: item.id,
              link: '#',
              image: item.mainImage,
              // image: 'assets/images/images-server/imgr0e6qwjqpg1sad.jpg',
              slogan: item.name,
            });
          }
        });
      });
      this.subscriptions.push(postPostReleasesSearch2);

    }

  }

  reloadHottestSliderBrand(brandId: string) {
    this.hotItems = [];
    this.data = {
      'filter': {
        'brandId': this.brandId,
      }
    };

    const subPostReleasesSearch3 = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      response.data.forEach(item => {
        if (item.hot) {
          this.hotItems.push({
            id: item.id,
            link: '#',
            image: item.mainImage,
            slogan: item.name,
          });
        }
      });
    });
    this.subscriptions.push(subPostReleasesSearch3);
  }

  reloadHottestSliderCategory(categoryId: string) {
    this.hotItems = [];
    this.data = {
      'filter': {
        'categoryId': this.categoryId,
      }
    };

    const subPostReleasesSearch4 = this.releasesService.postReleasesSearch(this.data).subscribe(response => {
      response.data.forEach(item => {
        if (item.hot) {
          this.hotItems.push({
            id: item.id,
            image: item.mainImage,
            slogan: item.name,
          });
        }
      });

    });
    this.subscriptions.push(subPostReleasesSearch4);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  routeFromClick(slide: Slide) {
    this.routingService.routeFromSlide(slide);
  }

}
