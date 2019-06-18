import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'SpoilerPipe'
})
export class SpoilerPipe implements PipeTransform {
    transform(value: string): string {
        let newValue = value.replace(/<div class="spoiler-wrapper spoiler-hidden">/g, '<div class="spoiler-wrapper spoiler-revealed">');
        return `${newValue}`;
    }
} 