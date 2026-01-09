import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { IUserLogin } from '../models/IUserLogin';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private static readonly apiURL = 'administration/';

    constructor(
        private http: HttpClient,
        private config: ConfigService,
    ) { }

    login(userInfo: IUserLogin): Observable<boolean> {
        return this.http.post<any>(this.config.getApiEndpoint(AuthService.apiURL) + 'Auth/login', userInfo, { withCredentials: true })
            .pipe(map(token => {
                // this.tokenSubject.next(token);
                console.log('Token recibido:', token);
                return token;
            }));
    };
}
