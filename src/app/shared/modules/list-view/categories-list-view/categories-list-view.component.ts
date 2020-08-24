import {Component, Input, OnInit} from '@angular/core';
import {OffersService} from '../../../../moresneakers-web/modules/ms-offers/services/offers.service';

@Component({
  selector: 'ms-categories-list-view',
  templateUrl: './categories-list-view.component.html',
  styleUrls: ['./categories-list-view.component.scss']
})
export class CategoriesListViewComponent implements OnInit {

  @Input() itemsToShow: any;

  @Input() buttonText: string;

  // Show or hide Columns
  @Input() hideImageColumn = false;
  @Input() hideProductNameColumn = false;
  @Input() hideStyleCodeColumn = false;
  @Input() hideReleaseDateColumn = false;
  @Input() hidePriceColumn = false;
  @Input() hideActionsColumn = false;

  public items: Array<any> = [];

  constructor(public offersService: OffersService) {
  }

  ngOnInit() {
    this.items = this.itemsToShow;

    if (this.buttonText == null || this.buttonText === '') {
      this.buttonText = 'WHERE TO BUY';
    }
  }

  getStatusClass(item) {
    const classes = {
      'Available': 'text-green',
      'Sold Out': 'text-red',
      'Coming Soon': 'text-orange',
      'On Sale' : 'text-blue',
      'Raffle Live' : 'text-green',
      'Raffle Closed': 'text-red',
      'Restock' : 'text-gray',
      'Restocked' : 'text-gray',
    };

    if (item.status in classes) {
      return classes[item.status];
    } else {
      return classes['Coming Soon'];
    }

    return '';
  }

}
