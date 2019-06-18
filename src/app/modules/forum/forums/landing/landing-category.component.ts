import { Component, Input } from '@angular/core';

import { Category } from '../classes/category';

@Component({
    selector: 'landing-category',
    templateUrl: './landing-category.component.html'
})
export class LandingCategoryComponent {
    @Input() category: Category;
}
