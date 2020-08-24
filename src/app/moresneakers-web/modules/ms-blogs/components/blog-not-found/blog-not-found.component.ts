import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ms-blog-post',
  templateUrl: './blog-not-found.component.html',
  styleUrls: ['./blog-not-found.component.scss']
})
export class BlogNotFoundComponent implements OnInit {
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
