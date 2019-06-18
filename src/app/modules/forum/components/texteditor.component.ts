import {
    Component,
    OnDestroy,
    AfterViewInit,
    Input
} from '@angular/core';

import { tinymce } from "tinymce";

import { environment } from '../../../../environments/environment';

@Component({
    selector: 'text-editor',
    templateUrl: './texteditor.component.html'
})
export class TextEditorComponent implements AfterViewInit, OnDestroy {
    @Input() elementId: string;

    editor: any;

    ngAfterViewInit() {
        tinymce.init({
            selector: '#' + this.elementId,
            branding: false,
            plugins: ['bbcode', 'image', 'link'],
            skin_url: environment.assetPath + '/skins/lightgray',
            setup: editor => this.editor = editor
        });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
    }

    getContent() {
        return this.editor.getContent();
    }
}
