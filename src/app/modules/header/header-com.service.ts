import { Injectable } from '@angular/core';
import { Cookie } from "ng2-cookies"
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/BehaviorSubject"

//Data Types
import { NotificationData } from "./data-files/notificationData";
import { UserData } from "./data-files/userData";

//Header communication service
//Manages communications between all the header components in one convenient place! (more like putting them in one place because I need to rush this)
//Also manages the color picker, which really should be it's own service... but deadlines be deadlines...
@Injectable()
export class HeaderComService {
    // Observable Sources
    private colorPicker: BehaviorSubject<string>;
    private notificationData: BehaviorSubject<NotificationData> = new BehaviorSubject(new NotificationData);
    private userData: BehaviorSubject<UserData> = new BehaviorSubject(new UserData);
    private landingPage: BehaviorSubject<string> = new BehaviorSubject("");
    private hasLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    private windowWidth: BehaviorSubject<number> = new BehaviorSubject(1140);

    // Observable streams
    colorPicker$;
    notificationData$ = this.notificationData.asObservable();
    userData$ = this.userData.asObservable();

    landingPage$ = this.landingPage.asObservable();

    windowWidth$ = this.windowWidth.asObservable();

    hasLoaded$ = this.hasLoaded.asObservable();

    private currentColor = "default";
    private previousWidth;
    private fixedWidth: boolean = true;   //determines whether responsive styling is on or not.
    private fullWidth: boolean = false;     //determines whether "full" styling is on

    //Custom Colorpicker
    private primaryColor: string;
    private secondaryColor: string;
    private textColor: string;
    private textHighlightToggle: string;

    // Constants
    public mobileBreakPoint: number = 800;

    //Default Color Picker Choices, Feel free to change
    private darker = {
        default: "#0B706B",
        green:  "#6c8a48",
        pink:   "#8a486d",
        yellow: "#c28760",
        red:    "#c03b4b",
        blue:   "#486a87",
        purple: "#714a8a",
        black:  "#050505"
    };

    private lighter = {
        default: "#93cfcc",
        green:  "#6acf8e",
        pink:   "#e877e4",
        yellow: "#f78c18",
        red:    "#eb4e64",
        blue:   "#77ced9",
        purple: "#b74eeb",
        black:  "#505050"
    };

    private defaultTextColor = {
        default: "#3e53a2",
        green:  "#3e53a2",
        pink:   "#3e53a2",
        yellow: "#3e53a2",
        red:    "#3e53a2",
        blue:   "#3e53a2",
        purple: "#ffffff",
        black:  "#ffffff"
    }

    constructor(){
        let myCookie = Cookie.get('gaia-menu-color');
        let customPrimary = Cookie.get('custom-header-primary');
        let customSecondary = Cookie.get('custom-header-secondary');
        let customText = Cookie.get('custom-header-text');
        let customTextHighlightToggle = Cookie.get('custom-header-text-highlight-toggle');
        if(myCookie != ""){
            this.currentColor = myCookie;
            this.colorPicker = new BehaviorSubject(myCookie);
        } else {
            this.colorPicker = new BehaviorSubject('default');
        }

        this.colorPicker$ = this.colorPicker.asObservable();

        if(customPrimary != ""){
            this.primaryColor = customPrimary;
        } else {
            this.primaryColor = this.getCurrentDarker();
        }

        if(customSecondary != ""){
            this.secondaryColor = customSecondary;
        } else {
            this.secondaryColor = this.getCurrentLighter();
        }

        if(customText != ""){
            this.textColor = customText;
        } else {
            this.textColor = this.getCurrentText();
        }

        if(customTextHighlightToggle != ""){
            this.textHighlightToggle = customTextHighlightToggle;
        } else {
            this.textHighlightToggle = 'true';
        }
    }

    //Data Passing
    //Fixed width, false = responsive, true = gaia style
    public setFixedWidth(bool: boolean){
        this.fixedWidth = bool;
        if(bool == true){
            this.windowWidth.next(1140);
        }
    }

    public isFixedWidthStyle(): boolean {
        return this.fixedWidth;
    }

    //Full Width styline go Gaia styling yaaaaayyyyayay =(
    public setFullWidthStyle(bool: boolean){
        this.fullWidth = bool;
    }

    public isFullWidthStyle(): boolean {
        return this.fullWidth;
    }

    //Data
    public updateHeaderData(data: HeaderData){
        this.headerData.next(data);
    }

    public updateNotificationData(data: NotificationData){
        this.notificationData.next(data);
    }

    public updateUserData(data: UserData){
        this.userData.next(data);
    }

    public updateLandingPage(data: string){
        this.landingPage.next(data);
    }

    public updateWindowWidth(num: number){
        if(this.fixedWidth == false) {
            if(num != this.previousWidth){
                this.windowWidth.next(num);
            }
            this.previousWidth = num;
        }
    }

    public updateHasLoaded(data: boolean){
        this.hasLoaded.next(data);
    }

    //Color Picker
    public updateColorPicker(data: string) {
        this.currentColor = data;
        this.primaryColor = this.getCurrentDarker();
        this.secondaryColor = this.getCurrentLighter();
        this.textColor = this.getCurrentText();
        this.textHighlightToggle = 'true';
        this.colorPicker.next(data);
        Cookie.delete('custom-header-primary');
        Cookie.delete('custom-header-secondary');
        Cookie.delete('custom-header-text');
        Cookie.delete('custom-header-text-highlight-toggle');
        Cookie.set('gaia-menu-color', this.currentColor, 365, "/");
    }

    //Color Picker Getters
    public getCurrentColor(): string {
        return this.currentColor;
    }

    public getColorDarker(color: string): string {
        return this.darker[color];
    }

    public getCurrentDarker(): string {
        return this.darker[this.currentColor];
    }

    public getColorLighter(color: string): string {
        return this.lighter[color];
    }

    public getCurrentLighter(): string {
        return this.lighter[this.currentColor];
    }

    public getCurrentText(): string {
        return this.defaultTextColor[this.currentColor];
    }

    public getCurrentTextPrimary(): string {
        return "#ffffff";
    }

    //Custom Color Picker Setters
    public updateCustomAll(primary: string, secondary: string, text: string, highlightToggle: string){
        this.updateCustomPrimary(primary);
        this.updateCustomSecondary(secondary);
        this.updateCustomText(text);
        this.updateCustomTextHighlightToggle(highlightToggle);
        this.colorPicker.next("custom");
    }

    public updateCustomPrimary(data: string) {
        this.primaryColor = data;
        Cookie.set('custom-header-primary', this.primaryColor, 365, "/");
    }

    public updateCustomSecondary(data: string) {
        this.secondaryColor = data;
        Cookie.set('custom-header-secondary', this.secondaryColor, 365, "/");
    }

    public updateCustomText(data: string){
        this.textColor = data;
        Cookie.set('custom-header-text', this.textColor, 365, "/");
    }

    public updateCustomTextHighlightToggle(data: string){
        this.textHighlightToggle = data;
        Cookie.set('custom-header-text-highlight-toggle', this.textHighlightToggle, 365, "/");
    }

    //Custom Color Picker Getters
    public getCustomPrimary(): string{
        return this.primaryColor;
    }

    public getCustomSecondary(): string {
        return this.secondaryColor;
    }

    public getCustomText(): string {
        return this.textColor;
    }

    public getCustomTextHighlightToggle(): string{
        return this.textHighlightToggle;
    }

}