import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { environment } from '../../../../../environments/environment';

import { Post } from '../classes/post';
import { UserData } from '../../classes/userdata';
import { UserDataService } from '../../services/userdata.service';
import { ForumsService } from '../forums.service';

import { ErrorDialogComponent } from '../../components/error-dialog.component';
import { TextEditorComponent } from '../../components/texteditor.component';

@Component({
    selector: 'new-reply-container',
    templateUrl: './new-reply-container.component.html'
})
export class NewReplyContainerComponent implements OnInit, OnDestroy {
    @ViewChild('texteditor') textEditor: TextEditorComponent;

    captchaSiteKey: string = environment.recaptchaSiteKey;
    captchaResponse: string;
    requireCaptcha: boolean;

    subscription: any;
    topicId: number;
    quoteId: string;
    post: Post;
    postModel: any = {};

    title: string = 'New Reply';
    isLoading: boolean = true;
    memberPath: string = environment.apiUrl + '/dress-up/avatar/';

    userData: UserData;

    constructor(
        public dialog: MatDialog,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserDataService,
        private forumsService: ForumsService) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.topicId = +params['topicId'];
            this.quoteId = this.route.snapshot.queryParams['quote_id'];

            let promises: any[] = [
                this.loadCaptchaStatus(),
                this.getUserData()
            ];

            if (this.quoteId) {
                this.title = 'New Quote';
                promises.push(this.loadPost(this.quoteId));
            }

            Promise.all(promises)
                .catch(error => this.displayErrors(error))
                .then(() => this.isLoading = false);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit(event): boolean {
        event.stopPropagation();
        this.postNewReply()
            .then(() => this.router.navigate(['/topic', this.topicId]))
            .catch(error => this.displayErrors(error));
        return false;
    }

    onCancel(event): boolean {
        event.stopPropagation();
        this.location.back();
        return false;
    }

    onCaptchaResolve(captchaResponse: string): void {
        this.captchaResponse = captchaResponse;
    }

    private postNewReply(): Promise<any> {
        if (this.requireCaptcha) {
            this.postModel['g-recaptcha-response'] = this.captchaResponse;
        }
        if (this.quoteId) {
            this.postModel['quote_id'] = this.quoteId;
        }

        this.postModel.topic_id = this.topicId;
        this.postModel.message = this.textEditor.getContent();

        return this.forumsService
            .newReply(this.postModel);
    }

    private loadCaptchaStatus(): Promise<any> {
        return this.forumsService
            .getCaptcha()
            .then(data => this.requireCaptcha = data.show_captcha);
    }

    private loadPost(postId: string): Promise<any> {
        return this.forumsService
            .getPost(postId)
            .then(data => this.post = data);
    }

    private getUserData(): Promise<any> {
        return this.userService
            .getUserData()
            .then(data => this.userData = data);
    }

    private displayErrors(errors: any): void {
        let dialogRef: MatDialogRef<ErrorDialogComponent> = this.dialog.open(ErrorDialogComponent, {
            data: {
                title: 'Error',
                content: Array.isArray(errors) ? errors.join('<br />') : errors
            }
        });
    }
}
