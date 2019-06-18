import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from "@angular/animations";

import { Subscription } from "rxjs/Subscription";

import { FullMenu } from "../menu-data/full-menu";
import { MenuContentData } from "../menu-data/menuContentData";

import { environment } from '../../../../../environments/environment';

import { HeaderComService } from "../../header-com.service";

@Component({
    selector: "gaia-burger-content",
    templateUrl: "./burger-content.component.html",
    styleUrls: [
        "./burger-content.component.css"
    ],
    animations: [
        trigger('burgerState', [
            state('open', style({
                height: '*'
            })),
            state('closed', style({
                height: '0px'
            })),
            transition("open => closed", animate("150ms ease-out")),
            transition("closed => open", animate("250ms ease-out")),
        ]),
    ],
})
export class BurgerContentComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;

    data: FullMenu;

    //Setting Data
    @Input() set setFullMenuData(data: FullMenu){
        this.data = data;
        if(data != null){
            let numCol1: number = 0;
            let numCol2: number = 0;
            data.col1.forEach(item => {
                this.isHoveredCol1[numCol1] = false;
                numCol1++;
            })
            data.col2.forEach(item => {
                this.isHoveredCol2[numCol2] = false;
                numCol2++;
            })
        }
    }

    //State
    state: string = 'closed';
    @Input() set setState(state: string){
        this.state = state;
    }

    //Styling
    isHoveredCol1: Map<number, boolean> = new Map<number, boolean>();
    isHoveredCol2: Map<number, boolean> = new Map<number, boolean>();
    primaryBG = {};
    secondaryBG = {};
    colorPicker: string;
    colorPicker$: Subscription;

    withinViewPort: boolean;
    lastOutOfBounds: number;

    @ViewChild('thisMenu') el: ElementRef;

    constructor(
        private headerCom: HeaderComService
    ){}

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.colorPicker$ = this.headerCom.colorPicker$.subscribe(
            response => {
                this.colorPicker = response;       
                this.primaryBG = {
                    'background-color': this.headerCom.getCustomPrimary()
                }

                if(this.headerCom.getCustomTextHighlightToggle() == 'true'){
                    this.secondaryBG = {
                        'background-color': this.headerCom.getCustomSecondary(),
                        'color': this.headerCom.getCustomText()
                    }
                } else if (this.headerCom.getCustomTextHighlightToggle() == 'false'){
                    this.secondaryBG = {
                        'color': this.headerCom.getCustomText()
                    }
                }
        
            }
        )
        this.checkWithinViewport();
    }

    addSecondaryBG(col: number, idx: number){
        if(col == 1){
            this.isHoveredCol1[idx] = true;
        } else if( col == 2) {
            this.isHoveredCol2[idx] = true;
        }
    }

    removeSecondaryBG(col: number, idx: number){
        if(col == 1){
            this.isHoveredCol1[idx] = false;
        } else if( col == 2) {
            this.isHoveredCol2[idx] = false;
        }
    }

    checkWithinViewport(){
        let rect = this.el.nativeElement.getBoundingClientRect();
        if(rect.right > window.innerWidth){
            this.withinViewPort = false;
            this.lastOutOfBounds = rect.right;
        } else if (rect.right > this.lastOutOfBounds) {
            this.withinViewPort = true;
        }
    }
}