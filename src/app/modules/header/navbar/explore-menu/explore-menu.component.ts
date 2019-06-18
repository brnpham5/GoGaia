import { Component, OnInit, OnDestroy, Input, HostListener } from "@angular/core";
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from "@angular/animations";

import { Subscription } from "rxjs/subscription";

import { environment } from '../../../../../environments/environment';

//Header Communication Service
import { HeaderComService } from "../../header-com.service";

//Data types
import { HeaderData } from "../../data-files/headerData";
import { UserData } from "../../data-files/userData";

@Component({
    selector: "gaia-explore-menu",
    templateUrl: "./explore-menu.component.html",
    styleUrls: [
        "./explore-menu.component.css",
    ],
    animations: [
        trigger('menuState', [
            state('open', style({
                height: '*',
            })),
            state('closed', style({
                height: '0px',
            })),
            transition('open => closed', animate('175ms ease-out')),
            transition('closed => open', animate('225ms ease-out'))
        ]),
    ],
    providers: [

    ]
})
export class ExploreMenuComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;

    //Explore States
    state: string;

    //Daily Chance Data
    dcState: boolean = false;

    //HeaderData
    headerData: HeaderData;
    headerData$: Subscription;

    //Header Communication Service
    mobileBreakPoint: number;
    
    //componentData = null;
    userData: UserData;
    userData$: Subscription;

    @Input() set exploreState(state: string) {
        this.state = state;
        if(state == "closed"){
            this.closeExplore();
        }
    }

    //Fixed Width Check (true = fixed, false = responsive)
    isFixedWidth: boolean = this.headerCom.isFixedWidthStyle();

    //minimum winowheight
    minWindowHeight: number = 400;
    windowHeightCheck: boolean = true;

    @HostListener('window:orientationchange', ['$event'])
    onOrientationChange(event){
        if(this.isFixedWidth == false){
            setTimeout(()=>{
                this.minHeightCheck();
            }, 100);
        }
    }

    constructor(
        private headerCom: HeaderComService
    ){
        this.mobileBreakPoint = headerCom.mobileBreakPoint;
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.userData$ = this.headerCom.userData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.userData = response;
            }
        })

        this.headerData$ = this.headerCom.headerData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.headerData = response;
            }
        })

        this.minHeightCheck();
    }

    toggleExplore(){
        if(this.state = 'closed'){
            this.openExplore();
        } else {
            this.closeExplore();
        }
    }

    openExplore(){
        this.state = 'open';
    }

    closeExplore(){
        this.state = 'closed';
    }

    minHeightCheck(){
        if(this.isFixedWidth == false){
            if(window.innerHeight < this.minWindowHeight){
                this.windowHeightCheck = false;
            } else {
                this.windowHeightCheck = true;
            }
        }
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.userData$.unsubscribe();
        this.headerData$.unsubscribe();
    }
}