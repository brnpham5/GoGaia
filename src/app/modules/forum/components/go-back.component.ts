import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'go-back',
    templateUrl: './go-back.component.html',
    styleUrls: ['./go-back.component.css']
})
export class GoBackComponent {

    constructor(private location: Location) {}

    onClick(): void {
        this.location.back();
    }
}
