import {Component, Input, OnInit} from '@angular/core';
import {Shop} from '../../../ms-shops/models/shops';
import * as moment from 'moment-timezone';
import {ReleaseShopOffer, ReleaseShopOfferGroup} from '../../models/releases';

@Component({
  selector: 'ms-release-page-shops',
  templateUrl: './ms-release-page-shops.component.html',
  styleUrls: ['./ms-release-page-shops.component.scss']
})
export class MsReleasePageShopsComponent implements OnInit {

  releasePage: any;

  @Input() public shops: Shop[];

  @Input() public raffleOffers: ReleaseShopOffer[];

  showRegions: boolean = false;

  hasOffers = false;

  getLog(item) {
    // console.log(JSON.stringify(item));
  }

  constructor() {
  }

  ngOnInit() {
    this.releasePage = {
      regions: [{
        region: 'Europe',
        regionShops: [],
      }, {
        region: 'USA',
        regionShops: [],
      }],
      raffles: [],
      marketplaces: []
    };
  }

  setReleasePage(releasePage: any) {
    this.releasePage = releasePage;
  }

  filterShopsAvailable(shops: Array<Shop>): Array<Shop> {
    let shopsAvailable: Array<Shop>;
    shops.forEach(shop => {
      if (shop.active) {
        shopsAvailable.push(shop);
      }
    });
    return shopsAvailable;
  }

  setRaffleOffers(raffleOffers: any) {
    if (raffleOffers && raffleOffers.length > 0) {
      this.hasOffers = true;
    }
    this.raffleOffers = raffleOffers;
    this.releasePage.raffles = this.groupByParentShop(raffleOffers);
  }

  setRegionsOffers(marketPlaces: ReleaseShopOffer[], regionShopsEurope: ReleaseShopOffer[], regionShopsUsa: ReleaseShopOffer[]) {
    if (regionShopsEurope || regionShopsUsa) {
      this.showRegions = true;
    }
    const regions = [{
      region: 'Europe',
      regionShops: regionShopsEurope,
    }, {
      region: 'USA',
      regionShops: regionShopsUsa,
    }];

    if (!regionShopsEurope || regionShopsEurope.length === 0) {
      regions.shift();
    }

    if (!regionShopsUsa || regionShopsUsa.length === 0) {
      regions.pop();
    }

    regions.sort((regionA, regionB) => {
      return regionA.regionShops[0].rank - regionB.regionShops[0].rank;
    });

    regions.forEach(region => {
      region.regionShops = this.groupByParentShop(region.regionShops);
    });

    this.releasePage.regions = regions;
    this.releasePage.marketplaces = this.groupByParentShop(marketPlaces);

    if ((regions && regions.length > 0) || (marketPlaces && marketPlaces.length > 0)) {
      this.hasOffers = true;
    }
  }

  groupByParentShop(offers: ReleaseShopOffer[]): ReleaseShopOfferGroup[] {
    const grouped: ReleaseShopOfferGroup[] = [];
    const parentDict = {};
    for (let i = 0; i < offers.length; i++) {
      const parent = offers[i].parentShop;
      if (parent) {
        if (parentDict[parent] === undefined) {
          const parentShop = this.shops.find((shop) => shop.id === parent);
          parentDict[parent] = grouped.length;
          grouped.push({
            shopName: parentShop.name,
            logo: parentShop.mainImage,
            offers: []
          });
        }
        grouped[parentDict[parent]].offers.push(offers[i]);
      } else {
        grouped.push({
          shopName: offers[i].shopName,
          logo: offers[i].logo,
          offers: [offers[i]]
        });
      }
    }
    // Groups of only one offer, will not have the parent name and logo
    grouped.forEach((group) => {
      if (group.offers.length === 1) {
        group.shopName = group.offers[0].shopName;
        group.logo = group.offers[0].logo;
      }
    });
    return grouped;
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

  getStatusClass(item) {
    const classes = {
      'Available': 'text-green',
      'Sold Out': 'text-red',
      'Coming Soon': 'text-orange',
      'On Sale' : 'text-blue',
      'Restock' : 'text-gray',
      'Restocked' : 'text-gray',
      'Live' : 'text-green',
      'Online' : 'text-green',
      'Closed' : 'text-red',
      'Raffle Live' : 'text-green',
      'Raffle Closed': 'text-red',
    };

    if (item.status in classes) {
      return classes[item.status];
    }
    return '';
  }

}
