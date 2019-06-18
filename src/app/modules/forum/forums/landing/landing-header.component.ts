import { Component, Input } from '@angular/core';

import { UserData } from '../../classes/userdata';

@Component({
    selector: 'landing-header',
    templateUrl: './landing-header.component.html',
    styleUrls: ['../../styles/common.css']
})
export class LandingHeaderComponent {
    @Input() userData: UserData;

    title: string = 'Forums';
}
