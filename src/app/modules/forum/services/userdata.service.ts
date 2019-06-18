import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../../../environments/environment';

import { UserData } from '../classes/userdata';

@Injectable()
export class UserDataService {
    
    private static API_PATH: string = '/api/userdata';
    
    constructor(private http: Http) {}

    getUserData(): Promise<UserData> {
        const url = this.getUrl(UserDataService.API_PATH);
        return this.http.get(url)
            .toPromise()
            .then(response => {
                const data = response.json().data;
                return new UserData(data);
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('API request error', error);
        return Promise.reject(error.message || error);
    }

    private getUrl(path: string): string {
        return `${environment.apiUrl}${path}`;
    }
}
