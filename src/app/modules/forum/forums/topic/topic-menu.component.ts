import { DOCUMENT } from '@angular/platform-browser';
import {
    Component,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    Output
} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    keyframes
} from '@angular/animations';

import { Topic } from '../classes/topic';

@Component({
    selector: 'topic-menu',
    templateUrl: './topic-menu.component.html',
    styleUrls: [
        '../../styles/common.css',
        './topic-menu.component.css'
    ],
    animations: [
        trigger('fabState', [
            state('closed', style({
                
            })),
            state('open', style({
                position: 'absolute',
                bottom: '0px',
                right: '45%',
                minWidth: '0',
                display: 'none'
            })),
            transition('closed => open', [
                animate('1000ms ease-in', keyframes([
                    style({
                        position: 'absolute',
                        bottom: '0px',
                        right: '45%',
                        offset: 0.1
                    }),
                    style({
                        transform: 'scale3d(.1, .1, .1)',
                        offset: 0.9,
                    })
                ])),
            ]),
            transition('open => closed', [
                animate('200ms', keyframes([
                    style({
                        transform: 'scale3d(.3, .3, .3)',
                        offset: 0,
                    }),
                    style({
                        offset: 1
                    })
                ])),
            ]),
            
        ]),
        trigger('menuState', [

        ])
    ]
})
export class TopicMenuComponent {
    @Input() topic: Topic;

    @Output() voted: EventEmitter<number> = new EventEmitter<number>();
    @Output() subscribed: EventEmitter<any> = new EventEmitter<any>();

    isOpened: boolean = false;
    menuState: string = 'closed';
    scrollStart: number;
    scrollThreshold: number = 100;

    fabState: string = 'closed';

    constructor(@Inject(DOCUMENT) private document: Document) {}

    toggleMenu(): void {
        this.isOpened = !this.isOpened;
        this.menuState = this.isOpened ? 'opened' : 'closed';
        this.scrollStart = 0;
        this.fabState = 'open';
    }

    onVoted(vote: number): void {
        this.voted.emit(vote);
    }

    onSubscribed(): void {
        this.subscribed.emit();
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (this.isOpened) {
            let position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.scrollStart = this.scrollStart || position;

            if (Math.abs(position - this.scrollStart) > this.scrollThreshold) {
                this.toggleMenu();
            }
        }
    }
}
