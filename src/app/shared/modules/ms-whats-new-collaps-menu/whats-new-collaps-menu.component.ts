import { Component, OnInit } from '@angular/core';
import {CategoriesCollapsMenuService} from '../ms-categories-collaps-menu/categories-collaps-menu.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesService} from '../../../moresneakers-web/modules/ms-categories/services/categories.service';
import {WhatsNewCollapsMenuService} from './whats-new-collaps-menu.service';
import { STATUS, Status } from '../../../moresneakers-web/modules/ms-offers/models/status';


@Component({
  selector: 'ms-whats-new-collaps-menu',
  templateUrl: './whats-new-collaps-menu.component.html',
  styleUrls: ['./whats-new-collaps-menu.component.scss']
})
export class WhatsNewCollapsMenuComponent implements OnInit {
  visible = false;

  allStatus: Array<any> = [];
  status: Array<Status> = STATUS;
  showAllItems: boolean = false;

  constructor(public activatedRoute: ActivatedRoute,
              public collapseService: WhatsNewCollapsMenuService,
              public router: Router) {
  }

  ngOnInit() {

    this.collapseService.isVisible().subscribe(
      value => {
        this.visible = value;
      }
    );
  }

  hideMenu() {
    this.collapseService.hide();
  }

  selectMenuItem(statusId: string){
    let filters = {
      status: [statusId]
    }
    this.router.navigate(['/whats-new'], { queryParams: { 'filters': JSON.stringify(filters) } });
  }

  seeAllItem(flag: boolean) {
    this.showAllItems = flag;
  }

  getRouteFromId(id) {
    return id.replace('_', '-').toLowerCase();
  }

}
