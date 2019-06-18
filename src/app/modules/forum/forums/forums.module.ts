import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecaptchaModule } from 'ng-recaptcha';

import { SharedModule } from '../shared/shared.module';
import { ForumsRoutingModule } from './forums-routing.module';

import { ErrorDialogComponent } from '../components/error-dialog.component';
import { GoBackComponent } from '../components/go-back.component';
import { NotLoggedInComponent } from '../components/not-logged-in.component';
import { PageSpinnerComponent } from '../components/page-spinner.component';
import { TextEditorComponent } from '../components/texteditor.component';

import { ForumsComponent } from './forums.component';
import { LandingContainerComponent } from './landing/landing-container.component';
import { CategoryContainerComponent } from './category/category-container.component';
import { ForumContainerComponent } from './forum/forum-container.component';
import { TopicContainerComponent } from './topic/topic-container.component';
import { NewTopicContainerComponent } from './compose/new-topic-container.component';
import { NewReplyContainerComponent } from './compose/new-reply-container.component';
import { LandingHeaderComponent } from './landing/landing-header.component';
import { LandingCategoryComponent } from './landing/landing-category.component';
import { LandingStatsComponent } from './landing/landing-stats.component';
import { ForumSubforumComponent } from './forum/forum-subforum.component';
import { ForumTopicComponent } from './forum/forum-topic.component';
import { TopicHeaderComponent } from './topic/topic-header.component';
import { TopicMenuComponent } from './topic/topic-menu.component';
import { TopicPostComponent } from './topic/topic-post.component';

import { ForumsService } from './forums.service';

import { EscapePipe } from '../pipes/escape.pipe';
import { SafePipe } from '../pipes/safe.pipe';

@NgModule({
    imports: [
        HttpModule,
        InfiniteScrollModule,
        NgxPaginationModule,
        RecaptchaModule.forRoot(),
        SharedModule,
        ForumsRoutingModule
    ],
    declarations: [
        ErrorDialogComponent,
        GoBackComponent,
        NotLoggedInComponent,
        PageSpinnerComponent,
        TextEditorComponent,
        ForumsComponent,
        LandingContainerComponent,
        CategoryContainerComponent,
        ForumContainerComponent,
        TopicContainerComponent,
        NewTopicContainerComponent,
        NewReplyContainerComponent,
        LandingHeaderComponent,
        LandingCategoryComponent,
        LandingStatsComponent,
        ForumSubforumComponent,
        ForumTopicComponent,
        TopicHeaderComponent,
        TopicMenuComponent,
        TopicPostComponent,
        EscapePipe,
        SafePipe
    ],
    entryComponents: [
        ErrorDialogComponent
    ]
})
export class ForumsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ForumsModule,
            providers: [
                ForumsService
            ]
        }
    }
}
