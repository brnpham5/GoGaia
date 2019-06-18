import { Component, OnInit, OnDestroy, Input, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from "@angular/animations";

import { Subscription } from "rxjs/subscription";

import { environment } from '../../../../../environments/environment';

import { GSearchData } from "./gsearch";

//GSearch Service
import { GSearchService } from "./gsearch.service";
import { HeaderComService } from "../../header-com.service";

@Component({
    selector: "gsearch-popup",
    templateUrl: "./gsearch-popup.component.html",
    styleUrls: [
        "./gsearch-popup.component.css",
    ],
    animations: [
        trigger('popupState', [
            state('open', style({
                height: '*',
            })),
            state('closed', style({
                height: '0px'
            })),
            transition('open => closed', animate('175ms ease-out')),
            transition('closed => open', animate('225ms ease-out'))
        ]),
    ],
    providers: [
        GSearchService
    ]
})
export class GSearchPopupComponent implements OnInit {
    private apiUrl = environment.apiUrl;
    private cdnUrl = environment.cdnUrl;
    private aviUrl = environment.aviUrl;

    searchString: string;
    @Input() set setSearchString(data: string){
        this.searchString = data;
        this.clearAllMatches();
        this.parseString();
    }

    status: boolean;
    @Input() set setStatus(status: boolean){
        this.status = status;
        if(status == true && this.matches > 0){
            this.state = 'open';
        } else {
            this.state = "closed";
        }
    }

    //GSearch Data
    gsearchData: Array<GSearchData>;
    matchedData: Array<GSearchData>;

    matchFeature: Array<GSearchData>;
    matchFriend: Array<GSearchData>;
    matchGuild: Array<GSearchData>;
    matchForum: Array<GSearchData>;

    //Search Criteria
    max_results: number = 10;
    matches: number = 0;
    countFeature: number = 0;
    countFriend: number = 0;
    countGuild: number = 0;
    countForum: number = 0;

    //Animation State
    state = "closed";

    //Styling
    isHovered: Map<number, boolean> = new Map<number, boolean>();
    primaryBG = {};
    primaryBorder = {};
    secondaryBG = {};
    textColor = {};
    colorPicker: string;
    colorPicker$: Subscription;

    //Float styling
    withinViewPort: boolean;
    rightSide: number = 0;
    windowWidth: number;
    windowWidth$: Subscription;

    @ViewChild('gsearchPopup') el: ElementRef;

    constructor(
        private gsearchService: GSearchService,
        private headerCom: HeaderComService
    ){

    }

    ngOnInit(){
        //API Get GSearch Data
        this.gsearchService.getSuggest().subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.gsearchData = response;
            }
        });

        //Color Picker Styling
        this.colorPicker$ = this.headerCom.colorPicker$.subscribe(
            response => {
                this.colorPicker = response; 
                this.textColor = {
                    'color': this.headerCom.getCustomText()
                }

                this.primaryBG = {
                    'background-color': this.headerCom.getCustomPrimary()
                }

                this.primaryBorder = {
                    'border': "2px solid" + this.headerCom.getCustomPrimary()
                }
        
                this.secondaryBG = {
                    'background-color': this.headerCom.getCustomSecondary()
                }
            }
        )

        this.windowWidth$ = this.headerCom.windowWidth$.subscribe(response => {
            this.windowWidth = response;
            this.checkWithinViewport();
        })

        this.rightSide = this.el.nativeElement.getBoundingClientRect().right;
    }

    //Parse the list of gsearchData with the inputted search string
    parseString(){
        if(this.searchString != null && this.searchString.length > 0){
            //Iterate through the list, up to 10 matches
            for(let i = 0; i < this.gsearchData.length && this.matches < this.max_results; i++){
                let item = this.gsearchData[i];

                //Try to match the input with the list
                try {
                    if(item.name.toLowerCase().match(this.searchString.toLowerCase())){
                        //Deal with the different categories of items
                        switch(item.c){
                            case 'friend':{
                                if(this.countFriend < 5){
                                    let data = new GSearchData();
                                    data.name = item.name;
                                    data.icon = "/gaia/members/" + item.icon;
                                    data.url = item.url;
                                    data.c = item.c;
                                    this.matchFriend.push(data);
                                    this.matchedData.push(item);
                                    this.countFriend++;
                                    this.matches++;
                                    this.isHovered[this.matches] = false;
                                }
                                break;
                            }
                                
                            case 'feature':{
                                if(this.countFeature < 5){
                                    this.matchFeature.push(item);
                                    this.matchedData.push(item);
                                    this.countFeature++;
                                    this.matches++;
                                    this.isHovered[this.matches] = false;
                                }
                                break;
                            }
                                
                            case 'forum':{
                                item.icon = "/images/angular_header/navbar-icons/forums/icon_chat.png";
                                this.matchForum.push(item);
                                this.matchedData.push(item);
                                this.countForum++;
                                this.matches++;
                                this.isHovered[this.matches] = false;
                                break;
                            }
                                
                            case 'guild':{
                                if(this.countGuild < 5){
                                    item.icon = "/images/angular_header/navbar-icons/forums/icon_guilds.png";
                                    this.matchGuild.push(item);
                                    this.matchedData.push(item);
                                    this.countGuild++;
                                    this.matches++;
                                    this.isHovered[this.matches] = false;
                                }
                                break;
                            }
                        }
                    }
                } catch(e) {
                    //Invalid Character Inputted
                }
            }
        }
        if(this.matches > 0 && this.status == true){
            this.state = 'open';
            this.rightSide = this.el.nativeElement.getBoundingClientRect().right;
        } else {
            this.state = 'closed';
        }
    }

    clearAllMatches(){
        this.matchedData = [];
        this.matchFeature = [];
        this.matchForum = [];
        this.matchFriend = [];
        this.matchGuild = [];

        this.matches = 0;
        this.countFeature = 0;
        this.countForum = 0;
        this.countFriend = 0;
        this.countGuild = 0;
    }

    //BG Styling
    setSecondaryBG(category: string, idx: number, status: boolean){
        switch(category){
            case 'friend': {
                this.isHovered[idx] = status;
                break;
            }
            case 'feature':{
                idx = idx + this.countFriend;
                this.isHovered[idx] = status;
                break;
            }
            case 'forum':{
                idx = idx + this.countFriend + this.countFeature;
                this.isHovered[idx] = status;
                break;
            }

            case 'guild':{
                idx = idx + this.countFriend + this.countFeature + this.countForum;
                this.isHovered[idx] = status;
                break;
            }
            default:
        }
    }

    checkWithinViewport(){
        if(this.windowWidth > this.rightSide){
            this.withinViewPort = true;
        } else if( this.windowWidth <= this.rightSide){
            this.withinViewPort = false;
        }
    }

}