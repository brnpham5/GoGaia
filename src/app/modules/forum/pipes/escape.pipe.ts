import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'escape'
})
export class EscapePipe implements PipeTransform {
    transform(value: string): string {
        return value
            .replace(/[^a-zA-Z0-9\-\s\/]/g, '')
            .trim()
            .replace(/\s+|\//g, '-')
            .toLowerCase();
    }
}
