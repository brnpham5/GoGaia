import { Component } from '@angular/core';

@Component({
    selector: 'not-logged-in',
    templateUrl: './not-logged-in.component.html',
    styleUrls: ['../styles/common.css']
})
export class NotLoggedInComponent {

    currentHref: string = window.location.href;
}
