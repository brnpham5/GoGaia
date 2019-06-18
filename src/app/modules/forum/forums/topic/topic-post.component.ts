import { Component, Input } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { DATETIME_FORMAT } from '../../classes/constants';
import { Post } from '../classes/post';

@Component({
    selector: 'topic-post',
    templateUrl: './topic-post.component.html',
    styleUrls: [
        '../../styles/common.css',
        './topic-post.component.css'
    ],
    animations: [
        trigger('slideTransition', [
            state('expanded', style({
                height: '*'
            })),
            state('collapsed', style({
                height: '0'
            })),
            transition('collapsed => expanded', animate('250ms ease-in')),
            transition('expanded => collapsed', animate('250ms ease-out'))
        ]),
        trigger('rotateTransition', [
            state('expanded', style({
                transform: 'rotate(0deg)'
            })),
            state('collapsed', style({
                transform: 'rotate(180deg)'
            })),
            transition('collapsed => expanded', animate('250ms ease-in')),
            transition('expanded => collapsed', animate('250ms ease-out'))
        ])
    ]
})
export class TopicPostComponent {
    @Input() post: Post;
    @Input() topicId: number;
    @Input() memberPath: string;
    @Input() hideActions: boolean = false;

    dateTimeFormat: string = DATETIME_FORMAT;

    cardExpanded: boolean = false;
    expandedState: string = 'collapsed';

    onOptionsClick(): void {
        this.cardExpanded = !this.cardExpanded;
        this.expandedState = this.cardExpanded ? 'expanded' : 'collapsed';
    }
}
