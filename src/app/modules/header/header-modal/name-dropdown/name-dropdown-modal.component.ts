import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Subscription } from "rxjs/Subscription";

import { environment } from '../../../../../environments/environment';

import { HeaderComService } from "../../header-com.service";
import { HeaderModalService } from "../header-modal.service";

import { UserData } from "../../data-files/userData";

@Component({
    selector: 'name-dropdown-modal',
    templateUrl: './name-dropdown-modal.component.html',
    styleUrls: [ './name-dropdown-modal.component.css' ],
    animations: [
        trigger('dialog', [
            state('*', style({
                height: '*'
            })),
            state('void', style({
                height: '0px'
            })),
            transition("* => void", animate("150ms ease-out")),
            transition("void => *", animate("250ms ease-out")),
        ])
    ]
})
export class NameDropDownModalComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;

    @Input() closable = true;
    @Input() visible: boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    userData: UserData;
    userData$: Subscription;

    windowWidth: number;
    windowWidth$: Subscription;

    initScrollX: number;
    initScrollY: number;

    isCentered: boolean = false;

    constructor(
        private headerCom: HeaderComService,
        private headerModalService: HeaderModalService
    ) { 
        
    }

    ngOnInit() {
        this.userData$ = this.headerCom.userData$.subscribe(response => {
            if(response != null && Object.keys(response).length > 0){
                this.userData = response;
            }
        });

        this.headerModalService.nameDropDownStatus$.subscribe(response => {
            this.visible = response;
            if(response == true){
                this.initScrollX = window.scrollX;
                this.initScrollY = window.scrollY;
            }
        })

        this.windowWidth$ = this.headerCom.windowWidth$.subscribe( response => {
            this.windowWidth = response;
        })

        this.isCentered = !(this.headerCom.isFullWidthStyle() || !this.headerCom.isFixedWidthStyle());
    }

    @HostListener('window:scroll', ['$event'])
    scrollEvent(event): void {
        if(Math.abs(window.scrollX - this.initScrollX) >= 50){
            this.close();
        }

        if(Math.abs(window.scrollY - this.initScrollY) >= 50){
            this.close();
        }
        
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    openColorPickerModal(){
        this.headerModalService.updateColorPickerStatus(true);
        this.close();
    }


    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.userData$.unsubscribe();
        this.windowWidth$.unsubscribe();
    }
}