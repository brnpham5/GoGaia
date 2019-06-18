import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";

import { Observable } from "rxjs/Rx";

import { environment } from '../../../environments/environment';

import { UserData } from "./data-files/userData";
import { HeaderData } from "./data-files/headerData";
import { NotificationData } from "./data-files/notificationData";
import "rxjs/add/operator/map";

@Injectable()
export class HeaderService {
    apiUrl = environment.apiUrl;

    private getUserDataUrl: string;
    private getHeaderDataUrl: string;
    private getNotificationsUrl: string;
    
    
    constructor(
        private http: Http
    ){
        this.getUserDataUrl      = this.apiUrl + "/api/header/getUserData";
        this.getHeaderDataUrl    = this.apiUrl + "/api/header/getHeaderData";
        this.getNotificationsUrl = this.apiUrl + "/api/header/getNotifications";
    }

    getUserData(): Observable<UserData> {
        return this.http.get(this.getUserDataUrl).map(
            result => {
                let data: UserData = result.json().data;
                return data;
            }
        )
    }

    getHeaderData(): Observable<HeaderData> {
        return this.http.get(this.getHeaderDataUrl).map(
            result => {
                let data: HeaderData = result.json().data;
                return data;
            }
        )
    }

    getNotifications(): Observable<NotificationData> {
        return this.http.get(this.getNotificationsUrl).map(
            result => {
                let data: NotificationData = result.json().data;
                return data;
            }
        )
    }
}