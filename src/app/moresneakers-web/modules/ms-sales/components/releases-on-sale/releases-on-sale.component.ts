import { Component, HostListener, OnInit, Input } from '@angular/core';
import { ReleasesService } from '../../../ms-releases/services/releases.service';

@Component({
  selector: 'releases-on-sale',
  templateUrl: './releases-on-sale.component.html',
  styleUrls: ['./releases-on-sale.component.scss']
})
export class ReleasesOnSaleComponent implements OnInit {

  @Input() offers: Array<any>;

  @Input() releases: Array<any>;

  @Input() shops: Array<any>;

  @Input() buttonText: string;

  public screenWidth: any;

  public items: Array<any> = [];

  public dropdownList = [];

  actualPage: number;

  itemsToShow: any;

  page: number = 0;

  paginationNumber: number;

  selectedPage: number = 0;

  paginationArray: Array<string> = ['1', '2', '3', '4', '5', '...', '17'];

  readonly itemsPerScreenSize = {
    mobile: 4,
    tablet: 12,
    extraLarge: 16
  };

  readonly screenWidthType = {
    mobile: 700,
    tablet: 1024
  };

  constructor(public releasesService: ReleasesService) { }

  ngOnInit() {
    if (this.buttonText == null || this.buttonText === '') {
      this.buttonText = 'WHERE TO BUY';
    }

    this.screenWidth = window.innerWidth;

    this.dropdownList = [
      { id: 1, name: 'Price High-Low' },
      { id: 2, name: 'Price Low-High' },
    ];

    let data = {
      filters: [],
    }

    this.releasesService.postReleasesCalendar(data).subscribe(response => {
      this.releases = response.data;

      this.releases.forEach(item => {
        let offerRelease = this.offers.find(offer => {
          return item.id === offer.releaseId;
        });

        if (offerRelease) {
          let store = this.shops.find(shop => {
            return offerRelease.shopId === shop.id;
          });

          this.items.push({
            name: item.name,
            store: store.name,
            styleCode: item.sku,
            status: offerRelease.status,
            hot: item.hot,
            image: item.mainImage,
            priceEUR: item.priceEUR,
            link: '#'
          });

        } else {
          this.items.push({
            name: item.name,
            store: '',
            styleCode: item.sku,
            status: '',
            hot: item.hot,
            image: item.mainImage,
            priceEUR: item.priceEUR,
            link: '#'
          });
        }


      });

      this.items = this.shuffleInPlace(this.items);
      this.itemsToShow = this.items
      this.getItems(0);
      this.paginationNumber = this.getPages();
      this.actualPage = 1;
      this.getPaginationArray();

    });

    /*for (let i = 0; i < 100; ++i) {
      this.items.push({
        name: 'Air Jordan Retro NRG Raptor',
        store: 'Nike Europe Store',
        styleCode: item.sku,
        status: 'available',
        hot: true,
        image: 'assets/images/moc-images/product-table/sneaker1.svg',
        priceEUR: '139.90',
        link: '#'
      });

      this.items.push({
        name: 'Air Jordan Retro NRG Raptor Raptor Raptor Raptor Raptor Raptor',
        store: 'Nike Europe Store',
        styleCode: item.sku,
        status: 'available',
        hot: false,
        image: 'assets/images/moc-images/product-table/sneaker2.svg',
        priceEUR: '139.90',
        link: '#'
      });

      this.items.push({
        name: 'Air Jordan Retro NRG Raptor',
        store: 'Nike Europe Store',
        styleCode: item.sku,
        status: 'available',
        hot: true,
        image: 'assets/images/moc-images/product-table/sneaker3.svg',
        priceEUR: '139.90',
        link: '#'
      });

      this.items.push({
        name: 'Air Jordan Retro NRG Raptor',
        store: 'Nike Europe Store',
        styleCode: item.sku,
        status: 'available',
        hot: false,
        image: 'assets/images/moc-images/product-table/sneaker4.svg',
        priceEUR: '139.90',
        link: '#'
      });

    }*/



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

    this.itemsToShow = this.items.slice(firstItem, lastItem);
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

  redrawOffers(releases: any) {
    this.items = [];
    releases.forEach(item => {
      let offerRelease = this.offers.find(offer => {
        return item.id === offer.releaseId;
      });

      if (offerRelease) {
        let store = this.shops.find(shop => {
          return offerRelease.shopId === shop.id;
        });

        this.items.push({
          name: item.name,
          store: store.name,
          styleCode: item.sku,
          status: offerRelease.status,
          hot: item.hot,
          image: item.mainImage,
          priceEUR: item.priceEUR,
          link: '#'
        });
      } else {
        this.items.push({
          name: item.name,
          store: '',
          styleCode: item.sku,
          status: '',
          hot: item.hot,
          image: item.mainImage,
          priceEUR: item.priceEUR,
          link: '#'
        });
      }
    });
    this.items = this.shuffleInPlace(this.items);
    this.itemsToShow = this.items
  }

  buildPaginationArray(id: number) {

    if (this.paginationNumber - id > 4) {
      let count = 0;
      this.paginationArray = [];
      for (let i = id; i <= this.paginationNumber; i++) {

        if (i === this.paginationNumber) {
          this.paginationArray = [...this.paginationArray, this.paginationNumber.toString()];
          break;
        }

        if (count < 5) {
          this.paginationArray = [...this.paginationArray, (i).toString()];
        }

        count++;
        if (this.paginationNumber - id > 5) {
          if (i + 1 === this.paginationNumber - 1) {
            this.paginationArray = [...this.paginationArray, '...'];
          }
        }
      }
    }
  }

  getPaginationArray() {
    let count = 0;
    this.paginationArray = [];

    for (let i = 0; i < this.paginationNumber; i++) {
      if (i + 1 === this.paginationNumber) {
        this.paginationArray = [...this.paginationArray, this.paginationNumber.toString()];
        break;
      }

      if (count < 5) {
        this.paginationArray = [...this.paginationArray, (i + 1).toString()];
      }
      count++;

      if (this.paginationNumber > 6) {
        if (i + 1 === this.paginationNumber - 1) {
          this.paginationArray = [...this.paginationArray, '...'];
        }
      }
    }
  }

  changePage(pageNumber: string) {
    if (parseInt(pageNumber) >= 1 && parseInt(pageNumber) <= this.paginationNumber) {
      this.actualPage = parseInt(pageNumber);
      this.getItems(this.actualPage - 1);
      this.buildPaginationArray(this.actualPage);
    }
  }
}
