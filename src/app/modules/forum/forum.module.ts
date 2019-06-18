import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumComponent } from './forum.component';

import { ForumsModule } from './forums/forums.module';

import { UserDataService } from './services/userdata.service';

@NgModule({
    declarations: [
        ForumComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        ForumRoutingModule,
        ForumsModule.forRoot()
    ],
    providers: [
        UserDataService
    ],
})
export class ForumModule { }
