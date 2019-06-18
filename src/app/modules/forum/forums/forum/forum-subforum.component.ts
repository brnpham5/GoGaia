import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Forum } from '../classes/forum';

@Component({
    selector: 'forum-subforum',
    templateUrl: './forum-subforum.component.html'
})
export class ForumSubforumComponent {
    @Input() forum: Forum;
    @Input() disabled: boolean = false;
    @Output() change: EventEmitter<any> = new EventEmitter();

    onChange(): void {
        if (!this.disabled) {
            this.change.emit();
        }
    }
}
