import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Subscription } from 'rxjs/subscription';

import { environment } from '../../../../environments/environment';

import { UserData } from "../data-files/userData";
import { HeaderData } from "../data-files/headerData";

//Services
import { HeaderComService } from "../header-com.service";
import { HeaderModalService } from "../header-modal/header-modal.service";

@Component({
    selector: 'gaia-header-content',
    templateUrl: './header-content.component.html',
    styleUrls: [ './header-content.component.css' ]
})
export class HeaderContentComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;
    aviUrl = environment.aviUrl;

    userData: UserData;
    userData$: Subscription;

    //Header Data
    headerData: HeaderData;
    headerData$: Subscription;
    headerBG: string;
    headerBgStyle: {};
    windowWidth: number;
    windowWidth$: Subscription;

    hasDailyChance: boolean;
    dcNumber: number;
    hasDailyTreat: boolean;
    dtNumber: number;

    //States
    nameDropDownState: string = 'closed';

    //Header Communication Service
    mobileBreakPoint: number;

    //Header styling variables
    maxHeight: number = 150;
    minHeight: number = 52;
    currentHeight: number = this.maxHeight;
    headerHeightStyle = {};
    headerBlurStyle = {};

    defaultPortraitTop = 50;
    minHeightPortrait = 98;
    headerPortraitStyle = {};
    headerAvatarStyle = {};

    hasLoaded: boolean = false;
    hasLoaded$: Subscription;

    //fixed width check
    fixedWidth: boolean = true;
    fullWidth: boolean = false;

    //minimum winowheight
    minWindowHeight: number = 400;
    windowHeightCheck: boolean = true;
    
    constructor(
        private headerCom: HeaderComService,
        private headerModalService: HeaderModalService
    ) { 
        this.mobileBreakPoint = this.headerCom.mobileBreakPoint;
        this.currentHeight = window.scrollY;
        this.fixedWidth = this.headerCom.isFixedWidthStyle();
        this.fullWidth = this.headerCom.isFullWidthStyle();
    }

    ngOnInit() {
        this.checkContentHeight();
        //this.minHeightCheck();
        this.headerData$ = this.headerCom.headerData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.headerData = response;
                if(this.headerData != null && this.headerData.header != "" && this.headerData.header != undefined){
                    this.headerBG = "url(//" + this.headerData.header + ")"
                    this.headerBgStyle = {
                        'background' : this.headerBG
                    }
                //check event engine
                } else if (this.headerData != null && this.headerData.event_engine_header != null && this.headerData.event_engine_header != undefined) {
                    this.headerData.event_engine_header.forEach((element) => {
                        this.headerBG = "url(" + element.background + ")";
                        this.headerBgStyle = {
                            'background' : this.headerBG
                        }
                    });
                } else {
                    this.headerBgStyle = {};
                }
            }
        });

        this.windowWidth$ = this.headerCom.windowWidth$.subscribe(response => {
            this.windowWidth = response;
        })

        this.userData$ = this.headerCom.userData$.subscribe(response => {
            this.userData = response;
            
        });

        this.hasLoaded$ = this.headerCom.hasLoaded$.subscribe(response => {
            this.hasLoaded = response;
        })
    }

    //Scroll listener to hide the gaia header
    @HostListener('window:scroll', ['$event'])
    scrollEvent(event): void {
        this.checkContentHeight();
    }

    /*
    @HostListener('window:orientationchange', ['$event'])
    onOrientationChange(event){
        if(this.fixedWidth == false){
            setTimeout(()=>{
                this.minHeightCheck();
            }, 100);
        }
    }
    */

    checkContentHeight(){
        if(this.fixedWidth == false) {
            this.styleContentHeight();
        }
    }

    minHeightCheck(){
        if(this.fixedWidth == false){
            if(window.innerHeight < this.minWindowHeight){
                this.windowHeightCheck = false;
            } else {
                this.windowHeightCheck = true;
            }
            this.styleContentHeight();
        }
    }

    styleContentHeight(){
        let blur: number = 0;
        let portraitTop: number = 0;
        let portraitOpacity: number = 1;
        let avatarOpacity: number = 1;
        //if(this.windowHeightCheck == false){
        //    this.currentHeight = 0;
        //} else {
            this.currentHeight = this.calcScrollY();
            
            if(this.currentHeight >= 150){
                blur = 0;
                portraitTop = this.defaultPortraitTop;
            } else {
                blur = (125 / this.currentHeight) * (125 / this.currentHeight);
                if(this.currentHeight <= this.minHeightPortrait){
                    portraitTop = this.currentHeight - this.defaultPortraitTop;
                    avatarOpacity = (this.currentHeight - this.defaultPortraitTop) / this.defaultPortraitTop;
                    portraitOpacity = (this.minHeight / this.currentHeight);
                } else {
                    portraitTop = this.defaultPortraitTop;
                }
            }
        //}
        this.headerHeightStyle = {
            'height': this.currentHeight.toString() + "px"
        }

        this.headerBgStyle = {
            'background' : this.headerBG,
            'filter': 'blur(' + blur.toString() + 'px)'
        }

        this.headerPortraitStyle = {
            'top' : portraitTop.toString() + 'px',
            'opacity': portraitOpacity.toString()
        }

        this.headerAvatarStyle = {
            'opacity' : avatarOpacity.toString()
        }
    }

    toggleNameDropDown(){
        if(this.nameDropDownState == 'closed'){
            this.nameDropDownState = 'open';
        } else {
            this.nameDropDownState = 'closed';
        }
    }

    openNameDropDown(){
        this.nameDropDownState = 'open';
    }

    closeNameDropDown(){
        this.nameDropDownState = 'closed';
    }

    calcScrollY(): number {
        let height = this.maxHeight - window.scrollY;
        if( height > this.maxHeight ){
            return this.maxHeight;
        } else if ( height <= this.maxHeight && height > this.minHeight ) {
            return height;
        } else if( height <= this.minHeight ) {
            return this.minHeight;
        } else {
            return this.minHeight;
        }
    }

    openNameDropDownModal(){
        this.headerModalService.updateNameDropDownStatus(true);
    }
    
    closeNameDropDownModal(){
        this.headerModalService.updateNameDropDownStatus(false);
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.headerData$.unsubscribe();
        this.userData$.unsubscribe();
        this.windowWidth$.unsubscribe();
        this.hasLoaded$.unsubscribe();
    }
}