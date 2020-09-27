import { Component, OnInit } from '@angular/core';
//
import { BrandsService } from '../../../moresneakers-web/modules/ms-brands/services/brands.service';
import { CollectionsService } from '../../../moresneakers-web/modules/ms-collections/services/collections.service';

import { BrandsCollapsMenuService } from './brands-collaps-menu.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MsCollapsMenu } from '../ms-collaps-menu/ms-collaps-menu';
import {LayoutService} from '../../../moresneakers-web/modules/ms-layout/services/layout.service';
import {StylesService} from '../../../moresneakers-web/modules/ms-style/services/styles.service';


@Component({
  selector: 'ms-brands-collaps-menu',
  templateUrl: './brands-collaps-menu.component.html',
  styleUrls: ['./brands-collaps-menu.component.scss']
})
export class BrandsCollapsMenuComponent implements OnInit, MsCollapsMenu {

  visible = false;

  brands: Array<any> = [];

  brandsToShow: Array<any> = [];

  brand: any;

  showedBrandsId: Array<any> = [];

  brandsList: Array<any> = [];

  collections: Array<any> = [];
  styles: Array<any> = [];

  moreBrands: Array<any> = [];

  moreBrandsToShow: Array<any> = [];

  showAllBrands = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    public layoutService: LayoutService,
    public brandsService: BrandsService,
    public collectionsService: CollectionsService,
    public stylesService: StylesService,
    public collapseService: BrandsCollapsMenuService,
    public router: Router) { }

  ngOnInit() {

    // this.addMocData();

    this.layoutService.getMenu('brands').subscribe(response => {
      const brandsMenu = response.data;
      console.log(brandsMenu);
      this.brandsService.getAllBrands().subscribe(allBrands => {
        this.collectionsService.getAllCollections().subscribe(allCollections => {
          this.stylesService.getAllStyles().subscribe(allStyles => {
            brandsMenu.slides.forEach(slide => {
              const brand = allBrands.find((item) => item.id === slide.entityId);
              let items = [];
              slide.collections.forEach(collectionId => {
                const collection = allCollections.find((col) => col.id === collectionId);
                if (collection.brand === brand.id) {
                  const item = {
                    id: collection.id,
                    name: collection.name,
                    brandName: brand.name,
                    type: 'collection'
                  };
                  items = [...items, item];
                }
              });

              if (slide.styles) {
                slide.styles.forEach(styleId => {
                  const style = allStyles.find((col) => col.id === styleId);
                  if (style) {
                    const item = {
                      id: styleId,
                      name: style.name,
                      type: 'style'
                    };
                    items = [...items, item];
                  }
                });
              }

              if (this.brandsToShow.length < 4) {
                this.showedBrandsId = [...this.showedBrandsId, brand.id];
                this.brandsToShow.push({
                  id: brand.id,
                  name: brand.name,
                  logo: brand.imgUrl,
                  // logo: 'assets/images/images-server/imgr0eccljqgvv4yc.jpg',
                  items: items.slice(0, 5),
                  seeAllLink: '#'
                });
              } else {
                this.moreBrands.push({
                  id: brand.id,
                  name: brand.name,
                  seeAllLink: '#'
                });
              }
            });
          });
          if (this.moreBrands.length > 10) {
            this.moreBrandsToShow = this.moreBrands.slice(0, 10);
          } else {
            this.moreBrandsToShow = this.moreBrands;
          }
        });
      });
    });

    this.collapseService.isVisible().subscribe(
      value => {
        this.visible = value;
      }
    );
  }

  // Only for Development-Testing environment
  private addMocData() {
    // /*this.brands.push({
    //   name: 'Nike',
    //   logo: 'assets/images/moc-images/brands/logo-nike.svg',
    //   items: [
    //     { name: 'Nike Air Max High Quality 2', link: '#' },
    //     { name: 'Nike Air Force 1 07 Lv8 Realtree ‘desert Camo’', link: '#' },
    //     { name: 'Nike Air Max Release On Fire', link: '#' },
    //     { name: 'Nike Air Max Release On Fire Plus Additional Excelent Quality', link: '#' },
    //     { name: 'Nike Air Max 12345 Ultra Fun', link: '#' },
    //     { name: 'Adidas Originals Nmd_r1 Cny', link: '#' },
    //     { name: 'Nike Air Max 720 Aurea Borealis', link: '#' },
    //     { name: 'Nike Air Force 1 07 Lv8 Realtree ‘desert Camo’', link: '#' },
    //     { name: 'Nike Air Force 1 Utility Mid ‘spruce Fog’ 1', link: '#' },
    //     { name: 'Kinfolk X Adidas Consortium Ultraboost', link: '#' },
    //   ],
    //   seeAllLink: '#'
    // });
    //
    //
    // /*this.moreBrands.push({
    //   name: 'British Knigths', seeAllLink: '#'
    //
    // this.moreBrands.push({
    //   name: 'Crep Protect', seeAllLink: '#'
    // });*/
  }

  hideMenu() {
    this.collapseService.hide();
  }

  showMoreBrands(flag: boolean) {
    this.showAllBrands = flag;
    if (flag) {
      this.moreBrandsToShow = this.moreBrands;
    } else {
      this.moreBrandsToShow = this.moreBrands.slice(0, 10);
    }
  }

  showThisBrand(brandId: string) {

    this.brand = this.brands.find(item => {
      return item.id === brandId;
    });

    this.brandsToShow = this.brandsToShow.slice(1, 4);
    this.showedBrandsId = this.showedBrandsId.slice(1, 4);
    this.showedBrandsId.push(brandId);

    const moreBrandsTemp = [];

    this.brands.forEach(brand => {
      const index = this.showedBrandsId.findIndex(brandsId => {
        return brandsId === brand.id;
      });

      if (index < 0) {
        moreBrandsTemp.push({
          id: brand.id,
          name: brand.name,
          seeAllLink: '#'
        });
      }
    });

    this.moreBrands = moreBrandsTemp;

    if (this.showAllBrands) {
      this.moreBrandsToShow = this.moreBrands;
    } else {
      this.moreBrandsToShow = this.moreBrands.slice(0, 10);
    }

    let items = [];
    this.collections.forEach(collection => {
      if (collection.brand === this.brand.id) {
        const item = {
          id: collection.id,
          name: collection.name,
          brandName: this.brand.name,
        };
        items = [...items, item];
      }
    });

    this.brandsToShow.push({
      id: this.brand.id,
      name: this.brand.name,
      logo: this.brand.imgUrl,
      items: items,
      seeAllLink: '#'
    });
  }

  showBrandPage(brandId: string) {
    this.router.navigate(['/brands'], { queryParams: { 'brandId': brandId } });
  }

  showBrandCollectionPage(product: any) {
    if (product.type && product.type === 'style') {
      this.router.navigate(['/styles', this.getRouterName(product.name)]);
    } else {
      this.router.navigate(['/collections', this.getRouterName(product.name)]);
    }
  }

  getRouterName(name) {
    return name.toLowerCase().replace(/ /g, '-');
  }

  seeAllItem() {}

}
