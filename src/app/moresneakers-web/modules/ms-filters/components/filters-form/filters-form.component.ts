import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, OnChanges, Output, ViewChild, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
//
import { debounceTime } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
//
import { COLORS, Color } from '../../../ms-releases/models/color';
import { Brand } from '../../../ms-brands/models/brand';
import { BrandsService } from '../../../ms-brands/services/brands.service';
import { CategoriesService } from '../../../ms-categories/services/categories.service';
import { Category } from '../../../ms-categories/models/category';
import { Shop } from '../../../ms-shops/models/shops';
import { Style } from '../../model/style';
import { GENDERS, Gender } from '../../../ms-releases/models/gender';
import { STATUS, Status } from '../../../ms-offers/models/status';
import { ShippingCountries, SHIPPINGCOUNTRIES } from '../../../ms-shops/models/shippingCountries';
import { Country } from '../../../ms-shops/models/country';
import { ShopsService } from '../../../ms-shops/services/shops.service';
import { Subscription } from 'rxjs';
import { ShowOnRegion, SHOW_ON_REGIONS } from '../../../ms-shops/models/showOnRegions';
import { Currency, CURRENCY } from '../../../ms-shops/models/currency';
import {Collection} from '../../../ms-collections/models/collection';



@Component({
    selector: 'filters-form',
    templateUrl: './filters-form.component.html',
    styleUrls: ['./filters-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilterFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input() brands: Array<Brand>;

    /*@Input() categories: Array<Category>;

    @Input() styles: Array<Style>;

    @Input() styleId: string;

    @Input() shops: Array<Shop>;

    allStyles: Array<Style>;*/

    linkedShops: Array<string> = [];

    shop: any;

    createRelease = false;

    formGroup: FormGroup;

    treeNode: Array<any> = [];

    styleName: string;

    style: any;

    genders: Gender[] = GENDERS;

    @Input() count: number;

    @Input() inputFilters: any;

    @Input() inputBrands: any;

    @Input() inputStyles: any;

    @Input() inputCollections: any;

    @Input() inputStatus: any;

    @Input() inputShippingCountries: any;

    @Input() shops: Array<Shop>;

    @Input() styles: Array<Style>;

    @Input() collections: Array<Collection>;

    @Input() samePage = false;

    @Input() categories: Array<Category>;

    @Input() isFiltersOffers = false;

    @Input() isFiltersReleases = false;

    @Input() isFiltersShops = false;

    @Input() isStatusDisabled = false;

    @Output() filterEventEmiter = new EventEmitter<any>();

    subscriptions: Subscription[] = [];

    brandstyles: Array<any> = [];

    shopCountries: Array<Country> = [];

    colors: Color[] = COLORS;

    currencies = CURRENCY;

    oldCurrency = 'EUR';

    filters: any = {
        categoryId: [],
        sku: '',
        brandId: [],
        styleId: [],
        gender: [],
        color: [],
        shopId: [],
        shipping: [],
        status: [],
        country: []
    };

    filtersEvent: any = {
        categoryId: [],
        sku: '',
        brandId: [],
        styleId: [],
        gender: [],
        color: [],
        shopId: [],
        shipping: [],
        status: [],
    };

    shippingCountries: ShippingCountries[] = SHIPPINGCOUNTRIES;

    showOnRegions: ShowOnRegion[] = SHOW_ON_REGIONS;

    status: Array<Status> = STATUS;

    brandId: Array<any> = [];

    styleId: Array<any> = [];

    dropdownList: { id: string, name: string }[] = [];

    selectedItems = [];

    dropdownSettings = {};


    lastKeyPress: Date;

    changed: boolean;

    constructor(
        public activatedRoute: ActivatedRoute,
        public location: Location,
        public brandsService: BrandsService,
        public categoriesService: CategoriesService,
        public router: Router,
        translateService: TranslateService,
        public shopService: ShopsService
    ) {
        // setTranslations(this.translateService, TRANSLATIONS);
    }

    ngOnChanges(): void {
        if (this.inputFilters) {
          if (typeof this.inputFilters === 'string' || this.inputFilters instanceof String) {
            const filtersArray = JSON.parse(this.inputFilters + '');
            if (filtersArray && filtersArray.brandId) {
              this.filters.brandId = filtersArray.brandId;
              this.applyInputFilters();
            }
          }
        }
        this.shops.forEach(element => {
            const item = {
                id: element.id,
                name: element.name
            };
            this.dropdownList.push(item);
        });
        this.createFilterFormGroup();
    }

    applyInputFilters() {
      if (typeof this.inputFilters === 'string' || this.inputFilters instanceof String) {
        this.inputFilters = JSON.parse(this.inputFilters + '');
      }
      this.filters = this.inputFilters;
      this.inputBrands = [];
      this.inputStyles = [];
      this.inputCollections = [];
      this.inputShippingCountries = [];
      if (this.inputFilters.brandId) {
        this.inputFilters.brandId.forEach(element => {
          const brandIndex = this.brands.findIndex(brand => {
            return brand.id === element;
          });

          if (brandIndex >= 0) {
            this.inputBrands = [...this.inputBrands, this.brands.find(brand => {
              return brand.id === element;
            }).name];
          }

        });

      }

      if (this.inputFilters.styleId) {
        this.inputFilters.styleId.forEach(element => {

          const styleIndex = this.styles.findIndex(style => {
            return style.id === element;
          });

          if (styleIndex >= 0) {
            this.inputStyles = [...this.inputStyles, this.styles.find(style => {
              return style.id === element;
            }).name];
          }

        });

      }

      if (this.inputFilters.status) {
        this.inputFilters.status.forEach(element => {
          this.inputStyles = [...this.inputStyles, element];
        });
      }

      if (this.inputFilters.shipping) {
        this.inputFilters.shipping.forEach(element => {
          this.inputShippingCountries = [...this.inputShippingCountries, element];
        });
      }
    }

    sortedCategories() {
      if (!this.categories) {
        return [];
      }
      return this.categories.sort((a, b) => a.name.localeCompare(b.name));
    }

    ngOnInit() {
        // Shops countries are not loaded if form filters is for offers or releases
        if (!this.isFiltersOffers) {
            this.getShopsCountries();
        }

        this.brands.forEach(element => {
            let item: any = [];
            item = {
                'item': element.name,
                'children': this.getChildrenBrand(element.id),
            };
            this.brandstyles = [...this.brandstyles, item];
        });

        if (this.inputFilters) {
            this.applyInputFilters();
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    getShopsCountries() {
        const sub = this.shopService.getShopCountries().subscribe(
            (response) => {
                this.shopCountries = response.data;
            }
        );
        this.subscriptions.push(sub);
    }

    createFilterFormGroup() {
        this.formGroup = new FormGroup({
            color: new FormControl(this.inputFilters ? this.inputFilters['color'] : ''),
            currency: new FormControl(this.inputFilters ? this.inputFilters['currency'] : this.currencies[1]),
            maxPrice: new FormControl(this.inputFilters ? this.inputFilters['maxPrice'] : ''),
            minPrice: new FormControl(this.inputFilters ? this.inputFilters['minPrice'] : ''),
            shopId: new FormControl(this.inputFilters ? this.getShopsToShow(this.inputFilters['shopId']) : ''),
            sku: new FormControl(this.inputFilters ? this.inputFilters['sku'] : ''),
        });

        this.formGroup.controls.maxPrice.valueChanges.subscribe(change => this.keyPress());
        this.formGroup.controls.minPrice.valueChanges.subscribe(change => this.keyPress());
        this.formGroup.controls.sku.valueChanges.subscribe(change => this.keyPress());
        this.formGroup.controls.currency.valueChanges.subscribe(change => {
          delete this.filters['maxPrice' + this.oldCurrency];
          delete this.filters['minPrice' + this.oldCurrency];
          if (this.formGroup.get('maxPrice').value || this.formGroup.get('minPrice').value) {
            // Only filter if there is min or max price set
            this.onFilter();
          }
        });

        this.formGroup.controls.color.valueChanges.subscribe(change => this.onFilter());
        this.formGroup.controls.shopId.valueChanges.subscribe(change => this.onFilter());

        if (!this.isFiltersOffers) {
            const countryFormControl = new FormControl(this.inputFilters ? this.inputFilters['country'] : '');
            this.formGroup.addControl('country', countryFormControl);
        }
    }

    keyPress() {
        this.lastKeyPress = new Date();
        if (!this.changed) {
            this.changed = true;
            this.waitForEnd();
        }
    }

    waitForEnd() {
        const currentDate = new Date();
        const elapsedTime = currentDate.getTime() - this.lastKeyPress.getTime();
        if (elapsedTime >= 2000) {
            this.onFilter();
            this.changed = false;
        } else {
            this.delay(2000 - elapsedTime).then(() => {
                this.waitForEnd();
            });
        }
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    getChildrenBrand(id: string) {
        let children: any = [];
        this.styles.forEach(element => {
            if (!element.parent && element.brand === id) {
                let item: any = [];
                item = {
                    'item': element.name
                };
                const desc = this.getChildrenStyle(element.id);
                if (desc && desc.length > 0) {
                  item.children = desc;
                }
                children = [...children, item];
            }
        });
        if (children.length > 0) {
            return children;
        }
    }

    getChildrenStyle(id: string) {
      let children: any = [];
      this.styles.forEach(element => {
        if (element.parent === id) {
          let item: any = [];
          item = {
            'item': element.name,
          };
          children = [...children, item];
        }
      });
      return children;
    }

    onItemSelect(item: any) {
        // console.log(item);
    }

    onSelectAll(items: any) {
        // console.log(items);
    }

    onFilter() {
        const currency = this.formGroup.get('currency').value ? this.formGroup.get('currency').value.name : null;
        this.filters.color = this.formGroup.get('color').value;
        this.filters.shopId = this.formGroup.get('shopId').value;
        this.filters['maxPrice' + currency] = this.formGroup.get('maxPrice').value;
        this.filters['minPrice' + currency] = this.formGroup.get('minPrice').value;
        this.filters.sku = this.formGroup.get('sku').value;
        this.filters.shopId = this.getArray(this.formGroup.get('shopId').value);
        this.filters.color = this.getArray(this.formGroup.get('color').value);
        this.filtersEvent = this.filters;
        this.oldCurrency = currency;

        this.cleanEmptyFilters();

        this.filtersEventEmiter();
    }

    cleanEmptyFilters() {
        const obj = this.filters;
        const result = Object.keys(obj).map(function (key) {
            return [(key), obj[key]];
        });

        let newFiltersObject = {};
        result.forEach(value => {
            if (typeof value[1] === 'number'
              || (Array.isArray(value[1]) && value[1].length > 0)
              || (value[1] && typeof value[1] === 'string' && value[1] !== '')
            ) {
                // remove filter upcoming when filter form aren't of offers
                if (value[0] !== 'upcoming' || this.isFiltersOffers) {
                    newFiltersObject = { ...newFiltersObject, [value[0]]: value[1] };
                }
            }
        });

        this.filters = newFiltersObject;
    }

    getArray(array: Array<any>) {
        let temp = [];
        if (array) {
            if (array.length > 0) {
                array.forEach(item => {
                  if (typeof item === 'string' || item instanceof String) {
                    temp = [...temp, item];
                  } else if (item) {
                    temp = [...temp, item.id];
                  }
                });
            }
        }
        return temp;
    }


    updateGender(gender: string) {

        if (this.filters.gender) {
            const indexLinked = this.filters.gender.findIndex((val) => val === gender);
            if (indexLinked > -1) {
                let genders: Array<string> = [];
                this.filters.gender.forEach((gender, index) => {
                    if (index !== indexLinked) {
                        genders = [...genders, gender];
                    }
                });
                this.filters.gender = genders;

            } else {
                this.filters.gender = [...this.filters.gender, gender];
            }
        } else {
            this.filters.gender = [];
            this.filters.gender = [...this.filters.gender, gender];
        }

        this.onFilter();
    }

    updateCategory(category: string) {

        if (this.filters.categoryId) {
            const indexLinked = this.filters.categoryId.findIndex(val => {
                return val === category;
            });
            if (indexLinked > -1) {
                let categories: Array<string> = [];
                this.filters.categoryId.forEach((category, index) => {
                    if (index != indexLinked) {
                        categories = [...categories, category];
                    }
                });
                this.filters.categoryId = categories;

            } else {
                this.filters.categoryId = [...this.filters.categoryId, category];
            }
        } else {
            this.filters.categoryId = [];
            this.filters.categoryId = [...this.filters.categoryId, category];
        }
        this.onFilter();
    }

    updateStyles(slectedStyles: any) {
        this.brandId = [];
        this.styleId = [];
        slectedStyles.forEach(element => {
            const index = this.styles.findIndex(item => {
                return item.name === element.item;
            });
            if (index >= 0) {
                const id = this.getStyleId(element.item);
                this.styleId = [...this.styleId, id];
                if (!this.notInArray(id)) {
                    this.brandId = [...this.brandId, this.getBrandNameStyleId(id)];
                }
            } else {
                this.brandId = [...this.brandId, this.getBrandId(element.item)];
            }
        });

        this.filters.styleId = this.styleId;
        this.filters.brandId = this.brandId;

        this.onFilter();
    }

    updateStatus(status: string) {

        if (this.filters.status) {
            const indexLinked = this.filters.status.findIndex((val) => val === status);
            if (indexLinked > -1) {
                let status: Array<string> = [];
                this.filters.status.forEach((statu, index) => {
                    if (index !== indexLinked) {
                        status = [...status, statu];
                    }
                });
                this.filters.status = status;

            } else {
                this.filters.status = [...this.filters.status, status];
            }
        } else {
            this.filters.status = [];
            this.filters.status = [...this.filters.status, status];
        }

        this.onFilter();
    }

    updateShippingCountries(shipping: string) {

        if (this.filters.shipping) {
            const indexLinked = this.filters.shipping.findIndex((val) => val === shipping);
            if (indexLinked > -1) {
                let shipping: Array<string> = [];
                this.filters.shipping.forEach((shippingItem, index) => {
                    if (index !== indexLinked) {
                        shipping = [...shipping, shippingItem];
                    }
                });
                this.filters.shipping = shipping;

            } else {
                this.filters.shipping = [...this.filters.shipping, shipping];
            }
        } else {
            this.filters.shipping = [];
            this.filters.shipping = [...this.filters.shipping, shipping];
        }

        this.onFilter();
    }

    updateShowOnRegions(showOnRegionId) {
        if (this.filters.showOnRegion) {
            const showOnRegionIndex = this.filters.showOnRegion.findIndex(item => item === showOnRegionId);
            if (showOnRegionIndex > -1) {
                this.filters.showOnRegion.splice(showOnRegionIndex, 1);
            } else {
                this.filters.showOnRegion.push(showOnRegionId);
            }
        } else {
            this.filters.showOnRegion = [];
            this.filters.showOnRegion.push(showOnRegionId);
        }

        this.onFilter();
    }

    getShopsToShow(shopsId: Array<string>) {
        let shopsForm: any = [];
        if (shopsId) {
            if (shopsId.length > 0) {
                shopsId.forEach(element => {
                    const item = this.shops.find(shop => {
                        return shop.id === element;
                    });
                    const shopItem = {
                        id: item.id,
                        name: item.name,
                    };
                    shopsForm = [...shopsForm, shopItem];
                });
            }
        }

        return shopsForm;
    }

    getStyleId(name: string) {
        return this.styles.find(item => {
            return item.name === name;
        }).id;
    }

    getBrandId(name: string) {
        return this.brands.find(item => {
            return item.name === name;
        }).id;
    }

    getBrandName(id: string) {
        return this.brands.find(item => {
            return item.id === id;
        }).id;
    }

    getBrandNameStyleId(styleId: string) {
        return this.styles.find(item => {
            return item.id === styleId;
        }).brand;
    }

    notInArray(styleId: any) {
        const brand = this.getBrandNameStyleId(styleId);
        const index = this.brandId.findIndex(item => {
            return item === brand;
        });
        if (index >= 0) {
            return true;
        }
        return false;
    }

    filtersEventEmiter() {
        if (!this.samePage) {
            this.router.navigate(['/search'], { queryParams: { 'filters': JSON.stringify(this.filters) } });
        }
        this.filterEventEmiter.emit(this.filters);
    }

    isCategorySelected(id: string) {
        if (this.inputFilters) {
            if (this.inputFilters.categoryId) {
                const index = this.inputFilters.categoryId.findIndex(item => {
                    return item === id;
                });
                if (index >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

    isStatusSelected(status: string) {
        if (this.inputFilters) {
            if (this.inputFilters.status) {
                const index = this.inputFilters.status.findIndex(item => {
                    return item === status;
                });
                if (index >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

    isShippingSelected(shipping: string) {
        if (this.inputFilters) {
            if (this.inputFilters.shipping) {
                const index = this.inputFilters.shipping.findIndex(item => {
                    return item === shipping;
                });
                if (index >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

    isShowOnRegionSelected(showOnRegionId: string) {
        if (this.inputFilters) {
            if (this.inputFilters.showOnRegion) {
                const index = this.inputFilters.showOnRegion.findIndex(item => {
                    return item === showOnRegionId;
                });
                if (index >= 0) {
                    return true;
                }
            }
        }
        return false;
    }

    changeCountries(countries: Country[]) {
        this.filters.country = [];
        countries.forEach(country => this.filters.country.push(country.country));
        this.onFilter();
    }

    get isCheckedSelectCountry() {
        if (this.filters.shipping) {
            const selectCountry = this.filters.shipping.find(country => country === 'Select Countries');
            return selectCountry ? true : false;
        }

        return false;
    }
}

