import { Component, OnInit } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { Category } from '../classes/category';
import { Stats } from '../classes/stats';
import { UserData } from '../../classes/userdata';
import { ForumsService } from '../forums.service';
import { UserDataService } from '../../services/userdata.service';

@Component({
    templateUrl: './landing-container.component.html',
    animations: [
        trigger('loadingTransition', [
            state('inactive', style({
                opacity: 0
            })),
            state('active', style({
                opacity: 1
            })),
            transition('inactive => active', animate('250ms ease-in')),
            transition('active => inactive', animate('250ms ease-out'))
        ])
    ]
})
export class LandingContainerComponent implements OnInit {
    loadingState: string = 'inactive';

    categoryList: Array<Category>;
    userData: UserData;
    stats: Stats;

    isLoading: boolean = true;

    constructor(private forumsService: ForumsService,
        private userDataService: UserDataService) {}

    ngOnInit(): void {
        Promise.all([
            this.getUserData(),
            this.getForumData(),
            this.getForumStats()
        ]).then(() => this.notifyLoaded());
    }

    getUserData(): Promise<any> {
        return this.userDataService
            .getUserData()
            .then(uData => this.userData = uData);
    }

    getForumData(): Promise<any> {
        return this.forumsService
            .getCategories()
            .then(categories => this.categoryList = categories);
    }

    getForumStats(): Promise<any> {
        return this.forumsService
            .getStats()
            .then(forumStats => this.stats = forumStats);
    }

    private notifyLoaded(): void {
        this.loadingState = 'active';
        this.isLoading = false;
    }
}
