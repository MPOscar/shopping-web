import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { BlogsTableComponent } from '../../../../../shared/modules/ms-product-table/blogs-table/blogs-table.component';

//
import { BlogsService } from '../../services/blogs.service';
import { Blog } from '../../models/blog';
import { LayoutService } from '../../../ms-layout/services/layout.service';
import { Sliders, Header } from '../../../ms-layout/models/layout';
import { ReleasesService } from '../../../ms-releases/services/releases.service';
import { Meta } from '@angular/platform-browser';
import {MsSeoService} from '../../../../../shared/services/ms-seo.service';

@Component({
  selector: 'blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  @ViewChild(BlogsTableComponent) blogsTableComponent: BlogsTableComponent;

  blogs: Array<any>;


  data: any = {};

  linkedShops: Array<string>;

  collectionShops: Array<any> = [];

  title: string;

  imgUrl: string;

  description: string;

  header: Header;

  slidersData: Sliders;

  slideDisplay: string = '';

  headerDisplay: string = '';

  hottestDisplay: string = '';

  displayHeaderOnPage: boolean = false;

  displaySlidersOnPage: boolean = false;

  displayHottestOnPage: boolean = false;

  displayHeadingOnPage: boolean = true;

  constructor(
    public activatedRoute: ActivatedRoute,
    public blogsService: BlogsService,
    public layoutService: LayoutService,
    public releasesService: ReleasesService,
    public router: Router,
    private msSeoService: MsSeoService
  ) {

  }

  ngOnInit() {

    this.layoutService.getLayout('blogs', 'heading').subscribe(response => {
      this.title = response.data.title;
      this.description = response.data.description;
      this.imgUrl = response.data.imgUrl || 'assets/images/whats-new/banner.svg';
      this.displayHeadingOnPage = response.data.displayOnPage;

      this.msSeoService.addMetadata(response.data.keywords);
    });

    this.blogsService.getAllBlogs().subscribe(response => {
      this.blogs = response.data;
      this.blogsTableComponent.redrawOffers(response.data);
    });

    this.layoutService.getHeader('blogs').subscribe(response => {
      this.header = response.data;
      this.headerDisplay = this.header.display;
      this.displayHeaderOnPage = this.header.displayOnPage;
    });

    this.layoutService.getSliders('blogs').subscribe(response => {
      this.slidersData = response.data;
      this.slideDisplay = this.slidersData.display;
      this.displaySlidersOnPage = this.slidersData.displayOnPage;
    });

    this.layoutService.getHottest('blogs').subscribe(response => {
      this.hottestDisplay = response.data.display;
      this.displayHottestOnPage = response.data.displayOnPage;
    });

  }

}
