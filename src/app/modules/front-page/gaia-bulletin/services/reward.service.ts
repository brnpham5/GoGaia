import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { ClaimData, RewardData } from './reward';

import 'rxjs/add/operator/map';

import { environment } from "../../../../../environments/environment";

@Injectable()
export class RewardService {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;

    private nonceUrl: string;
    private claimRewardUrl: string;
    private currencyTypeUrl: string;
    private headers = new Headers({'Content-type': 'application/json'});

    constructor(
        private  http: Http
    ){
        this.nonceUrl = this.apiUrl + "/gaiabulletin/api/nonce";
        this.claimRewardUrl = this.apiUrl + "/gaiabulletin/api/claimReward";
        this.currencyTypeUrl = this.apiUrl + "/gaiabulletin/api/currencyType";
    }

    /**
     * API - POST - sends a post to get a nonce string
     * @param sequence : number
     * @returns data: any
     */
    getNonce(sequence: number): Observable<string> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        let params: URLSearchParams = new URLSearchParams();

        let seq: string = String(sequence);
        // Dynamically serialize the entire object
        // *** THIS IS THE SERIALIZATION ***
        params.set('sequence', seq);
        return this.http.post(this.nonceUrl, params, options)
            .map(res => {
                let data = res.json().data;
                return data;
            })
            .catch(this.handleError);
    }

    /**
     * API - POST - sends a post to attempt to claim a reward
     * @param claimData : ClaimData
     * @returns response 
     */
    claimReward(claimData: ClaimData): Observable<RewardData> {
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });

        // Dynamically serialize the entire object
        // *** THIS IS THE SERIALIZATION ***
        let params: URLSearchParams = this.serialize(claimData);

        return this.http.post(this.claimRewardUrl, params, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCurrencyType(): Observable<number> {
        return this.http.get(this.currencyTypeUrl).map(
            result => {
                let data: number = result.json().data;
                return data;
            }
        )
    }

    /**
     * Serializes the form element so it can be passed to the back end through the url.
     * The objects properties are the keys and the objects values are the values.
     * ex: { "a":1, "b":2, "c":3 } would look like ?a=1&b=2&c=3
     * @param  {VetStatus} obj - The topic status to be url encoded
     * @returns URLSearchParams - The url encoded system setup
     */
    serialize(obj: any): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];
                params.set(key, element);
            }
        }
        return params;
    }

    /**
     * Gets the data out of the package from the AJAX call.
     * @param  {Response} res - AJAX response
     * @returns A json of the returned data
     */
    extractData(res: Response): any {
        let body = res.json().data;
        if (body === 'failed') {
          body = {};
        }
        return body || {};
    }

    /**
     * Handles the AJAX error if the call failed or exited with exception. Print out the error message.
     * @param  {any} error - An error json object with data about the error on it
     * @returns Promise - A promise with the error message in it
     */
    private handleError(error: any): Promise<void> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}