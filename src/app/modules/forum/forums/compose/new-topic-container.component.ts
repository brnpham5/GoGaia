import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';

import { environment } from '../../../../../environments/environment';

import { UserData } from '../../classes/userdata';
import { UserDataService } from '../../services/userdata.service';
import { ForumsService } from '../forums.service';

import { ErrorDialogComponent } from '../../components/error-dialog.component';
import { TextEditorComponent } from '../../components/texteditor.component';

@Component({
    selector: 'new-topic-container',
    templateUrl: './new-topic-container.component.html'
})
export class NewTopicContainerComponent implements OnInit, OnDestroy {
    @ViewChild('texteditor') textEditor: TextEditorComponent;

    captchaSiteKey: string = environment.recaptchaSiteKey;
    captchaResponse: string;
    requireCaptcha: boolean;

    subscription: any;
    forumId: number;
    topicModel: any = {};

    isLoading: boolean = true;
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
            this.forumId = +params['forumId'];

            Promise.all([
                this.loadCaptchaStatus(),
                this.getUserData()
            ]).then(() => this.isLoading = false);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit(event): boolean {
        event.stopPropagation();
        this.postNewTopic()
            .then(() => this.router.navigate(['/forum', this.forumId]))
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

    private postNewTopic(): Promise<any> {
        if (this.requireCaptcha) {
            this.topicModel['g-recaptcha-response'] = this.captchaResponse;
        }

        this.topicModel.forum_id = this.forumId;
        this.topicModel.message = this.textEditor.getContent();

        return this.forumsService
            .newTopic(this.topicModel);
    }

    private loadCaptchaStatus(): Promise<any> {
        return this.forumsService
            .getCaptcha()
            .then(data => this.requireCaptcha = data.show_captcha);
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
