import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { RewardData } from '../../services/reward';

import { environment } from "../../../../../../environments/environment";

@Component({
    selector: 'reward-modal',
    templateUrl: './reward-modal.component.html',
    styleUrls: [ './reward-modal.component.css' ],
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
export class RewardModalComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;

    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() currencyType: number;
    @Input() data: RewardData;

    constructor() { }

    ngOnInit() {
        
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}