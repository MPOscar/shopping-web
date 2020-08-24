import { Component, OnInit, Input } from '@angular/core';
import { Release } from '../../../moresneakers-web/modules/ms-releases/models/releases';
import { ReleasesService } from '../../../moresneakers-web/modules/ms-releases/services/releases.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
//
import { Header, Slide } from '../../../moresneakers-web/modules/ms-layout/models/layout';
import { ErrorHandlingService } from '../../../error-handling/services/error-handling.service';
import { TranslateService } from '@ngx-translate/core';

const errorKey = 'Error';

@Component({
  selector: 'ms-header',
  templateUrl: './ms-header.component.html',
  styleUrls: ['./ms-header.component.scss']
})
export class MsHeaderComponent implements OnInit {
  public hotItems: Array<any> = [];

  @Input() header: Header;

  @Input() releases: any;

  @Input() brandId: any;

  @Input() categoryId: any;

  data: any;

  constructor(private releasesService: ReleasesService,
    private translate: TranslateService,
    private errorHandlingService: ErrorHandlingService) {
  }

  ngOnInit() {
   if (this.brandId) {

      this.data = {
        'filter': {
          'brandId': this.categoryId,
        }
      };

      this.releasesService.postReleasesSearch(this.data).subscribe(response => {
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
    } else if (this.categoryId) {
      this.data = {
        'filter': {
          'categoryId': this.categoryId,
        }
      };
      this.releasesService.postReleasesSearch(this.data).subscribe(response => {
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
    } else {
      this.data = {
        'filter': {}
      };
      this.releasesService.postReleasesSearch(this.data).subscribe(response => {
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
    }

  }

  reloadHottestSliderBrand(brandId: string) {
    this.hotItems = [];
    this.data = {
      'filter': {
        'brandId': this.brandId,
      }
    };

    this.releasesService.postReleasesSearch(this.data).subscribe(response => {
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
  }

  reloadHottestSliderCategory(categoryId: string) {
    this.hotItems = [];
    this.data = {
      'filter': {
        'categoryId': this.categoryId,
      }
    };

    this.releasesService.postReleasesSearch(this.data).subscribe(response => {
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
  }

}
