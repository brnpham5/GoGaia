import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { UPE_Bulletin } from './bulletin';

import { environment } from "../../../../../environments/environment";

@Injectable()
export class BulletinService {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;

    private bulletinUrl: string;
    private offsetBulletinUrl: string;
    private headlineBulletinUrl: string;
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(
        private  http: Http
    ){
        this.bulletinUrl = this.apiUrl + '/gaiabulletin/api/bulletin';
        this.offsetBulletinUrl = this.apiUrl + '/gaiabulletin/api/offsetBulletin';
        this.headlineBulletinUrl = this.apiUrl + '/gaiabulletin/api/headlineBulletin';
    }

    /**
     * API - GET - Gets ALL the bulletin announcements
     */
    getBulletins(): Observable<UPE_Bulletin[]> {
        return this.http.get(this.bulletinUrl).map(
            result => {
                let data: UPE_Bulletin[] = result.json().data;
                return data;
            }
        )
    }

    /**
     * API - GET - Gets the offset bulletin announcements
     */
    getOffsetBulletins(offset: number = 0, limit: number = 10): Observable<UPE_Bulletin[]>{
        return this.http.get(this.offsetBulletinUrl + '/?offset=' + offset + '&limit=' + limit).map(
            result => {
                let data: UPE_Bulletin[] = result.json().data;
                return data;
            }
        )
    }

    /**
     * API - GET - Gets the headline bulletins
     */
    getHeadlineBulletins(): Observable<UPE_Bulletin[]>{
        return this.http.get(this.headlineBulletinUrl).map(
            result => {
                let data: UPE_Bulletin[] = result.json().data;
                return data;
            }
        )
    }
}