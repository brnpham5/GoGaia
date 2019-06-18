import { Component, OnInit, Input } from '@angular/core';

import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'login-box',
    templateUrl: './login-box.component.html',
    styleUrls: [ './login-box.component.css' ],
})
export class LoginBoxComponent implements OnInit {
    apiUrl = environment.apiUrl;

    constructor() { }

    ngOnInit() {
        
    }
}