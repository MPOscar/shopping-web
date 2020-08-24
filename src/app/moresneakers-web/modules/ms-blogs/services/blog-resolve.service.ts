import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import {Blog} from '../models/blog';
import {BlogsService} from '../services/blogs.service';

@Injectable({
  providedIn: 'root'
})
export class BlogResolveService implements Resolve<Blog> {
  constructor(private blogService: BlogsService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const slug = route.paramMap.get('slug');
    return this.blogService.getAllBlogs().toPromise().then(blogs => {
      return blogs.data.find(blog => slug === blog.title.toLowerCase().replace(/ /g, '-'));
    });
  }
}
