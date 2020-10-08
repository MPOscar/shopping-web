import {AfterViewInit, Component, Inject, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ReleasesService} from '../../services/releases.service';
import {ErrorHandlingService} from '../../../../../error-handling/services/error-handling.service';
import {HandledError} from '../../../../../error-handling/models/handled-error';
import {DOCUMENT} from '@angular/platform-browser';
//
import * as moment from 'moment';
import {Observable, of, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
//
import {MsReleasePageDetailsComponent} from '../ms-release-page-details/ms-release-page-details.component';
import {Brand} from '../../../ms-brands/models/brand';
import {Category} from '../../../ms-categories/models/category';
import {Collection} from '../../../ms-collections/models/collection';
import {Shop} from '../../../ms-shops/models/shops';
import {Style} from '../../../ms-style/models/style';
import {OffersService} from '../../../ms-offers/services/offers.service';
import {MsReleasePageShopsComponent} from '../ms-release-page-shops/ms-release-page-shops.component';

import {NgbCarousel, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

const errorKey = 'Error';

@Component({
  selector: 'ms-release-page',
  templateUrl: './ms-release-page.component.html',
  styleUrls: ['./ms-release-page.component.scss']
})
export class MsReleasePageComponent implements AfterViewInit, OnInit, OnDestroy {

  brandName: string;

  brand: Brand;

  brands: Array<Brand>;

  category: Category;

  categories: Array<Category>;

  collection: Collection;

  collections: Array<Collection>;

  collectionName: string;

  europeOffers: Array<any> = [];

  galleryFlag = false;

  loadFlag = false;

  marketPlaces: Array<any> = [];

  regionShopsEurope: Array<any> = [];

  regionShopsUsa: Array<any> = [];

  release: any;

  releasePage: any;

  releaseId: string;

  releasesBySlug: string;

  releaseImages: Array<any> = [];

  releaseName = '';

  raffleOffers: Array<any> = [];

  releaseOffers: Array<any> = [];

  styles: Array<Style>;

  style: Style;

  shop: Shop;

  shops: Array<Shop>;

  toShow = false;

  usaOffers: Array<any> = [];

  hotItems: Array<any> = [];

  relatedReleases: any = [];

  offers: any;

  allRelatedReleases: number;

  count = 3;

  @ViewChild('carousel') carousel: NgbCarousel;

  @ViewChild(MsReleasePageDetailsComponent) releasePageDetailsComponent: MsReleasePageDetailsComponent;

  @ViewChild(MsReleasePageShopsComponent) releasePageShopsComponent: MsReleasePageShopsComponent;

  subscriptions: Subscription[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public config: NgbCarouselConfig,
    public offersService: OffersService,
    public errorHandlingService: ErrorHandlingService,
    public releasesService: ReleasesService,
    public router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    config.showNavigationIndicators = false;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngAfterViewInit() {
    this.scrollTop();
    const sub = this.router.events.subscribe(path => {
      if ((!this.releaseId && this.activatedRoute.snapshot.data.slug) ||
        (this.releaseId && this.activatedRoute.snapshot.data.releaseId && this.releaseId !== this.activatedRoute.snapshot.data.releaseId)) {
        this.reload();
      }
    });
    this.subscriptions.push(sub);
  }

  getRouteReleaseId() {
    if (!this.activatedRoute.snapshot.data.releaseId) {
      this.releaseId = this.activatedRoute.snapshot.data.slug.id;
      return this.activatedRoute.snapshot.data.slug.id;
    }
    return this.activatedRoute.snapshot.data.releaseId;
  }

  scrollTop() {
    window.scroll(0, 0);
  }

  ngOnInit() {
    this.releaseId = this.activatedRoute.snapshot.data.releaseId;
    this.styles = this.activatedRoute.snapshot.data.styles;
    this.brands = this.activatedRoute.snapshot.data.brands;
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.collections = this.activatedRoute.snapshot.data.collections;
    this.shops = this.activatedRoute.snapshot.data.shops;
    this.offers = this.activatedRoute.snapshot.data.offers;

    if (!this.releaseId && this.activatedRoute.snapshot.data.slug) {
      this.release = this.activatedRoute.snapshot.data.slug;
      this.releaseId = this.activatedRoute.snapshot.data.slug.id;
    }

    this.releasePage = {
      name: '',
      color: '',
      styleCode: '',
      releaseDate: '',
      retailerPrice: '',
      gender: '',
      category: '',
      description: '',
      brand: 'Adidas',
      collection: 'Adidas Consortium',
      images: [],
      regions: [
        {
          region: 'Europe',
          regionShops: []
        },
        {
          region: 'USA',
          regionShops: []
        }
      ],
      raffles: [],
      marketplaces: []
    };

    if (!this.releaseId && this.activatedRoute.snapshot.data.slug) {
      this.release = this.activatedRoute.snapshot.data.slug;
      this.releaseId = this.activatedRoute.snapshot.data.slug.id;
    }

    const subGetRaffleOffer = this.offersService.getRaffleOffer(this.releaseId).subscribe(response => {

      response.data.forEach(element => {

        const shop = this.getShop(element.shopId);

        if (element.raffle) {
          const raffle = this.buildRaffle(element, shop);
          this.raffleOffers = [...this.raffleOffers, raffle];
        }

      });

      this.raffleOffers = this.orderByRank(this.raffleOffers);

      this.releasePageShopsComponent.setRaffleOffers(this.raffleOffers);
      // this.scrollTop();
    });
    this.subscriptions.push(subGetRaffleOffer);

    const subGetNoRaffleOffer = this.offersService.getNoRaffleOffer(this.releaseId).subscribe(response => {
      this.releaseOffers = response.data;

      this.releaseOffers.forEach(offer => {
        const shop = this.getShop(offer.shopId);

        if (shop && shop.active) {
          const offerRegion = this.buildOfferRegion(offer, shop);

          if (shop) {
            if (shop.showOnRegion === 'USA') {

              this.regionShopsUsa = [...this.regionShopsUsa, offerRegion];

            } else if (shop.showOnRegion === 'Europe') {

              this.regionShopsEurope = [...this.regionShopsEurope, offerRegion];

            } else if (shop.showOnRegion === 'Marketplaces') {

              this.marketPlaces = [...this.marketPlaces, offerRegion];

            }
          }
        }
      });

      this.marketPlaces = this.orderByRank(this.marketPlaces);
      this.regionShopsEurope = this.orderByRank(this.regionShopsEurope);
      this.regionShopsUsa = this.orderByRank(this.regionShopsUsa);

      this.releasePageShopsComponent.setRegionsOffers(this.marketPlaces, this.regionShopsEurope, this.regionShopsUsa);
      // this.scrollTop();
    });
    this.subscriptions.push(subGetNoRaffleOffer);

    const subGetReleaseAllImages = this.releasesService.getReleaseAllImages(this.releaseId).subscribe(response => {
      response.data.forEach(img => {
        const image = {
          big: img.imgUrl,
          medium: img.imgUrl,
          small: img.imgUrl,
        };
        this.releaseImages = [...this.releaseImages, image];
      });

      // this.releasePageDetailsComponent.setGalleryImages(this.releaseImages);
      // this.scrollTop();
    });
    this.subscriptions.push(subGetReleaseAllImages);

    const subGetRelease = this.releasesService.getRelease(this.releaseId).subscribe(response => {
        this.release = response.data;

        const subGetRelatedReleases = this.releasesService.getRelatedReleases(this.release.styleId).subscribe(response => {
          response.data.forEach(item => {
            if (this.releaseId !== item.id) {
              this.relatedReleases.push({
                id: item.id,
                hot: item.hot,
                image: item.mainImage,
                slogan: item.name,
                slug: item.slug
              });
            }
          });

          this.allRelatedReleases = this.relatedReleases.length;
          if (this.allRelatedReleases > 4) {
            this.hotItems = this.relatedReleases.slice(0, 4);
          } else {
            this.hotItems = this.relatedReleases.slice(0, this.allRelatedReleases);
          }


        });
        this.subscriptions.push(subGetRelatedReleases);


        this.releaseName = this.release.name;

        this.style = this.styles.find(item => {
          return item.id === this.release.styleId;
        });

        if (this.style) {
          this.brand = this.brands.find(item => {
            return item.id === this.style.brand;
          });

          this.category = this.categories.find(item => {
            return item.id === this.style.categories[0];
          });
        }
        if (this.release) {
          if (this.release.collectionId) {
            this.collection = this.collections.find(item => {
              return item.id === this.release.collectionId;
            });
          }
        }

        this.brandName = this.brand ? this.brand.name : '';

        this.collectionName = this.collection ? this.collection.name : '';

        this.releasePage = {
          name: this.release.name,
          color: this.release.color, // 'Scarlet / Ftwr White / Core Black',
          supplierColor: this.release.supplierColor,
          styleCode: this.style ? this.style.name : null, // 'Nike Europe Store',
          sku: this.release.sku,
          releaseDate: this.release.releaseDate ? moment(this.release.releaseDate).format('DD/MM/YYYY') : null,
          retailerPrice: this.getPrices(this.release.priceEUR, this.release.priceGBP, this.release.priceUSD),
          retailerPriceUSD: this.release.priceUSD,
          retailerPriceEUR: this.release.priceEUR,
          retailerPriceGBP: this.release.priceGBP,
          gender: this.release.gender, // 'Man',
          category: this.category ? this.category.name : null, // 'Sport',
          categoryId: this.category ? this.category.id : '',
          description: this.release.description,
          brand: this.brandName ? this.brandName : null, // 'Adidas',
          collection: this.collection ? this.collection.name : '', // 'Adidas Consortium',
          images: [],
          regions: [
            {
              region: 'Europe',
              regionShops: this.orderByRank(this.regionShopsEurope),
            },
            {
              region: 'USA',
              regionShops: this.orderByRank(this.regionShopsUsa),
            }
          ],
          raffles: this.orderByRank(this.raffleOffers),
          marketplaces: this.orderByRank(this.marketPlaces),
        };

        this.toShow = true;
        // this.scrollTop();
      },
      (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
    );
    this.subscriptions.push(subGetRelease);
  }

  orderByRank(offers) {
    if (offers && offers.length > 0) {
      return offers.sort((a, b) => {
        if (parseInt(a.rank, 10) < parseInt(b.rank, 10)) { return -1; }
        if (parseInt(a.rank, 10) > parseInt(b.rank, 10)) { return 1; }
        return 0;
      });
    }
    return [];
  }

  reload() {
    this.marketPlaces = [];
    this.raffleOffers = [];
    this.regionShopsUsa = [];
    this.regionShopsEurope = [];
    this.releaseId = this.activatedRoute.snapshot.data.releaseId;
    this.releaseImages = [];
    this.releaseName = '';

    this.releasePage = {
      name: '',
      color: '',
      styleCode: '',
      releaseDate: '',
      retailerPrice: '',
      gender: '',
      category: '',
      description: '',
      brand: 'Adidas',
      collection: 'Adidas Consortium',
      images: [],
      regions: [
        {
          region: 'Europe',
          regionShops: []
        },
        {
          region: 'USA',
          regionShops: []
        }
      ],
      raffles: [],
      marketplaces: []
    };

    if (!this.releaseId && this.activatedRoute.snapshot.data.slug) {
      this.release = this.activatedRoute.snapshot.data.slug;
      this.releaseId = this.activatedRoute.snapshot.data.slug.id;
    }

    const subGetRaffleOffer = this.offersService.getRaffleOffer(this.releaseId).subscribe(response => {

      response.data.forEach(element => {
        const shop = this.getShop(element.shopId);

        if (element.raffle) {
          const raffle = this.buildRaffle(element, shop);
          this.raffleOffers = [...this.raffleOffers, raffle];
        }

      });

      this.raffleOffers = this.orderByRank(this.raffleOffers);

      this.releasePageShopsComponent.setRaffleOffers(this.raffleOffers);
      // this.scrollTop();
    });
    this.subscriptions.push(subGetRaffleOffer);

    const subGetNoRaffleOffer = this.offersService.getNoRaffleOffer(this.releaseId).subscribe(response => {
      this.releaseOffers = response.data;

      this.releaseOffers.forEach(offer => {
        const shop = this.getShop(offer.shopId);
        const offerRegion = this.buildOfferRegion(offer, shop);

        if (shop && shop.showOnRegion === 'USA') {

          this.regionShopsUsa = [...this.regionShopsUsa, offerRegion];

        } else if (shop && shop.showOnRegion === 'Europe') {

          this.regionShopsEurope = [...this.regionShopsEurope, offerRegion];

        } else if (shop && shop.showOnRegion === 'Marketplaces') {

          this.marketPlaces = [...this.marketPlaces, offerRegion];

        }
      });

      this.marketPlaces = this.orderByRank(this.marketPlaces);
      this.regionShopsEurope = this.orderByRank(this.regionShopsEurope);
      this.regionShopsUsa = this.orderByRank(this.regionShopsUsa);

      this.releasePageShopsComponent.setRegionsOffers(this.marketPlaces, this.regionShopsEurope, this.regionShopsUsa);
      // this.scrollTop();
    });
    this.subscriptions.push(subGetNoRaffleOffer);

    const subGetReleaseAllImages = this.releasesService.getReleaseAllImages(this.releaseId).subscribe(response => {
      response.data.forEach(img => {
        const image = {
          big: img.imgUrl,
          medium: img.imgUrl,
          small: img.imgUrl,
        };
        this.releaseImages = [...this.releaseImages, image];
      });

      this.releasePageDetailsComponent.setGalleryImages(this.releaseImages);
      // this.scrollTop();
    });
    this.subscriptions.push(subGetReleaseAllImages);

    const subGetRelease = this.releasesService.getRelease(this.releaseId).subscribe(response => {
        this.release = response.data;
        this.relatedReleases = [];
        this.allRelatedReleases = 0;
        this.hotItems = [];
        const subgetRelatedReleases = this.releasesService.getRelatedReleases(this.release.styleId).subscribe(response => {
          response.data.forEach(item => {
            if (this.releaseId !== item.id) {
              this.relatedReleases.push({
                id: item.id,
                hot: item.hot,
                image: item.mainImage,
                slogan: item.name,
                slug: item.slug
              });
            }
          });
          this.allRelatedReleases = this.relatedReleases.length;
          if (this.allRelatedReleases > 4) {
            this.hotItems = this.relatedReleases.slice(0, 4);
          } else {
            this.hotItems = this.relatedReleases.slice(0, this.allRelatedReleases);
          }


        });
        this.subscriptions.push(subgetRelatedReleases);


        this.releaseName = this.release.name;

        this.style = this.styles.find(item => {
          return item.id === this.release.styleId;
        });

        if (this.style) {
          this.brand = this.brands.find(item => {
            return item.id === this.style.brand;
          });

          this.category = this.categories.find(item => {
            return item.id === this.style.category;
          });
        }

        if (this.release) {
          if (this.release.collectionId) {
            this.collection = this.collections.find(item => {
              return item.id === this.release.collectionId;
            });
          }
        }

        this.brandName = this.brand ? this.brand.name : '';

        this.collectionName = this.collection ? this.collection.name : '';

        this.releasePage = {
          name: this.releaseName,
          color: this.release.color, // 'Scarlet / Ftwr White / Core Black',
          styleCode: this.style.name, // 'Nike Europe Store',
          releaseDate: this.release.releaseDate ? moment(this.release.releaseDate).format('DD/MM/YYYY') : null,
          retailerPrice: this.release.priceUSD, // 139.90,
          gender: this.release.gender, // 'Man',
          category: this.category ? this.category.name : '', // 'Sport',
          description: this.release.description,
          brand: this.brandName, // 'Adidas',
          collection: this.collection ? this.collection.name : '', // 'Adidas Consortium',
          images: [],
          regions: [
            {
              region: 'Europe',
              regionShops: this.orderByRank(this.regionShopsEurope),
            },
            {
              region: 'USA',
              regionShops: this.orderByRank(this.regionShopsUsa),
            }
          ],
          raffles: this.orderByRank(this.raffleOffers),
          marketplaces: this.orderByRank(this.marketPlaces),
        };

        this.toShow = true;
        // this.scrollTop();
      },
      (error: HandledError) => this.errorHandlingService.handleUiError(errorKey, error)
    );
    this.subscriptions.push(subGetRelease);

  }

  getPriceAfterDiscount(offerItem, store: Shop) {
    let cur = store.currency;
    if (offerItem['price' + cur] === undefined) {
      cur = this.displayCurrency(offerItem);
    }

    const price = offerItem['price' + cur];
    const salePercentage = offerItem.salePercentage;

    let priceAfterDiscount: number;

    if (!salePercentage || salePercentage === 0) {
      priceAfterDiscount = undefined;
    } else {
      priceAfterDiscount = price - (salePercentage * price / 100);
    }

    if (priceAfterDiscount < 0) {
      priceAfterDiscount = undefined;
    }

    return priceAfterDiscount;
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

  buildOfferRegion(offer, shop) {
    let links = [];
    offer.links.forEach(item => {
      const link = {
        label: item.text,
        url: (item.bitlyUrl || item.trackedUrl),
        color: 'rgb(90, 190, 71)'
      };
      links = [...links, link];
    });

    let status = '';
    switch (offer.status) {
      case 'available':
        status = 'Available';
        break;
      case 'on_sale':
        status = 'On Sale';
        break;
      case 'coming_soon': {
        const timezone = offer.timezone ? offer.timezone : 'CET';
        status = offer.releaseTime ? moment(offer.releaseTime).utc().format(`ddd MMM Do [at] h:mm A [${timezone}]`) : 'Coming Soon'; // status = 'Coming Soon';
        break;
      }
      case 'restock':
        status = 'Restock';
        break;
      case 'sold_out':
        status = 'Sold Out';
        break;
      default:
        status = 'Coming Soon';
        break;
    }

    const shopLogo = this.getShopLogo(shop);

    let cur = shop.currency;
    if (offer['price' + cur] === undefined) {
      cur = this.displayCurrency(offer);
    }

    const offerRegion = {
      shopName: (shop && shop.name) ? shop.name : null,
      logo: shopLogo,
      status: status, // moment(offer.offerDate).format('MMMM Do YYYY'), //'Thu Sept 6th at Midnight CET',
      price: this.getPrices(offer.priceEUR, offer.priceGBP, offer.priceUSD),
      shipping: offer.shipping ? offer.shipping : this.getShopShipping(shop),
      links: links,
      rank: (shop && shop.rank) ? shop.rank : 1e9,
      parentShop: (shop && shop.parent) ? shop.parent : null,
    };

    if (offer.status === 'on_sale') {
      offerRegion['price' + cur] = offer['price' + cur];
      offerRegion['priceAfterDiscount'] = this.getPriceAfterDiscount(offer, shop);
    }

    return offerRegion;
  }

  buildRaffle(element, shop) {
    let links = [];
    element.links.forEach(item => {
      const link = {
        label: item.text,
        url: (item.bitlyUrl || item.trackedUrl),
        color: 'rgb(90, 190, 71)'
      };
      links = [...links, link];
    });

    let status = '';
    switch (element.status) {
      case 'online':
        status = 'Online';
        break;
      case 'closed':
        status = 'Closed';
        break;
      case 'live':
        status = 'Live';
        break;
      case 'coming_soon':
        status = 'Coming Soon';
        break;
      default:
        status = 'Coming Soon';
        break;
    }

    const timezone = element.timezone ? element.timezone : 'CET';
    const raffleDate = moment(element.raffleEnd || element.offerDate).utc().format(`ddd MMM Do [at] h:mm A [${timezone}]`);
    const raffleEndText = 'Ends on ' + raffleDate;

    const shopLogo = this.getShopLogo(shop);
    const raffle = {
      shopName: (shop && shop.name) ? shop.name : null,
      logo: shopLogo,
      pickUp: 'online',
      date: raffleEndText,
      price: this.getPrices(element.priceEUR, element.priceGBP, element.priceUSD),
      shipping: element.shipping ? element.shipping : this.getShopShipping(shop),
      status,
      links: links,
      rank: (shop && shop.rank) ? shop.rank : 1e9,
      parentShop: (shop && shop.parent) ? shop.parent : null
    };
    return raffle;
  }

  getShopLogo(shop?: Shop) {
    let shopLogo = 'assets/images/images-server/imgr0e6qwjqpfhrrv.jpg';
    if (shop) {
      if (shop.smallImage) {
        shopLogo = shop.smallImage;
      } else if (shop.mainImage) {
        shopLogo = shop.mainImage;
      }
    }
    return shopLogo;
  }

  getShopShipping(shop?: Shop) {
    if (shop && shop.shippingCountries) {
      if (shop.shippingCountries === 'Select Countries') {
        return shop.countries;
      }
      return shop.shippingCountries;
    }
    return '';
  }

  isOfferFromThisRegion(shopId: string, region: string) {
    return this.shops.find(shop => {
      return shop.id === shopId;
    }).region === region;
  }

  getShop(shopId: string) {
    return this.shops.find(shop => {
      return shop.id === shopId;
    });
  }

  onSlide(slideData) {
    if (slideData.direction === 'left') {
      this.getRelatedReleasesNext();
    } else {
      this.getRelatedReleasesPrev();
    }

  }

  getPrices(priceEUR, priceGBP, priceUSD) {
    const prices = [];
    if (priceEUR !== undefined) {
      prices.push('€' + priceEUR);
    }
    if (priceUSD !== undefined) {
      prices.push('$' + priceUSD);
    }
    if (priceGBP !== undefined) {
      prices.push('£' + priceGBP);
    }
    if (prices.length === 0) {
      return 'TBA';
    }
    return prices.join(' | ');
  }

  getRelatedReleasesNext() {
    if (this.allRelatedReleases > 4) {
      if (this.count >= this.allRelatedReleases) {
        this.count = 0;
      }
      this.hotItems = this.hotItems.slice(0, 3);
      const items = [this.relatedReleases[this.count], ...this.hotItems];

      this.hotItems = items;

      this.count++;
    }
  }

  getRelatedReleasesPrev() {
    if (this.allRelatedReleases > 4) {
      if (this.count >= this.allRelatedReleases) {
        this.count = 0;
      }
      this.hotItems = this.hotItems.slice(1, 4);
      const items = [...this.hotItems, this.relatedReleases[this.count]];
      this.hotItems = items;
      this.count++;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
