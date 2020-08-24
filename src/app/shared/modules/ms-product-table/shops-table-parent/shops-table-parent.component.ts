import { Component, EventEmitter, HostListener, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Shop } from 'src/app/moresneakers-web/modules/ms-shops/models/shops';
import { Router } from '@angular/router';
import {MsRoutingService} from '../../../../routing/services/ms-routing-service';



@Component({
  selector: 'shops-table-parent',
  templateUrl: './shops-table-parent.component.html',
  styleUrls: ['./shops-table-parent.component.scss']
})
export class ShopsTableParentComponent implements OnInit, OnDestroy {

  @Input() listViewMode = true;

  @Input() itemsPerRow = 0;

  @Input() disabledSort = true;

  @Input() shops: Array<Shop>;

  @Input() parentId: string;

  // @Output() sortByPriceEvent = new EventEmitter<any>();

  @Input() buttonText: string;

  public screenWidth: any;

  public items: Array<Shop> = [];

  public dropdownList = [];

  actualPage = 1;

  itemsToShow: Array<Shop> = [];

  selectedPage = 0;

  page = 0;

  pages = 0;

  paginationNumber: number;

  paginationArray: Array<string> = [];

  // typeSort = new FormControl();

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

  constructor ( private router: Router,
                private routingService: MsRoutingService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    if (this.buttonText == null || this.buttonText === '') {
      this.buttonText = 'SHOP DETAILS';
    }

    this.screenWidth = window.innerWidth;

    this.redrawShops();
  }

  ngOnDestroy() {
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

  redrawShops() {
    this.shops.forEach(shop => {
      if (shop.parent === this.parentId && shop.active) {
        this.items.push({
          id: shop.id,
          name: shop.name,
          mainImage: shop.mainImage,
          lat: shop.lat,
          lon: shop.lon,
          type: shop.type,
          active: shop.active,
          country: shop.country
        });
      }
    });

    this.pages = this.getPages();
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

  getRoute(name) {
    return this.routingService.getRouterName(name);
  }

}
