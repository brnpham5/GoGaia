import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modules
import { FrontPageRoutingModule } from './front-page-routing.module';
import { BulletinModule } from "./gaia-bulletin/bulletin.module";

//Components
import { FrontPageComponent } from './front-page.component';

@NgModule({
  declarations: [
    FrontPageComponent,
  ],
  imports: [
    FrontPageRoutingModule,
    CommonModule,
    BulletinModule
  ],
})
export class FrontPageModule { }
