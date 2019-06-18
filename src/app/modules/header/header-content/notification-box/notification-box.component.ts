import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from "@angular/animations";

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../../../environments/environment';

import { NotificationData } from "../../data-files/notificationData";
import { HeaderService } from "../../header.service";

//Header Communication Service
import { HeaderComService } from "../../header-com.service";
import { HeaderModalService } from "../../header-modal/header-modal.service";

@Component({
    selector: "gaia-notification-box",
    templateUrl: "./notification-box.component.html",
    styleUrls: [
        "./notification-box.component.css"
    ],
    animations: [
        trigger('NotificationState', [
            state('full', style({
                width: '*',
                height: '*',
            })),
            state('mini', style({
                width: '32px',
                height: '32px',
                borderRadius: '100%',
                overflow: 'hidden',
                cursor: 'zoom-in'
            })),
            state('contentMini', style({
                opacity: '0',
                width: '0',
                height: '0',
            })),
            state('bubbleMini', style({
                top: '40%'
            })),
            state('countFull', style({
                opacity: '0',
                height: '0',
            })),
            state('countMini', style({
                opacity: '1',
                paddingTop: '7px'
            })),
            transition('full => mini', animate('250ms ease-out')),
            transition('mini => full', animate('250ms ease-out')),
            transition('full => contentMini', animate('150ms ease-out')),
            transition('contentMini => full', animate('125ms ease-out')),
            transition('full => bubbleMini', animate('250ms ease-out')),
            transition('bubbleMini => full', animate('250ms ease-out')),
            transition('countFull => countMini', animate('500ms 250ms')),
            transition('countMini => countFull', animate('250ms')),
        ]),
    ],
    providers: [
        HeaderService
    ]
})
export class NotificationBoxComponent implements OnInit, OnDestroy, AfterViewInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;

    @ViewChild('notificationBubble') el: ElementRef;

    windowWidth: number;
    windowWidth$: Subscription;

    //Data
    notifications: NotificationData;
    notification_count: number = 0;             //count of number of unique notifications

    //States
    miniState: string = 'full';
    contentState: string = 'full';
    bubbleState: string = 'full';
    countState: string = 'countFull';

    notificationModalState: boolean = false;

    //Breakpoints
    miniBreakPoint: number = 550;       //default width breakpoint for the avatar-menu version of this component
    fullNotifBreakPoint: number = 6;    //Number of notifications before switching to a columned list

    bubbleBreakpoint: number;

    //Header Com Service
    mobileBreakPoint: number;

    //Color picker styles
    colorPicker: string;
    colorPicker$: Subscription;
    secondaryBorder = {};
    textColor = {};

    maxHeight: number = 150;
    midHeight: number = 80;
    minHeight: number = 52;
    currentHeight: number = window.scrollY;
    lastBottom: number = 0;

    constructor(
        private headerService: HeaderService,
        private headerCom: HeaderComService,
        private headerModalService: HeaderModalService
    ){
        this.mobileBreakPoint = this.headerCom.mobileBreakPoint;
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.headerService.getNotifications().subscribe(response => {
            this.notifications = response;
            //Test code
            //this.notifications.account_not.count = 2;
            //this.notifications.account_not.account_email_error = true;
            //this.notifications.account_not.account_unverified = true;

            //this.notifications.announcements.devnews_count = 2;
            //this.notifications.announcements.storyalerts_count = true;

            //this.notifications.guild_clan_not.clan_count = 2;
            //this.notifications.guild_clan_not.guild_count = 2;

            //this.notifications.mygaia_not.count = 2;
            //this.notifications.mygaia_req.count = 1;
            
            //this.notifications.notices.count = 2;
            //this.notifications.priv_msg.count = 2;

            //this.notifications.achievements.count = 2;
            
            //END TEST CODE

            //Count # different announcements
            this.notification_count += 
                (this.notifications.account_not.count > 0 ? 1 : 0)+
                (this.notifications.announcements.announcement_count > 0 ? 1 : 0) +
                (this.notifications.announcements.devnews_count > 0 ? 1 : 0) +
                (this.notifications.announcements.storyalerts_count ? 1 : 0) +
                (this.notifications.mygaia_not.count > 0 ? 1 : 0) +
                (this.notifications.mygaia_req.count > 0 ? 1 : 0) +
                (this.notifications.guild_clan_not.clan_count > 0 ? 1 : 0) +
                (this.notifications.guild_clan_not.guild_count > 0 ? 1 : 0) +
                (this.notifications.notices.count > 0 ? 1 : 0 ) +
                (this.notifications.priv_msg.count > 0 ? 1 : 0) +
                (this.notifications.achievements.count > 0 ? 1 : 0)
                ;
            this.headerCom.updateNotificationData(response);
        });
        
        //Set up HeaderCommunication Service
        this.colorPicker$ = this.headerCom.colorPicker$.subscribe(
            response => {
                this.colorPicker = response;
                this.secondaryBorder = {
                    'border': '2px solid ' + this.headerCom.getCustomSecondary()
                }

                this.textColor = {
                    'color': this.headerCom.getCustomSecondary()
                }
            }
        )

        this.windowWidth$ = this.headerCom.windowWidth$.subscribe(response => {
            this.windowWidth = response;
            this.checkWidth();
        })
    }

    ngAfterViewInit(){
        this.currentHeight = this.calcScrollY();
        this.lastBottom = this.el.nativeElement.getBoundingClientRect().bottom;
    }

    //Scroll listener to hide the gaia header
    @HostListener('window:scroll', ['$event'])
    scrollEvent(event): void {
        if(this.headerCom.isFixedWidthStyle() == false){
            this.currentHeight = this.calcScrollY();
            if(this.miniState == 'full' && this.el != null && this.el.nativeElement != null && this.windowWidth >= this.miniBreakPoint){
                this.lastBottom = this.el.nativeElement.getBoundingClientRect().bottom;
                if(this.lastBottom >= this.currentHeight){
                    this.closeMiniNotifications();
                }
            } else if(this.miniState == "mini" && this.windowWidth >= this.miniBreakPoint){
                if(this.lastBottom <= this.currentHeight){
                    this.openMiniNotifications();
                }
            }
        }
    }

    calcScrollY(): number {
        let height = this.maxHeight - window.scrollY;
        if( height > this.maxHeight ){
            return this.maxHeight;
        } else if ( height <= this.maxHeight && height > this.minHeight ) {
            return height;
        } else {
            return this.minHeight;
        }
    }

    checkWidth(){
        if(this.windowWidth >= this.miniBreakPoint && this.currentHeight >= this.lastBottom){
            this.openMiniNotifications();
            this.closeNotificationModal();
        } else if (this.windowWidth < this.miniBreakPoint){
            this.closeMiniNotifications();
        }
    }

    openMiniNotifications(){
        this.miniState = 'full';
        this.contentState = 'full';
        this.bubbleState = 'full';
        this.countState = 'countFull';
    }

    closeMiniNotifications(){
        this.miniState = 'mini';
        this.contentState = 'contentMini';
        this.bubbleState = 'bubbleMini';
        this.countState = 'countMini';
    }

    openNotificationModal(){
        if(this.contentState == 'contentMini'){
            this.notificationModalState = true;
            this.headerModalService.updateNotificationStatus(true);
        }
    }
    
    closeNotificationModal(){
        this.notificationModalState = false;
        this.headerModalService.updateNotificationStatus(false);
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.windowWidth$.unsubscribe();
        this.colorPicker$.unsubscribe();
    }
}