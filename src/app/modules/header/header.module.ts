import { NgModule }      from "@angular/core";
import { CommonModule } from '@angular/common';

import { FormsModule } from "@angular/forms";

import { HeaderComponent }  from "./header.component";

//Header Content
import { HeaderContentComponent } from "./header-content/header-content.component";
import { NotificationBoxComponent } from "./header-content/notification-box/notification-box.component";
import { LoginBoxComponent } from "./header-content/login-box/login-box.component";

//NavBar Content
import { NavBarComponent } from "./navbar/navbar.component";
import { BurgerMenuComponent } from "./navbar/burger-menu/burger-menu.component";
import { ExploreMenuComponent } from "./navbar/explore-menu/explore-menu.component";
import { IconCarouselComponent } from "./icon-carousel/icon-carousel.component";
import { FullMenuComponent } from "./navbar/full-menu/full-menu.component";
import { BurgerContentComponent } from "./navbar/burger-menu/burger-content.component";
import { GSearchPopupComponent } from "./navbar/gsearch-popup/gsearch-popup.component";

//Modals
import { NotificationModalComponent } from "./header-modal/notifications/notification-modal.component";
import { NameDropDownModalComponent } from "./header-modal/name-dropdown/name-dropdown-modal.component";
import { ColorPickerModalComponent } from "./header-modal/color-picker/color-picker-modal.component";

import { RoundCurrencyPipe } from "../../pipes/roundCurrencyPipe";

//Material
import { MatIconRegistry } from "@angular/material";
import { MaterialModule } from "../../material.module";

//External Libraries
import { ColorPickerModule } from "ngx-color-picker";

@NgModule({
    declarations: [ 
        HeaderComponent,
        HeaderContentComponent,
        NotificationBoxComponent,
        NotificationModalComponent,
        NameDropDownModalComponent,
        ColorPickerModalComponent,
        LoginBoxComponent,
        NavBarComponent,
        BurgerMenuComponent,
        ExploreMenuComponent,
        IconCarouselComponent,
        FullMenuComponent,
        BurgerContentComponent,
        GSearchPopupComponent,
        RoundCurrencyPipe,
    ],
    imports: [ 
        ColorPickerModule,
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    providers: [
        MatIconRegistry
    ],
    entryComponents: [

    ],
    exports: [ HeaderComponent ]
})
export class HeaderModule { }