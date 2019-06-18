import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import { environment } from '../../../../../environments/environment';

import { Post } from '../classes/post';
import { Topic } from '../classes/topic';
import { ForumsService } from '../forums.service';

@Component({
    selector: 'topic-container',
    templateUrl: './topic-container.component.html',
    styleUrls: ['./topic-container.component.css']
})
export class TopicContainerComponent implements OnInit, OnDestroy {
    subscription: any;
    topicId: number;
    topic: Topic;
    posts: Post[];
    page: number;
    perPage: number;
    numPages: number;
    totalPosts: number;
    memberPath: string = environment.apiUrl + '/dress-up/avatar/';

    scrollDistance = 1.5;
    scrollThrottle = 500;

    isLoading: boolean = true;

    constructor(public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private forumsService: ForumsService) {}

    ngOnInit() {
        this.page = +this.route.snapshot.queryParams['page'] || 1;
        this.subscription = this.route.params.subscribe(params => {
            this.topicId = +params['topicId'];
            Promise.all([
                this.getTopicData(this.topicId),
                this.refresh(false, true)
            ]).then(() => this.isLoading = false);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onPageChange(newPage: number): void {
        this.page = newPage;
        this.isLoading = true;
        this.refresh(false)
            .then(() => this.isLoading = false);
    }

    onScroll(): void {
        if (this.hasMorePages()) {
            this.page++;
            this.refresh();
        }
    }

    onSubscribed(): void {
        this.topic.subscribed = !this.topic.subscribed;

        let status = this.topic.subscribed ? 'subscribed to' : 'unsubscribed from';
        let message = `You've ${status} this topic.`;

        this.showSnackBar(message);
        this.forumsService
            .subscribeTopic(this.topicId, this.topic.subscribed);
    }

    onVoted(vote: number): void {
        if (this.topic.votestatus > 0) {
            this.showSnackBar("Oops! Can't change your vote at this time.");
            return;
        }

        this.topic.votestatus = vote;
        this.topic.likes += (vote == 1) ? 1 : -1;

        let status = (vote == 1) ? 'up' : 'down';
        let message = `You've ${status}voted this topic.`;

        this.showSnackBar(message);
        this.forumsService
            .likeTopic(this.topicId);
    }

    private showSnackBar(message: string) {
        this.snackBar.open(message, null, {
            duration: 2000,
            extraClasses: ['menu-snackbar']
        });
    }

    private refresh(shouldAppend: boolean = true, pageInfo: boolean = false): Promise<any> {
        return this.getPostList(this.topicId, this.page, shouldAppend, pageInfo);
    }

    private hasMorePages(): boolean {
        return (this.page < this.numPages);
    }

    private getTopicData(topicId: number): Promise<any> {
        return this.forumsService
            .getTopic(topicId)
            .then(topic => this.topic = topic);
    }

    private getPostList(topicId: number, page: number, shouldAppend: boolean = true, pageInfo: boolean = false): Promise<any> {
        return this.forumsService
            .getPosts(topicId, page, pageInfo)
            .then(data => {
                if (shouldAppend) {
                    this.posts = this.posts.concat(data.results);
                }
                else {
                    this.posts = data.results;
                }
                if (pageInfo) {
                    this.perPage = +data.perPage;
                    this.totalPosts = +data.total;
                    this.numPages = Math.ceil(this.totalPosts / this.perPage);
                }
            });
    }
}
