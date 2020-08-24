import { Component, Input, OnInit } from '@angular/core';
import { OffersService } from '../../../../moresneakers-web/modules/ms-offers/services/offers.service';
import {Offer} from '../../../../moresneakers-web/modules/ms-offers/models/offer';

@Component({
  selector: 'offers-list-view',
  templateUrl: './offers-list-view.component.html',
  styleUrls: ['./offers-list-view.component.scss']
})
export class OffersListViewComponent implements OnInit {

  @Input() showStatus = true;

  @Input() itemsToShow: any;

  @Input() buttonText: string;

  public items: Array<any> = [];

  constructor(public offersService: OffersService) {
  }

  ngOnInit() {
    this.items = this.itemsToShow;

    if (this.buttonText == null || this.buttonText === '') {
      this.buttonText = 'WHERE TO BUY';
    }
  }

  getImageStore(store) {
    if (!store) {
      return '';
    }
    return store.smallImage || store.mainImage;
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

  hasPrice(offer) {
    return offer.priceEUR !== undefined || offer.priceUSD !== undefined || offer.priceGBP !== undefined;
  }

}
