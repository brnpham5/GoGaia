import { Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Subscription } from "rxjs/Subscription";

import { environment } from '../../../../../environments/environment';

import { NotificationData } from "../../data-files/notificationData";

import { HeaderComService } from "../../header-com.service";
import { HeaderModalService } from "../header-modal.service";

@Component({
    selector: 'notification-modal',
    templateUrl: './notification-modal.component.html',
    styleUrls: [ './notification-modal.component.css' ],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ transform: 'scale3d(.3, .3, .3)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})
export class NotificationModalComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    notificationData$: Subscription;
    notificationStatus$: Subscription;

    notifications: NotificationData;

    //Color picker styles
    colorPicker: string;
    colorPicker$: Subscription;
    secondaryBorder = {};
    textColor = {};

    closeButtonColor = {};
  
    constructor(
        private headerCom: HeaderComService,
        private headerModalService: HeaderModalService
    ) { 
      
    }

    ngOnInit(){
        this.notificationData$ = this.headerCom.notificationData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.notifications = response;
            }
        })

        this.notificationStatus$ = this.headerModalService.notificationStatus$.subscribe(response => {
            this.visible = response;
        })

        this.colorPicker$ = this.headerCom.colorPicker$.subscribe(
            response => {
                this.colorPicker = response;
                this.secondaryBorder = {
                    'border': '2px solid ' + this.headerCom.getCustomSecondary()
                }

                this.textColor = {
                    'color': this.headerCom.getCustomSecondary()
                }

                this.closeButtonColor = {
                    'color': this.headerCom.getCustomPrimary()
                }
            }
        )
    }

    setCloseButtonColor(state: boolean){
        if(state == false) {
            this.closeButtonColor = {
                'color': this.headerCom.getCustomPrimary()
            }
        } else if (state == true ){
            this.closeButtonColor = {
                'color': this.headerCom.getCustomSecondary()
            }
        }
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.notificationData$.unsubscribe();
        this.notificationStatus$.unsubscribe();
    }

    
}