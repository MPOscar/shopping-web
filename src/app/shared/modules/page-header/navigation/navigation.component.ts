import {Component, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {BrandsCollapsMenuService} from '../../ms-brands-collaps-menu/brands-collaps-menu.service';
import {CategoriesCollapsMenuService} from '../../ms-categories-collaps-menu/categories-collaps-menu.service';
import {MsShopsCollapsMenuService} from '../../ms-shops-collaps-menu/ms-shops-collaps-menu.service';
import {WhatsNewCollapsMenuService} from '../../ms-whats-new-collaps-menu/whats-new-collaps-menu.service';
import {NavigationEnd, Router} from '@angular/router';
import {DOCUMENT, Location} from '@angular/common';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'ms-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  show = false;

  private toggleButton: any;

  private sidebarVisible: boolean;

  title = "app works!";

  showProgressBar = false;

  avatarBackgroundImage: SafeStyle | undefined;


  @Input() showTransparent = true;

  constructor(
    private whatsNewMenu: WhatsNewCollapsMenuService,
    private brandsMenu: BrandsCollapsMenuService,
    private categoriesMenu: CategoriesCollapsMenuService,
    private shopsMenu: MsShopsCollapsMenuService,
    public location: Location,
    private element: ElementRef,
    private router: Router,
    private domSanitizer: DomSanitizer,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    this.sidebarClose();
    const navbar: HTMLElement = this.element.nativeElement.children[0];
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.renderer.listen("window", "scroll", (event) => {
      const number = window.scrollY;
      let _location = this.location.path();
      _location = _location.split("/")[2];
      const collapMenu = document.getElementsByClassName("visible")[0];
      if (number > 150 || window.pageYOffset > 150) {
        navbar.classList.remove("navbar-transparent");
        navbar.classList.remove("background-nav");
      } else if (
        _location !== "login" &&
        this.location.path() !== "/nucleoicons"
      ) {
        if (this.showTransparent && collapMenu === undefined) {
          navbar.classList.add("navbar-transparent");
          navbar.classList.add("background-nav");
        }
      }
    });

    if (!this.showTransparent) {
      navbar.classList.remove("navbar-transparent");
    }

  }

  checkIfMenuIsOpen(element: string) {
    const navbar: HTMLElement = this.element.nativeElement.children[0];
    const collapMenu = document.getElementById(element);
    const number = window.scrollY;
    if (collapMenu.classList.contains("visible") && (number < 150 || window.pageYOffset < 150)) {
      navbar.classList.add("navbar-transparent");
    } else {
      navbar.classList.remove("navbar-transparent");
    }
  }

  toggleCollapse() {
    this.show = !this.show;
  }

  toggleCollapseWhatsNewMenu(): boolean {
    this.whatsNewMenu.toggleCollapse();
    this.checkIfMenuIsOpen("whats-new-collaps-menu-div");
    return false;
  }

  toggleCollapseBrandsMenu(): boolean {
    this.brandsMenu.toggleCollapse();
    this.checkIfMenuIsOpen("brands-collaps-menu-div");
    return false;
  }

  toggleCollapsCategoriesMenu(): boolean {
    this.categoriesMenu.toggleCollapse();
    this.checkIfMenuIsOpen("categories-collaps-menu-div");
    return false;
  }

  toggleCollapsShopsMenu(): boolean {
    this.shopsMenu.toggleCollapse();
    this.checkIfMenuIsOpen("shops-collaps-menu-div");
    return false;
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }

  sidebarClose() {
    /*const navbar: HTMLElement = this.element.nativeElement.children[0];
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");*/
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

}
