import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';

export interface HttpOptions {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    params?: HttpParams | { [param: string]: string | string[] };
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(
        private http: HttpClient,
        private config: ConfigService,
        private logger: LoggerService
    ) { }

    get<T>(endpoint: string, options?: HttpOptions): Observable<T> {
        const url = this.config.getApiEndpoint(endpoint);
        this.logger.log(`GET: ${url}`, options);

        return this.http.get<T>(url, options).pipe(
            timeout(this.config.apiTimeout),
            catchError(this.handleError.bind(this))
        );
    }

    post<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
        const url = this.config.getApiEndpoint(endpoint);
        this.logger.log(`POST: ${url}`, { body, options });

        return this.http.post<T>(url, body, options).pipe(
            timeout(this.config.apiTimeout),
            catchError(this.handleError.bind(this))
        );
    }

    put<T>(endpoint: string, body: any, options?: HttpOptions): Observable<T> {
        const url = this.config.getApiEndpoint(endpoint);
        this.logger.log(`PUT: ${url}`, { body, options });

        return this.http.put<T>(url, body, options).pipe(
            timeout(this.config.apiTimeout),
            catchError(this.handleError.bind(this))
        );
    }

    delete<T>(endpoint: string, options?: HttpOptions): Observable<T> {
        const url = this.config.getApiEndpoint(endpoint);
        this.logger.log(`DELETE: ${url}`, options);

        return this.http.delete<T>(url, options).pipe(
            timeout(this.config.apiTimeout),
            catchError(this.handleError.bind(this))
        );
    }

    private handleError(error: any): Observable<never> {
        this.logger.error('HTTP Error:', error);
        return throwError(() => error);
    }
}