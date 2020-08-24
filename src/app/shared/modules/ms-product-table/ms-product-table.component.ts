import { Component, EventEmitter, HostListener, OnInit, Output, Input } from '@angular/core';
import { ValidationErrors, FormControl } from '@angular/forms';
//
import { GoogleAnalyticsService } from '../../../google-analythics/services/google-analytics.service';
//
import { OffersService } from '../../../moresneakers-web/modules/ms-offers/services/offers.service';
import {Subscription} from 'rxjs';
import {MsSeoService} from '../../services/ms-seo.service';
import {Offer} from '../../../moresneakers-web/modules/ms-offers/models/offer';

@Component({
  selector: 'ms-product-table',
  templateUrl: './ms-product-table.component.html',
  styleUrls: ['./ms-product-table.component.scss']
})
export class MsProductTableComponent implements OnInit {

  @Input() sortId: number;

  @Input() listViewMode;

  @Input() brands: Array<any>;

  @Input() offers: Array<any>;

  @Input() releases: Array<any>;

  @Input() shops: Array<any>;

  @Input() styles: Array<any>;

  @Output() sortByPriceEvent = new EventEmitter<any>();

  @Input() showStatus = true;

  @Input() showStore = true;

  @Input() buttonText: string;

  public screenWidth: any;

  public items: Array<any> = [];

  public dropdownList = [];

  actualPage = 1;

  itemsToShow: any;

  page = 0;

  pages = 0;

  paginationNumber: number;

  selectedPage = 0;

  paginationArray: Array<string> = [];

  priceSort = new FormControl();

  currentSort = 4;

  subscriptions: Subscription[] = [];

  readonly itemsPerScreenSize = {
    mobile: 4,
    tablet: 12,
    extraLarge: 16
  };

  readonly screenWidthType = {
    mobile: 700,
    tablet: 1024
  };

  constructor(
    public googleAnalyticsService: GoogleAnalyticsService,
    public offersService: OffersService) {
  }

  ngOnInit() {
    if (this.buttonText == null || this.buttonText === '') {
      this.buttonText = 'WHERE TO BUY';
    }

    this.screenWidth = window.innerWidth;

    this.dropdownList = [
      { id: 3, name: 'Hottest' },
      { id: 4, name: 'Latest updated' },
      { id: 1, name: 'Price High-Low' },
      { id: 2, name: 'Price Low-High' },
    ];

    if (this.offers) {
      this.offers.forEach(offerItem => {
        const releaseOffer = this.releases.find(release => {
          return offerItem.releaseId === release.id;
        });

        const store = this.shops.find(shop => {
          return offerItem.shopId === shop.id;
        });

        let cur = store.currency;
        if (offerItem['price' + cur] === undefined) {
          cur = this.displayCurrency(offerItem);
        }

        const price = offerItem['price' + cur];
        const salePercentage = offerItem.salePercentage;

        let priceAfterDiscount: number;

        if (!salePercentage || salePercentage === 0) {
          priceAfterDiscount = -1;
        } else {
          priceAfterDiscount = price - (salePercentage * price / 100);
        }

        const item = {
          name: releaseOffer ? releaseOffer.name : '',
          store: store,
          styleCode: releaseOffer.sku,
          status: offerItem.status,
          hot: releaseOffer ? releaseOffer.hot : false,
          image: releaseOffer ? releaseOffer.mainImage : '',
          priceAfterDiscount: priceAfterDiscount,
          brandLogo: 'assets/images/images-server/imgr0eccljqiblo0z.jpg',
          links: this.prepareLinks(offerItem.links),
        };
        item['price' + cur] = price;
        this.items.push(item);
      });
    }

    this.items = this.shuffleInPlace(this.items);
    this.itemsToShow = this.items;
    this.getItems(0);
    this.paginationNumber = this.getPages();
    this.actualPage = 1;
    this.getPaginationArray();

    if (this.sortId !== undefined) {
      this.currentSort = this.sortId;
    }

    // Emit the sort event to have initial list sorted
    this.sortByPriceEvent.emit(this.currentSort);

    this.priceSort = new FormControl(this.getSortById(this.currentSort));
    const subValueChanges = this.priceSort.valueChanges.subscribe(chan => {
      this.currentSort = chan ? chan.id : 0;
      this.sortByPriceEvent.emit(this.currentSort);
    });

    this.subscriptions.push(subValueChanges);
  }

  getSortById(id) {
    return this.dropdownList.find(dr => dr.id === id);
  }

  prepareLinks(links) {
    return links.map(link => {
      if (link.trackedUrl && !link.trackedUrl.startsWith('http')) {
        link.trackedUrl = 'http://' + link.trackedUrl;
      }
      return link;
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.paginationNumber = this.getPages();
  }

  getPages(): number {
    if (this.screenWidth <= this.screenWidthType.mobile) {
      return Math.ceil(this.items.length / this.itemsPerScreenSize.mobile);
    } else if (this.screenWidth <= this.screenWidthType.tablet) {
      return Math.ceil(this.items.length / this.itemsPerScreenSize.tablet);
    } else {
      return Math.ceil(this.items.length / this.itemsPerScreenSize.extraLarge);
    }

    return 0;
  }

  getPagesList(): Array<number> {
    const N = this.getPages();
    return Array.apply(null, { length: N }).map(Number.call, Number);
  }

  getItems(page: number) {
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

    return this.items.slice(firstItem, lastItem);
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

  redrawOffers(offers: any) {
    this.items = [];
    offers.forEach(offerItem => {
      const releaseOffer = this.releases.find(release => {
        return offerItem.releaseId === release.id;
      });

      const store = this.shops.find(shop => {
        return offerItem.shopId === shop.id;
      });

      const style = this.styles.find(styleItem => {
        return releaseOffer.styleId === styleItem.id;
      });

      const brand = this.brands.find(item => {
        return style.brand === item.id;
      });

      let cur = store.currency;
      if (offerItem['price' + cur] === undefined) {
        cur = this.displayCurrency(offerItem);
      }

      const price = offerItem['price' + cur];
      const salePercentage = offerItem.salePercentage;

      let priceAfterDiscount: number;

      if (!salePercentage || salePercentage === 0) {
        priceAfterDiscount = -1;
      } else {
        priceAfterDiscount = price - (salePercentage * price / 100);
      }

      const item = {
        name: releaseOffer ? releaseOffer.name : '',
        store: store,
        styleCode: releaseOffer.sku,
        status: offerItem.status,
        hot: releaseOffer ? releaseOffer.hot : false,
        image: releaseOffer ? releaseOffer.mainImage : '',
        slug: releaseOffer ? releaseOffer.slug : '',
        priceAfterDiscount: priceAfterDiscount,
        brandLogo: brand ? brand.imgUrl : '',
        links: this.prepareLinks(offerItem.links)
      };
      item['price' + cur] = price;
      this.items.push(item);
    });

    this.pages = this.getPages();
    this.itemsToShow = this.getItems(0);
    this.buildPaginationArray(1);
  }

  hasPrice(offer) {
    return offer.priceEUR !== undefined || offer.priceUSD !== undefined || offer.priceGBP !== undefined;
  }

  toggleViewMode() {
    this.listViewMode = !this.listViewMode;
  }

  buildPaginationArray(id: number) {
    let count = 1;
    this.paginationArray = [];

    if (this.pages <= 5) {
      for (let i = 1; i <= this.pages; i++) {
        this.paginationArray = [...this.paginationArray, i.toString()];
      }
    } else if (this.pages > 5 && (this.pages - 5) > id) {
      for (let i = id; i <= this.pages; i++) {
        if (i === this.pages) {
          this.paginationArray = [...this.paginationArray, i.toString()];
          break;
        }

        if (count <= 5) {
          this.paginationArray = [...this.paginationArray, i.toString()];
        }

        count++;
        if (this.pages - id > 5) {
          if (i + 1 === this.pages - 1) {
            this.paginationArray = [...this.paginationArray, '...'];
          }
        }
      }
    } else if (this.pages > 5 && (this.pages - 5) <= id) {
      for (let i = this.pages - 5; i <= this.pages; i++) {
        if (i === this.pages) {
          this.paginationArray = [...this.paginationArray, i.toString()];
          break;
        }

        if (count === 2) {
          this.paginationArray = [...this.paginationArray, '...'];
        }

        if (count <= 5) {
          this.paginationArray = [...this.paginationArray, i.toString()];
        }

        count++;
      }
    }
  }

  getPaginationArray() {
    let count = 0;
    this.paginationArray = [];

    for (let i = 0; i < this.pages; i++) {
      if (i + 1 === this.pages) {
        this.paginationArray = [...this.paginationArray, this.pages.toString()];
        break;
      }

      if (count < 5) {
        this.paginationArray = [...this.paginationArray, (i + 1).toString()];
      }
      count++;

      if (this.pages > 6) {
        if (i + 1 === this.pages - 1) {
          this.paginationArray = [...this.paginationArray, '...'];
        }
      }
    }
  }

  changePage(pageNumber: string) {
    if ( parseInt(pageNumber) >= 1 && parseInt(pageNumber) <= this.pages) {
      this.actualPage = parseInt(pageNumber);
      this.itemsToShow = this.getItems(this.actualPage - 1);
      this.buildPaginationArray(this.actualPage);
    }
  }

  changeNgSlect(event: any) {
    if (this.priceSort.value) {
      this.sortByPriceEvent.emit(this.priceSort.value.id);
    }
  }

  SendOfferTrakedLinkEvent() {
    this.googleAnalyticsService.eventEmitter('offerTrakedLink', 'offerTrakedLink', 'userLabel', 1);
  }

  getStatusText(item) {
    switch (item.status) {
      case 'available': {
        return 'Available';
      }

      case 'on_sale': {
        return 'On Sale';
      }

      case 'restock': {
        return 'Restocked';
      }

      case 'sold_out': {
        return 'Sold Out';
      }

      case 'coming_soon': {
        return 'Coming Soon';
      }

      case 'live': {
        return 'Raffle Live';
      }

      case 'closed': {
        return 'Raffle Closed';
      }

      default: {
        return '';
      }

    }
  }

  getStatusClass(item) {
    const classes = {
      'available': 'text-green',
      'sold_out': 'text-red',
      'coming_soon': 'text-orange',
      'on_sale' : 'text-blue',
      'restock' : 'text-gray',
      'live' : 'text-green',
      'closed' : 'text-red'
    };

    if (item.status in classes) {
      return classes[item.status];
    }

    return '';
  }

  displayCurrency(item) {
    if (item.priceEUR !== undefined) {
      return 'EUR';
    }
    if (item.priceUSD !== undefined) {
      return 'USD';
    }
    return 'GBP';
  }

  currencySymbol (item) {
    const currency = this.displayCurrency(item);
    if (currency === 'EUR') {
      return '€';
    }
    if (currency === 'USD') {
      return '$';
    }
    return '‎£';
  }

}
