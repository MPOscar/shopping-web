import { AfterViewInit, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//
import { ReleasesService } from '../../../ms-releases/services/releases.service';
//
import { Brand } from '../../../ms-brands/models/brand';
import { Category } from '../../../ms-categories/models/category';
import { Shop } from '../../../ms-shops/models/shops';
import { Style } from '../../../ms-style/models/style';

import * as moment from 'moment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ms-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnInit, OnDestroy {

  public comingItems: Array<any> = [];

  public AllMonthItemsByDay: Array<any> = [];

  public AllMonthItemsByWeeks: Array<any> = [];

  @Input() categories: Array<Category>;

  @Input() shops: Array<Shop>;

  @Input() styles: Array<Style>;

  @Input() brands: Array<Brand>;

  listViewMode = false;

  cardHover: Array<boolean> = [];

  count: any;

  date: any;

  dropdownList = [];

  dropdownSettings = {};

  items: any;

  fromDate: any;

  toDate: any;

  lastDay: any;

  lastDayS: any[] = [];

  month: any;

  monthD: any;

  monthNumber: any;

  monthView = true;

  typeOfView = 'Month';

  montViewControl = new FormControl();

  releaseSelectedDate: Date;

  selectedReleaseId: string;

  selectedItems = [];

  selectedValue: any;

  year: any;

  weekRange: Array<any>;

  subscriptions: Subscription[] = [];

  constructor(public releasesService: ReleasesService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngAfterViewInit() {
  }

  // -------------------------------------------
  sameMonth(a, b, other) {
    if (a.month() !== b.month()) {
      return other;
    }
    return a.date();
  }

  getRangeOfWeeks() {
    const m = this.date;
    const lastOfMonth = m.clone().endOf('month'),
      lastOfMonthDate = lastOfMonth.date(),
      firstOfMonth = m.clone().startOf('month'),
      currentWeek = firstOfMonth.clone().day(0),
      output = [];
    let startOfWeek,
      endOfWeek;

    while (currentWeek < lastOfMonth) {
      startOfWeek = this.sameMonth(currentWeek.clone().day(0), firstOfMonth, 1);
      endOfWeek = this.sameMonth(currentWeek.clone().day(6), firstOfMonth, lastOfMonthDate);

      output.push(
        {
          'startOfWeek': startOfWeek,
          'endOfWeek': endOfWeek
        });
      currentWeek.add('d', 7);
    }

    return output;
  }
  // -------------------------------------------
  ngOnInit() {

    this.selectedReleaseId = this.activatedRoute.snapshot.queryParams.releaseId;

    this.releaseSelectedDate = this.activatedRoute.snapshot.queryParams.releaseDate;

    if (this.selectedReleaseId) {
      this.date = moment(this.releaseSelectedDate);
    } else {
      this.date = moment();
    }

    this.month = this.date.format('MMM');
    this.monthD = this.date.format('MM');
    this.monthNumber = this.date.format('M');
    this.year = this.date.format('YYYY');
    this.lastDay = this.date.endOf('month').format('DD');

    this.fromDate = this.date.startOf('month');
    this.toDate = this.date.endOf('month');

    this.dropdownList = [
      { id: 1, name: 'Month' },
      { id: 2, name: 'Week' },
    ];

    this.selectedValue = { id: 1, name: 'Month' };

    this.montViewControl.setValue('Month');
    // --------------------------------------------
    this.weekRange = this.getRangeOfWeeks();
    // --------------------------------------------

    const subGetAllReleases = this.releasesService.getAllReleases().subscribe(response => {
      this.comingItems = response;
      this.changeDateByDays();
      this.changeDateByWeeks(this.weekRange);
    });

    this.subscriptions.push(subGetAllReleases);

    for (const item of this.comingItems) {
      this.cardHover.push(false);
    }
  }


  getDayToItem(item: any) {
    const day = item.releaseDate.slice(8, 10);
    return day[0] === '0' ? day[1] : day;
  }

  changeDateByDays() {
    if (this.comingItems) {
      if (this.comingItems.length > 0) {
        for (let i = 0; i < this.lastDay; i++) {
          const items = this.comingItems.filter(item => {
            const releaseDate = moment(item.releaseDate).format('YYYY-M');
            const day = i + 1;
            if (item.releaseDate) {
              return moment(item.releaseDate).format('YYYY-M-DD') ===
                moment(this.year + '-' + this.monthNumber + '-' + day).format('YYYY-M-DD');
            }
          });
          this.AllMonthItemsByDay[i] = items;

        }
      } else {
        this.AllMonthItemsByDay = [];
      }
    } else {
      this.AllMonthItemsByDay = [];
    }
  }

  changeDateByWeeks(weeksRange: Array<any>) {
    if (this.comingItems) {

      if (this.comingItems.length > 0) {

        const numberOfWeeks = weeksRange.length;

        for (let i = 0; i < numberOfWeeks; i++) {

          const startOfWeek = moment(this.year + '-' + this.monthNumber + '-' + weeksRange[i].startOfWeek).format('YYYY-MM-DD');

          const endOfWeek = moment(this.year + '-' + this.monthNumber + '-' + weeksRange[i].endOfWeek).format('YYYY-MM-DD');

          const items = this.comingItems.filter(item => {
            if (item.releaseDate) {
              const releaseDate = moment(item.releaseDate).format('YYYY-MM-DD');
              return (releaseDate >= startOfWeek) && (releaseDate <= endOfWeek);
            }
          });
          this.AllMonthItemsByWeeks[i] = items;

        }
      } else {
        this.AllMonthItemsByWeeks = [];
      }
    } else {
      this.AllMonthItemsByWeeks = [];
    }

  }

  changeMonth(number: any) {

    this.date = this.date.add(number, 'M');

    this.month = this.date.format('MMM');

    this.monthD = this.date.format('MM');

    this.monthNumber = this.date.format('M');

    this.year = this.date.format('YYYY');

    this.lastDay = this.date.endOf('month').format('DD');

    this.changeDateByDays();

    this.weekRange = this.getRangeOfWeeks();
    this.changeDateByWeeks(this.weekRange);
  }

  changeNgSlect(event: any) {
    if (this.montViewControl.value) {
      if (this.montViewControl.value.name === 'Month') {
        this.monthView = true;
      } else if (this.montViewControl.value.name === 'Week') {
        this.monthView = false;
      }
    }
  }

  getDay(day: any) {
    const days = moment(this.year + '-' + this.monthD + '-' + (day + 1)).format('dddd');
    return moment(this.year + '-' + this.monthD + '-' + (day + 1)).format('dddd');
  }

  getItemsOfDay(day: any) {
    if (this.comingItems) {
      if (this.comingItems.length > 0) {
        return this.comingItems.filter(item => {
          const releaseDate = moment(item.releaseDate).format('YYYY-MM');
          return moment(item.releaseDate).format('YYYY-MM') === '2019-02-01';
        });
      }
    }

  }

  getBrandImage(styleId: string) {
    if (styleId) {
      const id = this.styles.find(item => {
        return item.id === styleId;
      }).brand;

      return this.brands.find(item => {
        return item.id === id;
      }).imgUrl;
    }
    return '';
  }

  filter(filters: any) {
    this.comingItems = [];
    this.lastDayS = [];
    delete filters.shopId;
    // delete filters.category;
    let data: any;
    data = {
      'filter': filters
    };

    const subPostReleasesCalendar = this.releasesService.postReleasesCalendar(data).subscribe(response => {
      this.comingItems = response.data;
      this.count = response.dataCount;
      this.changeDateByDays();
    });
    this.subscriptions.push(subPostReleasesCalendar);
  }

  getDayToShow(array: any[]) {
    if (array) {
      if (array.length > 0) {
        return true;
      }
      return false;
    }
  }

  getStatusClass(item) {
    const classes = {
      'available': 'text-green',
      'sold_out': 'text-red',
      'coming_soon': 'text-orange',
      'on_sale': 'text-blue',
      'restock': 'text-gray',
      'live' : 'text-green',
      'closed': 'text-red',
    };

    if (item.status in classes) {
      return classes[item.status];
    }

    return '';
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

  public mouseEnter(index: number) {
    this.cardHover[index] = true;
  }

  public mouseLeave(index: number) {
    this.cardHover[index] = false;
  }

  public buttonBgColor(index: number): string {
    return this.cardHover[index] ? 'black' : 'transparent';
  }

  public textColor(index: number): string {
    return this.cardHover[index] ? 'white' : 'black';
  }

  public bodyBgColor(index: number): string {
    return this.cardHover[index] ? 'rgb(245, 245, 245)' : 'rgb(255, 255, 255)';
  }

  public getKey(obj: any): number {
    return this.comingItems.indexOf(obj);
  }

  toggleViewMode() {
    this.listViewMode = !this.listViewMode;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
