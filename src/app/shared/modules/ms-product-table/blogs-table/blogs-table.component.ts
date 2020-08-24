import { Component, EventEmitter, HostListener, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
//
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import {MsRoutingService} from '../../../../routing/services/ms-routing-service';

// import { ReleasesService } from '../../../ms-releases/services/releases.service';

@Component({
  selector: 'blogs-table',
  templateUrl: './blogs-table.component.html',
  styleUrls: ['./blogs-table.component.scss']
})
export class BlogsTableComponent implements OnInit {

  @Input() disabledSort = false;

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

  selectedPage = 0;

  page = 0;

  pages = 0;

  paginationNumber: number;

  paginationArray: Array<string> = [];

  priceSort = new FormControl();

  readonly itemsPerScreenSize = {
    mobile: 7,
    tablet: 7,
    extraLarge: 7
  };

  readonly screenWidthType = {
    mobile: 700,
    tablet: 1024
  };

  constructor(
    public routingService: MsRoutingService
    // public releasesService: ReleasesService
  ) {
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;

    this.dropdownList = [
      { id: 1, name: 'Price High-Low' },
      { id: 2, name: 'Price Low-High' },
    ];

    const data = {
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

  redrawOffers(blogs: any) {
    this.items = [];

   /* this.items.push({
      id: 'shtrtrherhethr',
      title: 'Nike Air Force 1 "Just do it"',
      date: '08/10/2018',
      author: 'Michael Douglas',
      resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna' +
        ' aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
        'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat' +
        ' non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'assets/images/images-server/imgr0e6qwjqpfhisz.jpg',
      link: '#',
      type: 'article'
    });

    this.items.push({
      id: 'shtrtrherhethr',
      title: 'Nike Air Force 1 "Just do it"',
      date: '08/10/2018',
      author: 'Michael Douglas',
      resume: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna' +
        ' aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
        'irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat' +
        ' non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'assets/images/images-server/imgr0e6qwjqpfhisz.jpg',
      link: '#',
      type: 'focus'
    });*/

    blogs.forEach(element => {
      this.items.push({
        id: element.id,
        title: element.title,
        date: moment(element.createdAt).format('MMMM Do, YYYY'),
        author: element.author,
        resume: element.body,
        image: element.imgUrl,
        link: '#',
        type: element.type
      });
    });

    this.pages = this.getPages();
    // this.itemsToShow = this.getItems(0);
    this.itemsToShow = this.items;
    this.buildPaginationArray(1);
  }

  buildPaginationArray(id: number) {
    let count = 1;
    this.paginationArray = [];

    if (this.pages <= 5) {
      for (let i = 1; i <= this.pages; i++) {
        this.paginationArray = [...this.paginationArray, i.toString()];
      }
    }

    else if (this.pages > 5 && (this.pages - 5) > id) {
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
    }

    else if (this.pages > 5 && (this.pages - 5) <= id) {
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

  getSlugFromBlog(item) {
    return this.routingService.getRouterName(item.title);
  }
}
