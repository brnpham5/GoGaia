import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";

import { Observable } from "rxjs/Rx";

import { environment } from '../../../../../environments/environment';

import { GSearchData } from "./gsearch";

import "rxjs/add/operator/map";

@Injectable()
export class GSearchService {
    private apiUrl = environment.apiUrl;

    private getSuggestUrl: string;

    constructor(
        private http: Http
    ){
        this.getSuggestUrl  = this.apiUrl + "/gsearch/ajax/suggest";
    }

    getSuggest(): Observable<Array<GSearchData>>{
        return this.http.get(this.getSuggestUrl).map( response => {
            let data: Array<GSearchData> = response.json().data;
            return data;
        })
    }
}