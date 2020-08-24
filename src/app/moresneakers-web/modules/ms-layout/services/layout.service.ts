import { Injectable } from '@angular/core';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
//
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { ConfigService } from '../../../../config/services/config.service';
import { Blog, BlogsListResponse, BlogsResponse } from '../models/blog';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

    apiEndpoint: string;

    previousFilter: any = {};

    previousSortColumn: string = 'title';

    previousSortDirection: string = 'asc';

    previousPageIndex: number = 0;

    previousPageSize: number = 10;

    public blogsList = new BehaviorSubject<BlogsListResponse>({ dataCount: 0, data: [] });

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.layouts.apiEndpoint;
    }

    getLayout(pageId: string, layoutPage: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + pageId + '/' + layoutPage);
    }

    getLayoutWhatsNew(): Observable<BlogsResponse> {
        return this.http.get<BlogsResponse>(this.apiEndpoint + 'whatsnew/');
    }

    getAllBlogs(): Observable<BlogsResponse> {
        return this.http.get<BlogsResponse>(this.apiEndpoint);
    }

    getReleaseCalendar(): Observable<BlogsResponse> {
        return this.http.get<BlogsResponse>(this.apiEndpoint + 'release_calendar/');
    }

    putBlog(data: Blog): Observable<Blog> {
        return this.http.put<Blog>(this.apiEndpoint + data.id + '/', JSON.stringify(data));
    }

    deleteBlog(id: string): Observable<any> {
        return this.http.delete<any>(this.apiEndpoint + id + '/');
    }

    getOurPartners(pageId: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + pageId + '/ourpartners_tabs');
    }

    getSliders(pageId: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + pageId + '/slider');
    }

    getHeader(pageId: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + pageId + '/header');
    }

    getHottest(pageId: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + pageId + '/hottest');
    }

    getMenu (pageId: string): Observable<any> {
      return this.http.get<any>(this.apiEndpoint + pageId + '/menu');
    }
}

