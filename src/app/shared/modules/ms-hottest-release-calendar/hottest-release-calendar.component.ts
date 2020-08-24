import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hottest-release-calendar',
  templateUrl: './hottest-release-calendar.component.html',
  styleUrls: ['./hottest-release-calendar.component.scss']
})
export class HottestReleaseCalendarComponent implements OnInit {
  public partners: Array<any> = [];
  @ViewChild('ourPartnersCarousel') carousel: NgbCarousel;

  constructor(config: NgbCarouselConfig) {
    config.interval = 7000;
  }

  ngOnInit() {
    this.partners.push({
      id: 'partner1',
      tabName: 'FOOTLOCKER',
      modelName: 'Nike Air Force 1',
      image: 'assets/images/moc-images/our-partners/footlocker-slide1.jpg',
      slogan: 'Just do it',
      link: '#',
    });

    this.partners.push({
      id: 'partner2',
      tabName: 'ADIDAS Max',
      modelName: 'Adidas Sea Force 1',
      image: 'assets/images/moc-images/our-partners/footlocker-slide2.jpg',
      slogan: 'ADIDAS Max slogan',
      link: '#'
    });

    this.partners.push({
      id: 'partner3',
      tabName: 'All Nike',
      modelName: 'Another Brand',
      image: 'assets/images/moc-images/our-partners/footlocker-slide3.jpg',
      slogan: 'Do what you want',
      link: '#'
    });

    this.partners.push({
      id: 'partner4',
      tabName: 'My Sneakers Fever',
      modelName: 'I have fever',
      image: 'assets/images/moc-images/our-partners/footlocker-slide4.jpg',
      slogan: 'So take a pill',
      link: '#'
    });

    // this.carousel.cycle();
  }

  getActiveSlideId(): string {
    if (this.carousel) {
      return this.carousel.activeId;
    } else {
      return this.partners[0].id;
    }
  }

  select(slide: string) {
    this.carousel.select(slide);

    return false;
  }
}
