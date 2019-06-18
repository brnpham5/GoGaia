import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingContainerComponent } from './landing/landing-container.component';
import { CategoryContainerComponent } from './category/category-container.component';
import { ForumContainerComponent } from './forum/forum-container.component';
import { TopicContainerComponent } from './topic/topic-container.component';
import { NewTopicContainerComponent } from './compose/new-topic-container.component';
import { NewReplyContainerComponent } from './compose/new-reply-container.component';

const routes: Routes = [
    { path: '', component: LandingContainerComponent },
    { path: 'category/:id', component: CategoryContainerComponent },
    { path: 'category/:name/:id', component: CategoryContainerComponent },
    { path: 'forum/:id', component: ForumContainerComponent },
    { path: 'forum/:name/:id', component: ForumContainerComponent },
    { path: 'topic/:topicId', component: TopicContainerComponent },
    { path: 'topic/:topicName/:topicId', component: TopicContainerComponent },
    { path: 'topic/:forumName/:topicName/:topicId', component: TopicContainerComponent },
    { path: 'compose/topic/new/:forumId', component: NewTopicContainerComponent },
    { path: 'compose/reply/new/:topicId', component: NewReplyContainerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ForumsRoutingModule {}
