import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostListener} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Subscription } from "rxjs/Subscription";

import { environment } from '../../../../../environments/environment';

import { HeaderComService } from "../../header-com.service";
import { HeaderModalService } from "../header-modal.service";

import { ColorPickerService } from "ngx-color-picker";

@Component({
    selector: 'color-picker-modal',
    templateUrl: './color-picker-modal.component.html',
    styleUrls: [ './color-picker-modal.component.css' ],
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
export class ColorPickerModalComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    colorPickerStatus$: Subscription;

    colorPicker: string;
    colorPicker$: Subscription;
    pickPrimary: string;
    pickSecondary: string;
    pickText: string;
    highlightToggle: boolean;
    currentHighlightToggle: string;

    //Temp mobile checking
    userAgent: string  = navigator.userAgent.toLowerCase();
    isAndroid: boolean = (this.userAgent.indexOf('android') > -1);
    isIPhone: boolean = (this.userAgent.indexOf('iphone') > -1);
    isMobi: boolean = (this.userAgent.indexOf('mobi') > -1);
    isMobile: boolean = (this.isAndroid || this.isIPhone || this.isMobi);

    //Style
    closeButtonColor = {};

    constructor(
        private colorPickerService: ColorPickerService,
        private headerCom: HeaderComService,
        private headerModalService: HeaderModalService
    ) {
        
    }

    ngOnInit(){
        this.headerModalService.colorPickerStatus$.subscribe(response => {
            this.visible = response;
        });

        this.colorPicker$ = this.headerCom.colorPicker$.subscribe(
            response => {
                this.colorPicker = response;
                this.pickPrimary = this.headerCom.getCustomPrimary();
                this.pickSecondary = this.headerCom.getCustomSecondary();
                this.pickText = this.headerCom.getCustomText();
                let temp = this.headerCom.getCustomTextHighlightToggle();
                this.closeButtonColor = {
                    'color': this.headerCom.getCustomPrimary()
                }
                if(temp == 'false'){
                    this.highlightToggle = false;
                } else {
                    this.highlightToggle = true;
                }
            }
        )
    }

    updateColorPicker(color: string){
        this.headerCom.updateColorPicker(color);
    }
    
    saveCustomColors(){
        this.headerCom.updateCustomAll(this.pickPrimary, this.pickSecondary, this.pickText, this.currentHighlightToggle);
        this.close();
    }

    setHighlightToggle(){
        this.currentHighlightToggle = this.highlightToggle.toString();
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
        this.colorPickerStatus$.unsubscribe();
    }

    
}