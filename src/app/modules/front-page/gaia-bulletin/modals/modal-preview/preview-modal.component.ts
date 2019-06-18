import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: [
    './preview-modal.component.css',
    '../../../../../shared/gaia-styles/common.css'
  ],
  animations: [
    trigger('preview', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(175)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class PreviewModalComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() body: string;
  
  constructor(
      private sanitizer: DomSanitizer
  ) { }

  ngOnInit() { 

  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}