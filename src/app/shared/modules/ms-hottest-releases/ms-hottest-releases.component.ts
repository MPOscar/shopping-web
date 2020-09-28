import {AfterViewInit, Component, HostListener, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { ReleasesService } from '../../../moresneakers-web/modules/ms-releases/services/releases.service';
import { Release } from '../../../moresneakers-web/modules/ms-releases/models/releases';

@Component({
  selector: 'ms-hottest-releases',
  templateUrl: './ms-hottest-releases.component.html',
  styleUrls: ['./ms-hottest-releases.component.scss']
})
export class MsHottestReleasesComponent implements OnInit, AfterViewInit {
  public screenWidth: any;
  public hotItems: Array<any> = [];

  public numItems: Array<number> = [];

  readonly itemsPerScreenSize = {
    mobile: 5,
    tablet: 8,
    extraLarge: 12
  };

  readonly screenWidthType = {
    mobile: 700,
    tablet: 1024
  };

  public imgHeigth: 100;

  @Input() releases: Array<Release> = [];

  @ViewChild('hottestReleaseCarousel') carousel: NgbCarousel;

  constructor(
    private elem: ElementRef,
    public activatedRoute: ActivatedRoute,
    public releasesService: ReleasesService,
  ) {  }

  ngAfterViewInit(): void {
    this.carousel.showNavigationArrows = false;
    this.carousel.showNavigationIndicators = true;
    this.setWidth();
  }

  ngOnInit() {
    this.releases = this.activatedRoute.snapshot.data.releases;
    this.screenWidth = window.innerWidth;

    this.releases.forEach(item => {
      if (item.hot) {
        this.hotItems.push({
          id: item.id,
          link: '#',
          hot: true,
          image: item.mainImage,
          slogan: item.name,
          releaseDate: item.releaseDate,
          slug: item.slug
        });
      }
    });
    // this.hotItems = this.shuffleInPlace(this.hotItems);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.setWidth();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.setWidth();
  }

  public setWidth() {
    const elements = this.elem.nativeElement.querySelectorAll('.img-hottest-release-carousel');
    console.log(elements);
    if (elements.length > 0) {
      this.imgHeigth = elements[0].width;
      console.log(this.imgHeigth);
    }
  }

  getHotPages(): number {

    let pages: number;
    if (this.screenWidth <= this.screenWidthType.mobile) {
      pages = this.hotItems.length / this.itemsPerScreenSize.mobile;
    } else if (this.screenWidth <= this.screenWidthType.tablet) {
      pages = this.hotItems.length / this.itemsPerScreenSize.tablet;
    } else {
      pages = this.hotItems.length / this.itemsPerScreenSize.extraLarge;
    }

    return Math.ceil(pages);
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
