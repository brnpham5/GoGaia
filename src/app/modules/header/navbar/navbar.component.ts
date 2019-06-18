import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from "@angular/animations";

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../../environments/environment';

//Data Types
import { UserData } from "../data-files/userData";
import { MenuContentData } from "./menu-data/menuContentData";

//Header Communication Service
import { HeaderComService } from "../header-com.service";

//Menu Data
import { FullMenu } from "./menu-data/full-menu";
import { MenuMyGaiaData } from "./menu-data/menu-mygaia";
import { MenuGcashData } from "./menu-data/menu-gcash";
import { MenuShopsData } from "./menu-data/menu-shops";
import { MenuForumsData } from "./menu-data/menu-forums";
import { MenuWorldData } from "./menu-data/menu-world";
import { MenuGamesData } from "./menu-data/menu-games";
import { MenuChannelData } from "./menu-data/menu-channel";
import { MenuModerateData } from "./menu-data/menu-moderate";
import { Observable } from "rxjs/Observable";

enum MenuNames {
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
    selector: "gaia-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: [
        "./navbar.component.css"
    ],
    animations: [
        trigger("menuState", [
            state("open", style({
                height: '*',
                overflow: 'auto'
            })),
            state("closed", style({
                height: '0px',
                overflow: 'hidden',
            })),
            state("exploreOpenIcon", style({
                //transform: "rotate(180deg)"
            })),
            state("exploreClosedIcon", style({
                //transform: "rotate(0deg)"
            })),
            state("burgerOpenMenuIcon", style({
                transform: "rotate(45deg)",
                opacity: '0'
            })),
            state("burgerClosedMenuIcon", style({
                opacity: '1'
            })),
            state("burgerOpenXIcon", style({
                opacity: '1'
            })),
            state("burgerClosedXIcon", style({
                transform: "rotate(-45deg)",
                opacity: '0'
            })),
            transition("open => closed", animate("150ms ease-out")),
            transition("closed => open", animate("250ms ease-out")),
            transition("exploreOpenIcon => exploreClosedIcon", animate("250ms ease-out")),
            transition("exploreClosedIcon => exploreOpenIcon", animate("250ms ease-out")),
            transition("burgerOpenMenuIcon => burgerClosedMenuIcon", animate("250ms 75ms ease-in-out")),
            transition("burgerClosedMenuIcon => burgerOpenMenuIcon", animate("250ms ease-in-out")),
            transition("burgerOpenXIcon => burgerClosedXIcon", animate("250ms ease-in-out")),
            transition("burgerClosedXIcon => burgerOpenXIcon", animate("250ms 75ms ease-in-out")),
        ]),
        trigger("searchBarState", [
            state("open", style({
                width: '*',
            })),
            state("closed", style({
                width: '0px',
                padding: '0'
            })),
            state("selectOpen", style({
                height: '*'
            })),
            state("selectClosed", style({
                height: '0px'
            })),
            transition("open => closed", animate("150ms ease-out")),
            transition("closed => open", animate("250ms ease-out")),
            transition("selectOpen => selectClosed", animate("150ms ease-out")),
            transition("selectClosed => selectOpen", animate("250ms ease-out")),
        ])
    ],
    providers: [
        MenuMyGaiaData,
        MenuGcashData,
        MenuShopsData,
        MenuForumsData,
        MenuWorldData,
        MenuGamesData,
        MenuChannelData,
        MenuModerateData
    ]
})
export class NavBarComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;
    aviUrl = environment.aviUrl;
    
    domain = window.location.hostname;

    //Menu States
    menuNames = MenuNames;
    menuStates: Map<number, string> = new Map<number, string>();
    menuStatus: boolean = true;

    //windowWidth Listener variable
    windowWidth: number;
    windowWidth$: Subscription;
    previousWidth: number;

    //Header Communication (Between Components)
    colorPicker: string;
    colorPicker$: Subscription;
    mobileBreakPoint: number;

    //burger menu states
    burgerState: string;
    burgerMenuIconState: string;
    burgerXIconState: string;

    //explore menu states
    exploreState: string;
    exploreIconState: string;

    //Icon list for iconcarousel
    //iconList = Array<IconCarouselData>();

    //Header Data
    userData: UserData;
    userData$: Subscription;

    //Color Picker Styling
    primaryStyle = {}
    secondaryStyle = {}
    secondaryBorder = {}
    selectHighlight = {}

    //Menus
    menuMyGaia: FullMenu;
    menuGcash: FullMenu;
    menuShops: FullMenu;
    menuForums: FullMenu;
    menuWorld: FullMenu;
    menuGames: FullMenu;
    menuChannel: FullMenu;
    menuModerate: FullMenu;

    //Logo Hover
    logoHover: boolean = false;

    //Fixed Width Data
    fixedWidth: boolean = false;
    fullWidth: boolean = false;
    
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
        //Initialize mobile menu states
        this.burgerState = "closed";
        this.burgerMenuIconState = "burgerClosedMenuIcon";
        this.burgerXIconState = "burgerClosedXIcon";
        this.exploreState = "closed";
        this.exploreIconState = "exploreClosedIcon";

        //Initialize full menu states
        this.menuStates[this.menuNames.myGaia] = "closed";
        this.menuStates[this.menuNames.gcash] = "closed";
        this.menuStates[this.menuNames.shops] = "closed";
        this.menuStates[this.menuNames.forums] = "closed";
        this.menuStates[this.menuNames.world] = "closed";
        this.menuStates[this.menuNames.games] = "closed";
        this.menuStates[this.menuNames.channel] = "closed";
        this.menuStates[this.menuNames.moderate] = "closed";
        this.menuStates[this.menuNames.color] = "closed";

        this.mobileBreakPoint = headerCom.mobileBreakPoint;

        /*
        //TEST CODE
        let temp = new IconCarouselData;
        temp.img = "//www.gaiaonline.com/images/angular_header/header-board/mobile/56x56_jackpot.gif";
        temp.link = "#";
        
        this.iconList.push(temp);

        let temp2 = new IconCarouselData;
        temp2.img = "//www.gaiaonline.com/images/angular_header/header-board/mobile/56x56_live.gif";
        temp2.link = "#";
        this.iconList.push(temp2);

        let temp3 = new IconCarouselData;
        temp3.img = "//www.gaiaonline.com/images/angular_header/header-board/mobile/56x56_sale.gif";
        temp3.link = "#";
        this.iconList.push(temp3);
        */

        //Setup Menus
        this.menuMyGaia = menuMyGaiaData;
        this.menuGcash = menuGcashData;
        this.menuShops = menuShopsData;
        this.menuForums = menuForumsData;
        this.menuWorld = menuWorldData;
        this.menuGames = menuGamesData;
        this.menuChannel = menuChannelData;
        this.menuModerate = menuModerateData;

        this.fixedWidth = this.headerCom.isFixedWidthStyle();
        this.fullWidth = this.headerCom.isFullWidthStyle();
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.userData$ = this.headerCom.userData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.userData = response;
                if(this.userData != null){
                    if(this.userData.user_id != null){
                        this.menuGcash.addFullCol2(
                            "Surveys",
                            "/images/angular_header/navbar-icons/currency/icon_gaiacash.png",
                            "//publishers.revenueuniverse.com/wall/223/surveys?uid=" + this.userData.user_id,
                            "medium",
                            true
                        );
                    }

                    if(this.userData.currencyType == 2){
                        this.menuChannel.setCol2Header("Platinum");
                    } else if (this.userData.currencyType == 1){
                        this.menuChannel.setCol2Header("Gold");
                    } else {
                        this.menuChannel.setCol2Header("GMoney");
                    }
                }
            }
        });

        //Set up HeaderCommunication Service        
        this.colorPicker$ = this.headerCom.colorPicker$.subscribe(
            response => {
                this.colorPicker = response;
                this.primaryStyle = {
                    'background-color': this.headerCom.getCustomPrimary()
                }
            
                this.secondaryStyle = {
                    'background-color': this.headerCom.getCustomSecondary()
                }

                this.secondaryBorder = {
                    'border': '2px solid ' + this.headerCom.getCustomSecondary()
                }

                if(this.headerCom.getCustomTextHighlightToggle() == 'false'){
                    this.selectHighlight = {
                        'color': this.headerCom.getCustomText()
                    }
                    
                } else {
                    this.selectHighlight = {
                        'background-color': this.headerCom.getCustomSecondary(),
                        'color': this.headerCom.getCustomText()
                    }
                }
            }
        )

        this.windowWidth$ = this.headerCom.windowWidth$.subscribe(response => {
            this.windowWidth = response;
            //If passing the mobileBreakPoint from mobile size, close all mobile menus
            if(this.windowWidth >= this.mobileBreakPoint){
                this.closeBurger();
                this.closeExplore();
            //If passing the mobileBreakpoint from full, close all full menus
            } else if (this.windowWidth < this.mobileBreakPoint){
                this.closeAllMenus();
            }
        })

        for(let i = 0; i < this.searchItems.length; i ++){
            this.isHoveredGSearchSelect[i] = false;
        }
    }

    //Manage the full menus (Full sized navbar)
    openMenuState(menuEnum: number){
        this.menuStates[menuEnum]= "open";
        this.closeOtherMenus(menuEnum);
        this.menuStatus = true;
    }

    closeMenuState(menuEnum: number){
        this.menuStates[menuEnum] = "closed";
        this.menuStatus = false;
    }

    toggleMenuState(menuEnum: number){
        if(this.menuStates[menuEnum] == "closed"){
            this.openMenuState(menuEnum);
        } else {
            this.closeMenuState(menuEnum);
        }
    }

    //Closes other menus besides the targeted one
    closeOtherMenus(menuEnum: number){
        let size = Object.keys(this.menuNames).length / 2;
        //if a main menu enum 1-6
        if(menuEnum >= 0 && menuEnum <= size){
            //close other menus 1-8, if not current menu
            for(let i = 0; i < size; i++){              
                if(i != menuEnum){
                    this.menuStates[i] = "closed";
                }
            }
        }
    }

    //Close all full menus
    closeAllMenus(){
        let size = Object.keys(this.menuNames).length / 2;
        for(let i = 0; i < size; i++){              
            this.menuStates[i] = "closed";
        }
    }

    //Manage the burger menu
    toggleBurgerState(){
        if(this.burgerState == "closed"){
            this.closeExplore();
            this.openBurger();
        } else {
            this.closeBurger();
        }
    }

    openBurger(){
        this.burgerState = "open";
        this.burgerMenuIconState = "burgerOpenMenuIcon"
        this.burgerXIconState = "burgerOpenXIcon";
        this.menuStatus = true;
    }

    closeBurger(){
        this.burgerState = "closed";
        this.burgerMenuIconState = "burgerClosedMenuIcon"
        this.burgerXIconState = "burgerClosedXIcon";
        this.menuStatus = false;
    }

    //Manage the explore menu
    toggleExploreState(){
        if(this.exploreState == "closed"){
            this.closeBurger();
            this.openExplore();
        } else {
            this.closeExplore();
        }
    }
    
    openExplore(){
        this.exploreState = "open";
        this.exploreIconState = "exploreOpenIcon";
        this.menuStatus = true;
    }

    closeExplore(){
        this.exploreState = "closed";
        this.exploreIconState = "exploreClosedIcon";
        this.menuStatus = false;
    }

    //Closes EVERY menu (burger, explore, full, gsearch)
    closeEverything(){
        this.closeAllMenus();
        this.closeBurger();
        this.closeExplore();
        this.setGSearchPopup(false);
    }

    //Manages the logo highlight styling
    logoOnMouseEnter(){
        this.logoHover = true;
    }

    logoOnMouseLeave(){
        this.logoHover = false;
    }

    //Touch event function to deal with browsing on mobile devices
    onTouchNavItem(event, landing: number){
        //Disable the href
        event.preventDefault();
        //Toggle the menu
        this.toggleMenuState(landing);
    }

    //Android devices give click events precedence over touch events, detect android device and make it work the same as the others
    //Temp mobile checking (should refine this one day but probably, knowing Gaia, never)
    userAgent: string  = navigator.userAgent.toLowerCase();
    isAndroid: boolean = (this.userAgent.indexOf('android') > -1);
    isIPhone: boolean = (this.userAgent.indexOf('iphone') > -1);
    isMobi: boolean = (this.userAgent.indexOf('mobi') > -1);
    isMobile: boolean = (this.isAndroid || this.isIPhone || this.isMobi);
    onClickNavItem(event, landing: number){
        if(this.isAndroid == true){
            event.preventDefault();
            this.toggleMenuState(landing);
        }
    }

    //Sets the status of the gsearch popup and the overlay
    setGSearchPopup(status: boolean){
        this.gsearchStatus = status;
        this.menuStatus = status;
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
        {'value': '4722', 'viewValue': 'Favorites'},
        {'value': ''    , 'viewValue': 'Interests'}
    ];

    isHoveredGSearchSelect: Map<number, boolean> = new Map<number, boolean>();

    searchAction: string = "/gsearch/";
    trackParam: string  = "?_gaia_t_=";
    trackingCode: string = "";

    inputState: string = "closed";
    selectState: string = "selectClosed";


    @ViewChild('gsearchInput') gsearchInput: ElementRef;
    @ViewChild('gsearchForm') gsearchForm: ElementRef;
    @ViewChild('gsearchSelect') gsearchSelect: ElementRef;

    selectGSearch(item){
        //this.trackingCode = args.target.value;
        this.trackingCode = item.value;
        //console.log(args.target.options[args.target.selectedIndex].text);
        //Not so good item search redirect
        if(this.trackingCode == "4716"){
            this.searchAction = "/marketplace/itemsearch/"
        } else {
           // this.searchAction = "/gsearch/" + args.target.options[args.target.selectedIndex].text.toLowerCase();
           this.searchAction =  "/gsearch/" + item.viewValue.toLowerCase();
        }
        this.closeSelectBox();
        this.gsearchInput.nativeElement.focus();
    }

    isItemSearch(): string{
        if(this.trackingCode == "4716"){
            return "&search=" + this.searchString;
        }
        return "";
    }

    toggleInputBox(){
        if(this.inputState == "closed"){
            this.openInputBox();
        } else {
            this.closeInputBox();
        }
    }

    openInputBox(){
        this.inputState = "open";
        this.gsearchInput.nativeElement.focus();
    }

    closeInputBox(){
        this.gsearchForm.nativeElement.submit();
    }

    toggleSelectBox(){
        if(this.selectState == "selectClosed"){
            this.openSelectBox();
        } else {
            this.closeSelectBox();
        }
    }

    openSelectBox(){
        this.selectState = 'selectOpen';
    }

    closeSelectBox(){
        this.selectState = 'selectClosed';
    }

    setSelectBoxStyle(index: number, state: boolean){
        this.isHoveredGSearchSelect[index] = state;
    }
    

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.userData$.unsubscribe();
        this.windowWidth$.unsubscribe();
        this.colorPicker$.unsubscribe();
    }

}