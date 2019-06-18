import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category } from '../classes/category';
import { ForumsService } from '../forums.service';

@Component({
    selector: 'category-container',
    templateUrl: './category-container.component.html'
})
export class CategoryContainerComponent implements OnInit, OnDestroy {
    subscription: any;
    categoryId: number;
    category: Category;

    isLoading: boolean = true;

    constructor(private route: ActivatedRoute,
        private forumsService: ForumsService) {}

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe(params => {
            this.categoryId = +params['id'];
            this.getCategoryData(this.categoryId)
                .then(() => this.isLoading = false);
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getCategoryData(id: number): Promise<any> {
        return this.forumsService
            .getCategory(id)
            .then(category => this.category = category);
    }
}
