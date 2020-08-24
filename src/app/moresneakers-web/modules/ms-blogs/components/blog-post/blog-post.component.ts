import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//
import { Blog, BlogImageResponce } from '../../models/blog';
import { BlogsService } from '../../services/blogs.service';
import { BlogsImgesService } from '../../services/blogs-images.service';

@Component({
  selector: 'ms-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {

  blog: Blog;

  blogId: string;

  blogImageResponce: Array<BlogImageResponce>;
  blogImageResponceM1: Array<BlogImageResponce>;
  blogImageResponceM2: Array<BlogImageResponce>;

  length: number;

  constructor(public activatedRoute: ActivatedRoute,
    private router: Router,
    public blogsImgesService: BlogsImgesService,
    public blogsService: BlogsService) { }

  ngOnInit() {
    this.blogId = this.getBlogIdFromRoute();
    this.blogsService.getBlog(this.blogId).subscribe(response => {
      this.blog = response.data;
    }, error => {
      this.router.navigate(['/blog', 'notfound']);
    });
    this.blogsImgesService.getBlogAllImages(this.blogId).subscribe(response => {
      this.blogImageResponce = response.data;
      this.cutBlogImageResponceTwise();
      this.length = Math.ceil(this.blogImageResponce.length / 6);
    });

  }

  cutBlogImageResponceTwise() {
    this.blogImageResponceM2 = this.blogImageResponce.slice(0, (this.blogImageResponce.length + 1) / 2);
    this.blogImageResponceM1 = this.blogImageResponce.slice((this.blogImageResponce.length + 1) / 2, this.blogImageResponce.length);
  }

  getBlogIdFromRoute() {
    if (this.activatedRoute.snapshot.data.slug) {
      return this.activatedRoute.snapshot.data.slug.id;
    }
    return this.activatedRoute.snapshot.queryParams.blogId;
  }

}
