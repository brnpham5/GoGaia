import { Component, Input } from '@angular/core';

import { DATETIME_FORMAT } from '../../classes/constants';
import { Topic } from '../classes/topic';

@Component({
    selector: 'topic-header',
    templateUrl: './topic-header.component.html',
    styleUrls: ['../../styles/common.css']
})
export class TopicHeaderComponent {
    @Input() topic: Topic;

    dateTimeFormat: string = DATETIME_FORMAT;
}
