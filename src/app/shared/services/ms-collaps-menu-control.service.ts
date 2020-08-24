import { Injectable } from '@angular/core';
import {MsCollapsMenu} from '../modules/ms-collaps-menu/ms-collaps-menu';
import {MsCollapsMenuService} from './ms-collaps-menu.service';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MsCollapsMenuControlService {
  private activeMenu: MsCollapsMenuService = null;

  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.hideActiveMenu();
      }
    });
  }

  registerActiveMenu(menu: MsCollapsMenuService) {
    if (this.activeMenu != null && this.activeMenu !== menu) {
      this.hideActiveMenu();
    }

    this.activeMenu = menu;
  }

  hideActiveMenu() {
    if (this.activeMenu == null) { return; }

    this.activeMenu.hide();
    this.activeMenu = null;
  }
}
