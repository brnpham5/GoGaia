import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";

import { Observable } from "rxjs/Rx";

import "rxjs/add/operator/map";

import { Community } from "./community";

import { environment } from "../../../../../environments/environment";

@Injectable()
export class CommunityService {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;

    private communityUrl: string;
    private offsetCommunityUrl: string;
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(
        private  http: Http
    ){
        this.communityUrl = this.apiUrl + "/gaiabulletin/api/getApproved";
        this.offsetCommunityUrl = this.apiUrl + "/gaiabulletin/api/getOffSetApproved";
    }

    /**
     * API - GET - gets ALL the community posts
     */
    getCommunityPosts(): Observable<Community[]> {
        return this.http.get(this.communityUrl).map(
            result => {
                let data: Community[] = result.json().data;
                return data;
            }
        )
    }

    /**
     * API - GET - Gets the offset community posts
     */
    getOffsetCommunityPosts(offset:number = 0, limit:number = 20): Observable<Community[]> {
        return this.http.get(this.offsetCommunityUrl + "/?offset=" + offset + "&limit=" + limit).map(
            result => {
                let data: Community[] = result.json().data;
                return data;
            }
        )
    }
}