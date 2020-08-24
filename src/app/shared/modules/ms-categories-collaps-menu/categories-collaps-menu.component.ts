import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { BrandsCollapsMenuService } from '../ms-brands-collaps-menu/brands-collaps-menu.service';
import { CategoriesCollapsMenuService } from './categories-collaps-menu.service';
import { MsCollapsMenu } from '../ms-collaps-menu/ms-collaps-menu';
//
import { CategoriesService } from '../../../moresneakers-web/modules/ms-categories/services/categories.service';


@Component({
  selector: 'ms-categories-collaps-menu',
  templateUrl: './categories-collaps-menu.component.html',
  styleUrls: ['./categories-collaps-menu.component.scss']
})
export class CategoriesCollapsMenuComponent implements OnInit, MsCollapsMenu {
  visible = false;

  allCategoriesToShow: Array<any> = [];

  categoriesToShow: Array<any> = [];

  categories: Array<any> = [];

  showAllItems: boolean = false;

  constructor(public activatedRoute: ActivatedRoute,
              public categoriesService: CategoriesService,
              public collapseService: CategoriesCollapsMenuService,
              public router: Router) {
  }

  ngOnInit() {

    this.categoriesService.getAllCategories().subscribe(response => {
      this.categories = response.sort((a, b) => a.name.localeCompare(b.name));

      this.categories.forEach(category => {
        this.allCategoriesToShow.push({
          id: category.id,
          name: category.name,
          link: '#'
        });
      });

    });

    this.addMocData();

    this.collapseService.isVisible().subscribe(
      value => {
        this.visible = value;
      }
    );
  }

  hideMenu() {
    this.collapseService.hide();
  }

  private addMocData() {
  }

  seeAllItem(flag: boolean) {
    this.showAllItems = flag;
  }

  showBrandPage(categoryId: string) {
    this.router.navigate(['/categories'], { queryParams: { 'categoryId': categoryId } });
  }

  getRouterName(name) {
    return name.toLowerCase().replace(/ /g, '-');
  }
}
