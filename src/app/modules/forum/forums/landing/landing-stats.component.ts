import { Component, Input } from '@angular/core';

import { Stats } from '../classes/stats';

@Component({
    selector: 'landing-stats',
    templateUrl: './landing-stats.component.html'
})
export class LandingStatsComponent {
    @Input() stats: Stats;
}
