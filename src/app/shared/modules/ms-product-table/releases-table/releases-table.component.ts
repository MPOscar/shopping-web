import { Component, EventEmitter, HostListener, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Shop } from 'src/app/moresneakers-web/modules/ms-shops/models/shops';
import { Release } from 'src/app/moresneakers-web/modules/ms-releases/models/releases';
import { Style } from 'src/app/moresneakers-web/modules/ms-style/models/style';


@Component({
  selector: 'releases-table',
  templateUrl: './releases-table.component.html',
  styleUrls: ['./releases-table.component.scss']
})
export class ReleasesTableComponent implements OnInit, OnDestroy {

  @Input() listViewMode = false;

  @Input() brands: Array<any>;

  @Input() itemsPerRow = 0;

  @Input() disabledSort = false;

  @Input() releases: Array<Release>;

  @Input() shops: Array<Shop>;

  @Input() styles: Array<Style>;

  @Input() brandId: string;

  @Input() sortId: number;

  @Input() categoryPage = false;

  @Output() sortByPriceEvent = new EventEmitter<any>();

  @Input() showPrice = true;

  @Input() buttonText: string;

  public screenWidth: any;

  public items: Array<any> = [];

  public dropdownList = [];

  actualPage = 1;

  currentSort = 4;

  itemsToShow: any;

  selectedPage = 0;

  page = 0;

  pages = 0;

  paginationNumber: number;

  paginationArray: Array<string> = [];

  priceSort: FormControl;

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
    // public releasesService: ReleasesService
  ) {
  }

  getSortById(id) {
    return this.dropdownList.find(dr => dr.id === id);
  }

  ngOnInit() {
    this.dropdownList = [
      { id: 3, name: 'Hottest' },
      { id: 6, name: 'Latest added' },
      { id: 4, name: 'Latest updated' },
      { id: 5, name: 'Release date' },
      { id: 1, name: 'Price High-Low' },
      { id: 2, name: 'Price Low-High' },
    ];

    if (this.sortId !== undefined) {
      this.currentSort = this.sortId;
    }

    this.priceSort = new FormControl(this.getSortById(this.currentSort));

    if (this.buttonText == null || this.buttonText === '') {
      this.buttonText = 'WHERE TO BUY';
    }

    this.screenWidth = window.innerWidth;

    const data = {
      filters: [],
    };

    this.sortByPriceEvent.emit(this.currentSort);

    const subValueChanges = this.priceSort.valueChanges.subscribe(chan => {
      this.currentSort = chan ? chan.id : 0;
      this.sortByPriceEvent.emit(this.currentSort);
    });

    this.subscriptions.push(subValueChanges);

  }

  ngOnDestroy () {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  toggleViewMode() {
    this.listViewMode = !this.listViewMode;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.paginationNumber = this.getPages();
  }

  getPages(): number {
    let pages = 0;
    if (this.screenWidth <= this.screenWidthType.mobile) {
      pages = Math.ceil(this.items.length / this.itemsPerScreenSize.mobile);
    } else if (this.screenWidth <= this.screenWidthType.tablet) {
      pages = Math.ceil(this.items.length / this.itemsPerScreenSize.tablet);
    } else {
      pages = Math.ceil(this.items.length / this.itemsPerScreenSize.extraLarge);
    }

    return pages;
  }

  changeSort(sortId) {
    this.currentSort = sortId;
    this.priceSort.setValue(this.getSortById(sortId));
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

  styleHasBrand(styleId: string, brandId: string) {
    if (styleId) {
      return this.styles.find(style => {
        return style.id === styleId;
      }).brand === brandId;
    }
  }

  redrawOffers(releases: any, filter = true) {
    if (filter && this.brandId) {
      releases = releases.filter(item => {
        return this.styleHasBrand(item.styleId, this.brandId);
      });
    }
    this.items = [];
    releases.forEach(releaseItem => {

      const style = this.styles.find(styleItem => {
        return styleItem.id === releaseItem.styleId;
      });

      let brand;

      if (style) {
        brand = this.brands.find(item => {
          return style.brand === item.id;
        });
      }

      if (!brand) {
        brand = {
          imgUrl: ''
        };
      }

      this.items.push({
        id: releaseItem.id,
        name: releaseItem.name,
        slug: releaseItem.slug,
        store: '',
        styleCode: releaseItem.sku,
        status: this.getStatusText(releaseItem),
        hot: releaseItem.hot,
        image: releaseItem.mainImage,
        priceEUR: releaseItem.priceEUR,
        priceUSD: releaseItem.priceUSD,
        priceGBP: releaseItem.priceGBP,
        brandLogo: brand.imgUrl,
        releaseDate: releaseItem.releaseDate
      });
    });
    this.pages = this.getPages();
    //  this.items = this.shuffleInPlace(this.items);
    //  this.itemsToShow = this.items
    this.itemsToShow = this.getItems(0);
    this.buildPaginationArray(1);
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
    if (parseInt(pageNumber) >= 1 && parseInt(pageNumber) <= this.pages) {
      this.actualPage = parseInt(pageNumber);
      this.itemsToShow = this.getItems(this.actualPage - 1);
      this.buildPaginationArray(this.actualPage);
    }
  }

  // changeNgSlect(event: any) {
  //   if (this.priceSort.value) {
  //     this.sortByPriceEvent.emit(this.priceSort.value.id);
  //   }
  // }

  getStatusText(item) {
    switch (item.status) {
      case 'available': {
        return 'Available';
      }
      case 'coming_soon': {
        return 'Coming Soon';
      }
      case 'on_sale': {
        return 'On Sale';
      }

      case 'sold_out': {
        return 'Sold Out';
      }

      case 'live': {
        return 'Raffle Live';
      }

      case 'restock': {
        return 'Restocked';
      }

      case 'closed': {
        return 'Raffle Closed';
      }

      default: {
        return 'Coming Soon';
      }
    }
  }

  getStatusClass(item) {
    const classes = {
      'Available': 'text-green',
      'Sold Out': 'text-red',
      'Coming Soon': 'text-orange',
      'On Sale' : 'text-blue',
      'Restock' : 'text-gray',
      'Restocked' : 'text-gray',
      'Raffle Live' : 'text-green',
      'Raffle Closed': 'text-red',
    };

    if (item.status in classes) {
      return classes[item.status];
    } else {
      return classes['Coming Soon'];
    }

  }

}
