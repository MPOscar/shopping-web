import { Injectable } from '@angular/core';
//
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { ConfigService } from '../../../../config/services/config.service';
import { Release, ReleasesListResponse, ReleaseResponse } from '../models/releases';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';

export const ASCENDING = 'asc';

@Injectable({
    providedIn: 'root'
})
export class ReleasesService {

    apiEndpoint: string;

    previousFilter: any = {};

    previousSortColumn: string = 'createdAt';

    previousSortDirection: string = 'desc';

    previousPageIndex: number = 0;

    previousPageSize: number = 10;

    public releasesList = new BehaviorSubject<ReleasesListResponse>({ dataCount: 0, data: [] });

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
        this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.releases.apiEndpoint;
    }

    getReleases(filter: any, sortColumn: string, sortDirection: string, pageIndex: number, pageSize: number): Observable<ReleasesListResponse> {
        this.previousFilter = filter;
        this.previousSortColumn = sortColumn;
        this.previousSortDirection = sortDirection;
        this.previousPageIndex = pageIndex;
        this.previousPageSize = pageSize;

        let queryParams = this.formatQueryParams(
            filter,
            sortColumn, sortDirection,
            pageIndex, pageSize);
        return this.http.get<ReleasesListResponse>(this.apiEndpoint + queryParams);
    }

    reloadReleases(): Observable<ReleasesListResponse> {
        return this.getReleases(
            this.previousFilter,
            this.previousSortColumn, this.previousSortDirection,
            this.previousPageIndex, this.previousPageSize);
    }

    postRelease(data: Release): Observable<ReleaseResponse> {
        return this.http.post<ReleaseResponse>(this.apiEndpoint, JSON.stringify(data));
    }

    postReleasesCalendar(data: any): Observable<any> {
        return this.http.post<any>(this.apiEndpoint + 'search/', JSON.stringify(data));
    }

    postReleasesSearch(data: any): Observable<any> {
        return this.http.post<any>(this.apiEndpoint + 'search/', JSON.stringify(data));
    }

    getRelease(id: string): Observable<ReleaseResponse> {
        return this.http.get<ReleaseResponse>(this.apiEndpoint + id + '/');
    }

    getReleaseBySlug(slug: string): Observable<ReleaseResponse> {
      return this.http.get<ReleaseResponse>(this.apiEndpoint + '?slug=' + slug);
    }

    getRelatedReleases(styleId: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + '?styleId=' + styleId);
    }

    getReleaseAllImages(id: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + id + '/images/');
    }

    getReleasesByDateInterval(dateInterval: string): Observable<ReleaseResponse> {
        return this.http.get<ReleaseResponse>(this.apiEndpoint + '/date_interval=' + dateInterval + '/');
    }

    getReleaseStores(id: string): Observable<ReleaseResponse> {
        return this.http.get<ReleaseResponse>(this.apiEndpoint + id + '/stores/');
    }

    getReleasesCommingSoon(upComming: boolean): Observable<any> {
        let upCommingQuery = 'coming=0';
        if(upComming){
            upCommingQuery = 'coming=1';
        }
        return this.http.get<any>(this.apiEndpoint + '?' + upCommingQuery + '&ordering=updatedAt&offset=0&limit=4');
    }

    getReleasesUpComming(upComming: boolean): Observable<any> {
        let upCommingQuery = 'upcoming=0';
        if(upComming){
            upCommingQuery = 'upcoming=1';
        }
        return this.http.get<any>(this.apiEndpoint + '?' + upCommingQuery + '&ordering=-updatedAt&offset=0&limit=4');
    }

    getRelatedRealeases(styleId: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + '?styleId=' + styleId + '&ordering=releaseDate&offset=0&limit=4');
    }

    putRelease(data: Release): Observable<Release> {
        return this.http.put<Release>(this.apiEndpoint + data.id + '/', JSON.stringify(data));
    }

    deleteRelease(id: string): Observable<any> {
        return this.http.delete<any>(this.apiEndpoint + id + '/');
    }

    formatQueryParams(filter?: any, sortColumn?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): string {
        let queryParams = '';

        if (filter.sku && filter.sku.length > 0) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `sku=${filter.sku}`;
        }

        if (filter.name && filter.name.length > 0) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `name=${filter.name}`;
        }

        if (filter.brandId && filter.brandId.length > 0) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `brandId=${filter.brandId}`;
        }

        if (filter.collectionId && filter.collectionId.length > 0) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `collectionId=${filter.collectionId}`;
        }

        if (filter.category && filter.category.length > 0) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `category=${filter.category}`;
        }

        if (filter.outdated) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `outdated=${filter.outdated}`;
        }

        if (sortColumn) {
            let ordering = '';

            if (sortDirection === 'desc') {
                ordering = '-';
            }
            ordering += sortColumn;
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `ordering=${ordering}`;
        }

        if (pageIndex !== undefined) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `offset=${pageIndex * pageSize}`;
        }

        if (pageSize !== undefined) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `limit=${pageSize}`;
        }

        return queryParams;
    }

    getAllReleases(): Observable<Release[]> {
        return this.http.get<{ data: Release[] }>(this.apiEndpoint)
            .pipe(map(response => {
                return response.data;
            }));
    }

    getAllReleasesByBrand(brandId: string): Observable<Release[]> {
        return this.http.get<{ data: Release[] }>(this.apiEndpoint + '?brandId=' + brandId)
            .pipe(map(response => {
                return response.data;
            }));
    }

    getAllHottesReleasesByBrand(brandId: string): Observable<Release[]> {
        return this.http.get<{ data: Release[] }>(this.apiEndpoint + '?hot=1&brandId=' + brandId)
            .pipe(map(response => {
                return response.data;
            }));
    }

    getAllHottesReleases(): Observable<Release[]> {
        return this.http.get<{ data: Release[] }>(this.apiEndpoint + '?hot=1')
            .pipe(map(response => {
                return response.data;
            }));
    }

    getAllHottesReleasesByCategory(brandId: string): Observable<Release[]> {
        return this.http.get<{ data: Release[] }>(this.apiEndpoint + '?hot=1&categoryId=' + brandId)
            .pipe(map(response => {
                return response.data;
            }));
    }

}

