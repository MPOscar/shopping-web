import { Component, EventEmitter, HostListener, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MsRoutingService} from '../../../../routing/services/ms-routing-service';

//import { ReleasesService } from '../../../ms-releases/services/releases.service';

@Component({
  selector: 'shops-table',
  templateUrl: './shops-table.component.html',
  styleUrls: ['./shops-table.component.scss']
})
export class ShopsTableComponent implements OnInit {

  @Input() listViewMode = false;

  @Input() disabledSort: boolean = false;

  @Input() offers: Array<any>;

  @Input() releases: Array<any>;

  @Input() shops: Array<any>;

  @Input() styles: Array<any>;

  @Input() brandId: string;

  @Output() sortByPriceEvent = new EventEmitter<any>();

  public screenWidth: any;

  public items: Array<any> = [];

  public dropdownList = [];

  actualPage: number = 1;

  itemsToShow: any;

  selectedPage: number = 0;

  page: number = 0;

  pages: number = 0;

  paginationNumber: number;

  paginationArray: Array<string> = [];

  priceSort = new FormControl();

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
    private routingService: MsRoutingService
  ) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;

    this.dropdownList = [
      { id: 1, name: 'Price High-Low' },
      { id: 2, name: 'Price Low-High' },
    ];

    let data = {
      filters: [],
    };

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

  styleHasBrand(styleId: string, brandId: string) {
    return this.styles.find(style => {
      return style.id === styleId;
    }).brand === brandId;
  }

  redrawOffers(shops: any) {
    this.items = [];
    shops.forEach(item => {
      if (item) {
        this.items.push({
          id: item.id,
          name: item.name,
          country: item.countries,
          image: item.mainImage,
          link: '#'
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
    }  else if (this.pages > 5 && (this.pages - 5) > id) {
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

        if (count <= 5 ) {
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

  changeNgSlect(event: any) {
    if (this.priceSort.value) {
      this.sortByPriceEvent.emit(this.priceSort.value.id);
    }
  }

  getRoute(name) {
    return this.routingService.getRouterName(name);
  }

  toggleViewMode() {
    this.listViewMode = !this.listViewMode;
  }
}
