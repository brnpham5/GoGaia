import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { environment } from '../../../../../environments/environment';

import { Forum } from '../classes/forum';
import { Topic } from '../classes/topic';
import * as constants from '../classes/constants';
import { ForumsService } from '../forums.service';

@Component({
    selector: 'forum-container',
    templateUrl: './forum-container.component.html',
    styleUrls: ['../../styles/common.css']
})
export class ForumContainerComponent implements OnInit, OnDestroy {
    subscription: any;
    forumId: number;
    forum: Forum;

    memberPath: string = environment.apiUrl + '/dress-up/avatar/';

    tabIds: number[] = [0, 1, 2];
    tabIndex: number = 0;
    topicsByTab: any[];
    labelsByTab: string[] = ['Topics', 'Stickies', 'Announcements'];
    paginationByTab: any;

    scrollDistance = 1.5;
    scrollThrottle = 500;

    scrollMutex: boolean = false;
    isLoading: boolean = true;

    constructor(private route: ActivatedRoute,
        private forumsService: ForumsService) {}

    ngOnInit(): void {
        this.reset();
        this.paginationByTab[0]['page'] = +this.route.snapshot.queryParams['page'] || 1;
        this.subscription = this.route.params.subscribe(params => {
            this.reset();
            this.forumId = +params['id'];
            Promise.all([
                this.getForumData(this.forumId),
                this.refresh(false, true)
            ]).then(() => this.isLoading = false);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onTabChange(event): void {
        this.tabIndex = +event.index;

        if (!this.topicsByTab[this.tabIndex]) {
            this.isLoading = true;
            this.refresh(false, true)
                .then(() => this.isLoading = false);
        }
    }

    onPageChange(newPage: number): void {
        this.paginationByTab[this.tabIndex]['page'] = newPage;
        this.isLoading = true;
        this.refresh(false)
            .then(() => this.isLoading = false);
    }

    onForumChange(): void {
        this.reset();
    }

    onScroll(tabId: number): void {
        if (!this.scrollMutex && this.tabIndex == tabId && this.hasMorePages()) {
            this.scrollMutex = true;
            this.paginationByTab[this.tabIndex]['page'] = this.getPage() + 1;
            this.refresh()
                .then(() => this.scrollMutex = false);
        }
    }

    private refresh(shouldAppend: boolean = true, pageInfo: boolean = false): Promise<any> {
        return this.getTopicList(this.forumId, this.getPage(), shouldAppend, pageInfo);
    }

    private getPage(): number {
        return +(this.paginationByTab[this.tabIndex]['page'] || 1);
    }

    private getPerPage(): number {
        return +this.paginationByTab[this.tabIndex]['perPage'];
    }

    private getTotalItems(): number {
        return +this.paginationByTab[this.tabIndex]['totalItems'];
    }

    private getNumPages(): number {
        return +this.paginationByTab[this.tabIndex]['numPages'];
    }

    private hasMorePages(): boolean {
        return (this.getPage() < this.getNumPages());
    }

    private reset(): void {
        this.topicsByTab = [];
        this.paginationByTab = {0: {}, 1: {}, 2: {}};
    }

    private getForumData(forumId: number): Promise<any> {
        return this.forumsService
            .getForum(forumId)
            .then(forum => this.forum = forum);
    }

    private getTopicList(forumId: number, page: number, shouldAppend: boolean = true, pageInfo: boolean = false): Promise<any> {
        return this.forumsService
            .getTopics(forumId, page, pageInfo, this.tabIndex)
            .then(data => {
                if (shouldAppend) {
                    this.topicsByTab[this.tabIndex] = this.topicsByTab[this.tabIndex].concat(data.results);
                }
                else {
                    this.topicsByTab[this.tabIndex] = data.results;
                }
                if (pageInfo) {
                    this.paginationByTab[this.tabIndex]['perPage'] = +data.perPage;
                    this.paginationByTab[this.tabIndex]['totalItems'] = +data.total;
                    this.paginationByTab[this.tabIndex]['numPages'] = Math.ceil(+data.total / +data.perPage);
                }
            });
    }
}
