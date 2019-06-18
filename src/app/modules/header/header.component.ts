import { Component, OnInit, HostListener, OnDestroy} from "@angular/core";
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";
import { debounceTime } from "rxjs/Operators";
import { environment } from '../../../environments/environment';

//Data Service
import { HeaderService } from "./header.service";
import { UserData } from "./data-files/userData";
import { HeaderData } from "./data-files/headerData";
import { NotificationData } from "./data-files/notificationData";

//Communication (between components) service
import { HeaderComService } from "./header-com.service";
import { HeaderModalService } from "./header-modal/header-modal.service";


@Component({
    selector: "gaia-header",
    templateUrl: "./header.component.html",
    styleUrls: [ 
        "./header.component.css"
    ],
    providers: [
        HeaderService,
        HeaderComService,
        HeaderModalService
    ]
})
export class HeaderComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;
    
    //Data
    userData: UserData;                         //user data
    headerData: HeaderData;                     //header data (background override)

    userData$: Subscription;
    headerData$: Subscription;

    //Dynamic styling (background) for the header
    repeaterStyle = {}

    //Header Communication (Between Components)
    colorPicker: string;
    colorPicker$: Subscription;

    //Flag to determine when the data has been loaded, this is mostly for styling so the header pop-in is not so bad.
    hasLoaded: boolean = false;

    //Window Width Stuff
    windowWidth$: Subscription;
    windowWidth: number;
    mobileBreakPoint: number;

    constructor(
        private headerService: HeaderService,
        private headerCom: HeaderComService,
        private headerModalService: HeaderModalService
    ) {
        this.mobileBreakPoint = headerCom.mobileBreakPoint;
    }

    @HostListener('window:orientationchange', ['$event'])
    onOrientationChange(event){
        setTimeout(()=>{
            this.headerCom.updateWindowWidth(window.innerWidth);
        }, 100);
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.headerCom.updateWindowWidth(window.innerWidth);
    }

    ngOnInit() {
        //Grab HeaderData (Backgrounds/Header Override)
        this.headerService.getHeaderData().subscribe(response => {
            this.headerCom.updateHeaderData(response); 
            this.hasLoaded = true;
        });

        this.headerData$ = this.headerCom.headerData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.headerData = response;
                //check promoItems
                if(this.headerData.repeater != null && this.headerData.repeater != ""){
                    this.repeaterStyle = {
                        'background' : "url(//" + this.headerData.repeater + ")"
                    }
                //check event engine
                } else if ( this.headerData != null && this.headerData.event_engine_header != null) {
                    this.headerData.event_engine_header.forEach((element) => {
                        this.repeaterStyle = {
                            'background' : "url(" + element.background_repeat + ")"
                        }
                    });
                } else {
                    this.repeaterStyle = {};
                }
            }
        });

        //Grab user data
        this.headerService.getUserData().subscribe(response => {
            this.headerCom.updateUserData(response);
            this.headerCom.updateHasLoaded(true);
        });

        this.userData$ = this.headerCom.userData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.userData = response;
            }
        });

        //Set up HeaderCommunication Service
        this.colorPicker$ = this.headerCom.colorPicker$.subscribe(response => {
            this.colorPicker = response;
        });

        //Subscribe to window width listener
        this.windowWidth$ = this.headerCom.windowWidth$.subscribe(response => {
            this.windowWidth = response;
        });
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.userData$.unsubscribe();
        this.headerData$.unsubscribe();
        this.colorPicker$.unsubscribe();
        this.windowWidth$.unsubscribe();
    }
}