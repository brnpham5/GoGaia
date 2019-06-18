import { Component, Input } from '@angular/core';

import { DATETIME_FORMAT } from '../../classes/constants';
import { Forum } from '../classes/forum';
import { Topic } from '../classes/topic';

@Component({
    selector: 'forum-topic',
    templateUrl: './forum-topic.component.html',
    styleUrls: [
        '../../styles/common.css',
        './forum-topic.component.css'
    ]
})
export class ForumTopicComponent {
    @Input() forum: Forum;
    @Input() topic: Topic;
    @Input() memberPath: string;

    dateTimeFormat: string = DATETIME_FORMAT;
}
