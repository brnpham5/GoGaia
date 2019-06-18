import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, HostListener } from "@angular/core";
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from "@angular/animations";

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../../../environments/environment';

import { UserData } from "../../data-files/userData";

//Header Communication Service
import { HeaderComService } from "../../header-com.service";

//Menu Data
import { FullMenu } from "../menu-data/full-menu";
import { MenuMyGaiaData } from "../menu-data/menu-mygaia";
import { MenuGcashData } from "../menu-data/menu-gcash";
import { MenuShopsData } from "../menu-data/menu-shops";
import { MenuForumsData } from "../menu-data/menu-forums";
import { MenuWorldData } from "../menu-data/menu-world";
import { MenuGamesData } from "../menu-data/menu-games";
import { MenuChannelData } from "../menu-data/menu-channel";
import { MenuModerateData } from "../menu-data/menu-moderate";
import { Element } from "@angular/compiler";

enum BurgerNames {
    myGaia,
    gcash,
    shops,
    forums,
    world,
    games,
    channel,
    moderate,
    color
}

@Component({
    selector: "gaia-burger-menu",
    templateUrl: "./burger-menu.component.html",
    styleUrls: [
        "./burger-menu.component.css"
    ],
    animations: [
        trigger('burgerState', [
            state('open', style({
                height: '*'
            })),
            state('closed', style({
                height: '0px'
            })),
            transition('open => closed', animate('225ms ease-out')),
            transition('closed => open', animate('225ms ease-out'))
        ]),
    ],
})
export class BurgerMenuComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;
    
    userData: UserData;
    userData$: Subscription;

    state: string;
    @Input() set burgerState(state: string) {
        this.state = state;
        if(state == "closed"){
            this.closeAllBurgers();
        }
    }

    //Burger Menu States
    burgerNames = BurgerNames;  //enum
    burgerStates: Map<string, string> = new Map<string, string>();

    //Header Communication Service
    colorPicker: string;
    colorPicker$: Subscription;
    mobileBreakPoint: number;
    primaryBG = {};
    secondaryBG = {};

    //Menus
    menuMyGaia: FullMenu;
    menuGcash: FullMenu;
    menuShops: FullMenu;
    menuForums: FullMenu;
    menuWorld: FullMenu;
    menuGames: FullMenu;
    menuChannel: FullMenu;
    menuModerate: FullMenu;

    //Fixed Width Check (true = fixed, false = responsive)
    isFixedWidth: boolean = true;

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
        private headerCom: HeaderComService,
        private menuMyGaiaData: MenuMyGaiaData = new MenuMyGaiaData(),
        private menuGcashData: MenuGcashData = new MenuGcashData(),
        private menuShopsData: MenuShopsData = new MenuShopsData(),
        private menuForumsData: MenuForumsData = new MenuForumsData(),
        private menuWorldData: MenuWorldData = new MenuWorldData(),
        private menuGamesData: MenuGamesData = new MenuGamesData(),
        private menuChannelData: MenuChannelData = new MenuChannelData(),
        private menuModerateData: MenuModerateData = new MenuModerateData()
    ) { 
        //Initialize states
        this.burgerStates[this.burgerNames.myGaia] = 'closed';
        this.burgerStates[this.burgerNames.gcash] = 'closed';
        this.burgerStates[this.burgerNames.shops] = 'closed';
        this.burgerStates[this.burgerNames.forums] = 'closed';
        this.burgerStates[this.burgerNames.world] = 'closed';
        this.burgerStates[this.burgerNames.games] = 'closed';
        this.burgerStates[this.burgerNames.channel] = 'closed';
        this.burgerStates[this.burgerNames.moderate] = 'closed';
        this.burgerStates[this.burgerNames.color] = 'closed';

        this.mobileBreakPoint = this.headerCom.mobileBreakPoint;

        //Setup Menus
        this.menuMyGaia = menuMyGaiaData;
        this.menuGcash = menuGcashData;
        this.menuShops = menuShopsData;
        this.menuForums = menuForumsData;
        this.menuWorld = menuWorldData;
        this.menuGames = menuGamesData;
        this.menuChannel = menuChannelData;
        this.menuModerate = menuModerateData;

        this.isFixedWidth = this.headerCom.isFixedWidthStyle();
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.colorPicker$ = this.headerCom.colorPicker$.subscribe(
            response => {
                this.colorPicker = response;
                this.primaryBG = {
                    'background-color': this.headerCom.getCustomPrimary(),
                    'color': "#ffffff"
                }
            
                this.secondaryBG = {
                    'background-color': this.headerCom.getCustomSecondary(),
                }
            }
        )

        this.userData$ = this.headerCom.userData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.userData = response;
            }
        })
        this.minHeightCheck();
    }

    toggleBurgerState(menuEnum: number){
        if(this.burgerStates[menuEnum] == 'closed'){
            this.burgerStates[menuEnum] = 'open';
            this.closeOtherBurgers(menuEnum);
        } else {
            this.burgerStates[menuEnum] = 'closed';
        }
    }

    //Close other burger menus 
    closeOtherBurgers(menuEnum: number){
        let size = Object.keys(this.burgerNames).length / 2;
        if(menuEnum >= 0 && menuEnum <= size){
            for(let i = 0; i <= size; i++){              
                if(i != menuEnum){
                    this.burgerStates[i] = 'closed';
                }
            }
        }
    }

    //Close all burger menus
    closeAllBurgers(){
        let size = Object.keys(this.burgerNames).length / 2;
        for(let i = 0; i <= size; i++){              
            this.burgerStates[i] = 'closed';
        }
    }

    closeEverything(){
        this.closeAllBurgers();
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

    //GSearch Section (Should really be its own component, but I'll set it like this for now to save time...)
    //GSeach Variables
    searchString: string;
    gsearchStatus: boolean;
    searchItems = [
        {'value': '4718', 'viewValue': 'All'},
        {'value': '4710', 'viewValue': 'Users'},
        {'value': '4714', 'viewValue': 'Forums'},
        {'value': '4712', 'viewValue': 'Guilds'},
        {'value': '4716', 'viewValue': 'Items'},
        {'value': '4722', 'viewValue': 'Favorites'}
    ];

    searchAction: string = "/gsearch/";
    trackParam: string  = "?_gaia_t_=";
    trackingCode: string = "";

    inputState: string = 'closed';

    @ViewChild('gsearchBurgerForm') gsearchForm: ElementRef;
    @ViewChild('gsearchBurgerInput') gsearchInput: ElementRef;

    selectGSearch(args){
        this.trackingCode = args.target.value;
        //console.log(args.target.options[args.target.selectedIndex].text);
        //Not so good item search redirect
        if(this.trackingCode == "4716"){
            this.searchAction = "/marketplace/itemsearch/"
        } else {
            this.searchAction = "/gsearch/" + args.target.options[args.target.selectedIndex].text.toLowerCase();
        }
        this.gsearchInput.nativeElement.focus();
    }

    isItemSearch(): string{
        if(this.trackingCode == "4716"){
            return "&search=" + this.searchString;
        }

        return "";
    }

    submitGSearch(){
        this.gsearchForm.nativeElement.submit();
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.userData$.unsubscribe();
    }
}