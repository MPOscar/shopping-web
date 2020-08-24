import { Injectable } from '@angular/core';
import { ErrorHandlingHttpService } from '../../../../error-handling/services/error-handling-http.service';
//
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//
import { ConfigService } from '../../../../config/services/config.service';
import { Shop, ShopsListResponse, ShopsResponse } from '../models/shops';
import { containsElement } from '@angular/animations/browser/src/render/shared';

export const ASCENDING = 'asc';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

    apiEndpoint: string;

    previousFilter: any = {};

    previousSortColumn: string = 'name';

    previousSortDirection: string = 'asc';

    previousPageIndex: number = 0;

    previousPageSize: number = 10;

    public shopsList = new BehaviorSubject<ShopsListResponse>({ dataCount: 0, data: [] });

    constructor(
        private configService: ConfigService,
        private http: ErrorHandlingHttpService) {
            this.apiEndpoint = this.configService.apiUrl + this.configService.config.apiConfigs.shops.apiEndpoint;
    }

    //
    // Begin functions that most services have.
    //

    getShops(filter: any, sortColumn: string, sortDirection: string, pageIndex: number, pageSize: number): Observable<ShopsListResponse> {
        this.previousFilter = filter;
        this.previousSortColumn = sortColumn;
        this.previousSortDirection = sortDirection;
        this.previousPageIndex = pageIndex;
        this.previousPageSize = pageSize;

        let queryParams = this.formatQueryParams(
            filter,
            sortColumn, sortDirection,
            pageIndex, pageSize);
        return this.http.get<ShopsListResponse>(this.apiEndpoint + queryParams);
    }

    //
    // Call this function to repeat the previous query, after deleting
    // a brand for example.
    //

    reloadShops(): Observable<ShopsListResponse> {
        return this.getShops(
            this.previousFilter,
            this.previousSortColumn, this.previousSortDirection,
            this.previousPageIndex, this.previousPageSize);
    }

    postShop(data: Shop): Observable<ShopsResponse> {
        return this.http.post<ShopsResponse>(this.apiEndpoint, JSON.stringify(data));
    }

    getShop(id: string): Observable<ShopsResponse> {
        return this.http.get<ShopsResponse>(this.apiEndpoint + id + '/');
    }

    getMostPopularShops(): Observable<ShopsListResponse> {
        return this.http.get<ShopsListResponse>(this.apiEndpoint + '/?ordering=rank&active=1&offset=0&limit=3');
    }

    getShopCountries(): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + 'countries/');
    }

    postShopLinkedSubShops(id: string, data: Array<string>): Observable<Shop> {
        return this.http.post<Shop>(this.apiEndpoint + id + '/shops/', JSON.stringify(data));
    }

    getShopLinkedSubShops(id: string): Observable<any> {
        return this.http.get<any>(this.apiEndpoint + id + '/shops/');
    }

    putShop(data: Shop): Observable<Shop> {
        return this.http.put<Shop>(this.apiEndpoint + data.id + '/', JSON.stringify(data));
    }

    deleteShop(id: string): Observable<any> {
        return this.http.delete<any>(this.apiEndpoint + id + '/');
    }



    formatQueryParams(filter?: any, sortColumn?: string, sortDirection?: string, pageIndex?: number, pageSize?: number): string {
        let queryParams = '';

        if (filter.name && filter.name.length > 0) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `name=${filter.name}`;
        }

        if (filter.status && filter.status.length > 0) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `active=${filter.status}`;
        }

        if (filter.isParent === 0 || filter.isParent === 1) {
            queryParams += queryParams.length > 0 ? '&' : '?';
            queryParams += `isParent=${filter.isParent}`;
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

    //
    // End functions that most services have.
    //

    //
    // Begin special functions specific to only this service.
    //

    getAllShops(): Observable<Shop[]> {
        return this.http.get<{ data: Shop[] }>(this.apiEndpoint + '?active=1')
            .pipe(map(response => {
                return response.data;
            }));
    }

    getAllShopsByShippingCountries(shippingCountries: string): Observable<Shop[]> {
        return this.http.get<{ data: Shop[] }>(this.apiEndpoint + '?shippingCountries=' + shippingCountries + "&active=1&hasParent=0")
            .pipe(map(response => {
                return response.data;
            }));
    }

    postShopsSearch(data: any): Observable<any> {
        return this.http.post<any>(this.apiEndpoint + 'search/', JSON.stringify(data));
    }

    //
    // End special functions specific to only this service.
    //

}

