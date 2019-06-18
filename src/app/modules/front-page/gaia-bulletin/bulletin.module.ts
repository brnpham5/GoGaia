import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

//Components
import { BulletinComponent }  from './bulletin.component';
import { PostModalComponent } from './modals/modal-post/post-modal.component';
import { PreviewModalComponent } from './modals/modal-preview/preview-modal.component';
import { RewardModalComponent } from './modals/modal-reward/reward-modal.component';
import { ErrorModalComponent } from './modals/modal-error/error-modal.component';

//Pipes
import { SpoilerPipe } from "../../../pipes/spoiler-pipe";

@NgModule({
    declarations: [ 
      BulletinComponent,
      PostModalComponent,
      PreviewModalComponent,
      RewardModalComponent,
      ErrorModalComponent,
      SpoilerPipe
    ],
    imports: [ 
        CommonModule,
        HttpModule
    ],
    exports: [ BulletinComponent ]
})
export class BulletinModule { }