import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
//
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { Release } from '../../../ms-releases/models/releases';


@Component({
  selector: 'ms-hottest-releases-calendear',
  templateUrl: './ms-hottest-releases.component.html',
  styleUrls: ['./ms-hottest-releases.component.scss']
})
export class MsHottestReleasesComponent implements OnInit, AfterViewInit {
  public screenWidth: any;
  public hotItems: Array<any> = [];

  public numItems: Array<number> = [];

  readonly itemsPerScreenSize = {
    mobile: 4,
    tablet: 8,
    extraLarge: 12
  };

  readonly screenWidthType = {
    mobile: 700,
    tablet: 1024
  };

  releases: Array<Release> = [];

  @ViewChild('hottestReleaseCarousel') carousel: NgbCarousel;


  constructor(
    public activatedRoute: ActivatedRoute,
    public releasesService: ReleasesService,
  ) {
    // config.showNavigationArrows = false;
    // config.showNavigationIndicators = true;
  }

  ngAfterViewInit(): void {
    this.carousel.showNavigationArrows = false;
    this.carousel.showNavigationIndicators = true;
  }

  ngOnInit() {
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.screenWidth = window.innerWidth;

    /*for (let i = 0; i < 3; ++i) {
      this.hotItems.push({
        link: '#',
        hot: true,
        image: 'assets/images/moc-images/home/hottest-release-shoe1.svg',
        slogan: 'Urban Nike is here to stay. The perfect choice for this hot summer.'
      });

      this.hotItems.push({
        link: '#',
        hot: false,
        image: 'assets/images/moc-images/home/hottest-release-shoe2.svg',
        slogan: 'Air Jordan 1 Retro High OG "Guava Ice" Releases on September 1st'
      });

      this.hotItems.push({
        link: '#',
        hot: true,
        image: 'assets/images/moc-images/home/hottest-release-shoe3.svg',
        slogan: 'This nike light 99 is tinted in the Sun'
      });

      this.hotItems.push({
        link: '#',
        hot: false,
        image: 'assets/images/moc-images/home/hottest-release-shoe1.svg',
        slogan: 'Urban Nike is here to stay. The perfect choice for this hot summer.'
      });

      this.hotItems.push({
        link: '#',
        hot: false,
        image: 'assets/images/moc-images/home/hottest-release-shoe2.svg',
        slogan: 'Air Jordan 1 Retro High OG "Guava Ice" Releases on September 1st'
      });

      this.hotItems.push({
        link: '#',
        hot: false,
        image: 'assets/images/moc-images/home/hottest-release-shoe3.svg',
        slogan: 'This nike light 99 is tinted in the Sun'
      });

      this.hotItems.push({
        link: '#',
        hot: false,
        image: 'assets/images/moc-images/home/hottest-release-shoe4.svg',
        slogan: 'Urban Nike is here to stay. The perfect choice for this hot summer.'
      });

      this.hotItems.push({
        link: '#',
        hot: false,
        image: 'assets/images/moc-images/home/hottest-release-shoe1.svg',
        slogan: 'Air Jordan 1 Retro High OG "Guava Ice" Releases on September 1st'
      });

      this.hotItems.push({
        link: '#',
        hot: true,
        image: 'assets/images/moc-images/home/hottest-release-shoe5.svg',
        slogan: 'This nike light 99 is tinted in the Sun'
      });

      this.hotItems.push({
        link: '#',
        hot: false,
        image: 'assets/images/moc-images/home/hottest-release-shoe4.svg',
        slogan: 'Urban Nike is here to stay. The perfect choice for this hot summer.'
      });

      this.hotItems.push({
        link: '#',
        hot: true,
        image: 'assets/images/moc-images/home/hottest-release-shoe1.svg',
        slogan: 'Air Jordan 1 Retro High OG "Guava Ice" Releases on September 1st'
      });

      this.hotItems.push({
        link: '#',
        hot: false,
        image: 'assets/images/moc-images/home/hottest-release-shoe5.svg',
        slogan: 'This nike light 99 is tinted in the Sun'
      });
    }*/


    /*this.hotItems.push({
      link: '#',
      hot: true,
      image: 'assets/images/moc-images/home/hottest-release-shoe3.svg',
      slogan: 'This nike light 99 is tinted in the Sun'
    });

    this.hotItems.push({
      link: '#',
      hot: false,
      image: 'assets/images/moc-images/home/hottest-release-shoe1.svg',
      slogan: 'Urban Nike is here to stay. The perfect choice for this hot summer.'
    });

    this.hotItems.push({
      link: '#',
      hot: false,
      image: 'assets/images/moc-images/home/hottest-release-shoe2.svg',
      slogan: 'Air Jordan 1 Retro High OG "Guava Ice" Releases on September 1st'
    });

    this.hotItems.push({
      link: '#',
      hot: false,
      image: 'assets/images/moc-images/home/hottest-release-shoe3.svg',
      slogan: 'This nike light 99 is tinted in the Sun'
    });

    this.hotItems.push({
      link: '#',
      hot: false,
      image: 'assets/images/moc-images/home/hottest-release-shoe4.svg',
      slogan: 'Urban Nike is here to stay. The perfect choice for this hot summer.'
    });

    this.hotItems.push({
      link: '#',
      hot: false,
      image: 'assets/images/moc-images/home/hottest-release-shoe1.svg',
      slogan: 'Air Jordan 1 Retro High OG "Guava Ice" Releases on September 1st'
    });

    this.hotItems.push({
      link: '#',
      hot: true,
      image: 'assets/images/moc-images/home/hottest-release-shoe5.svg',
      slogan: 'This nike light 99 is tinted in the Sun'
    });

    this.hotItems.push({
      link: '#',
      hot: false,
      image: 'assets/images/moc-images/home/hottest-release-shoe4.svg',
      slogan: 'Urban Nike is here to stay. The perfect choice for this hot summer.'
    });*/

    this.releases.forEach(item => {
      this.hotItems.push({
        link: '#',
        hot: item.hot,
        image: item.mainImage,
        slogan: item.description,
      });
    })
    this.hotItems = this.shuffleInPlace(this.hotItems);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }

  getHotPages(): number {
    if (this.screenWidth <= this.screenWidthType.mobile) {
      return this.hotItems.length / this.itemsPerScreenSize.mobile;
    } else if (this.screenWidth <= this.screenWidthType.tablet) {
      return this.hotItems.length / this.itemsPerScreenSize.tablet;
    } else {
      return this.hotItems.length / this.itemsPerScreenSize.extraLarge;
    }

    return 0;
  }

  getHotPagesList(): Array<number> {
    const N = this.getHotPages();
    return Array.apply(null, { length: N }).map(Number.call, Number);
  }

  getHotItems(page: number): Array<any> {
    let firstItem: number;
    let lastItem: number;

    if (this.screenWidth <= this.screenWidthType.mobile) {
      firstItem = (page) * this.itemsPerScreenSize.mobile;
      lastItem = firstItem + this.itemsPerScreenSize.mobile;
    } else if (this.screenWidth <= this.screenWidthType.tablet) {
      firstItem = (page) * this.itemsPerScreenSize.tablet;
      lastItem = firstItem + this.itemsPerScreenSize.tablet;
    } else {
      firstItem = (page) * this.itemsPerScreenSize.extraLarge;
      lastItem = firstItem + this.itemsPerScreenSize.extraLarge;
    }

    return this.hotItems.slice(firstItem, lastItem);
  }

  isLastRowItem(index: number): boolean {
    let rowItems = 1;

    if (this.screenWidth <= this.screenWidthType.mobile) {
      rowItems = this.itemsPerScreenSize.mobile;
    } else if (this.screenWidth <= this.screenWidthType.tablet) {
      rowItems = this.itemsPerScreenSize.tablet;
    } else {
      rowItems = this.itemsPerScreenSize.extraLarge;
    }

    rowItems = rowItems / 2;
    index = index + 1;
    return (index % rowItems) === 0;
  }

  // Randomize, just for showing moc, can be deleted for production
  private shuffleInPlace<T>(array: T[]): T[] {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
