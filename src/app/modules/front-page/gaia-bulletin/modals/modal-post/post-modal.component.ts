import { Component, OnInit, Input, Output, OnChanges, EventEmitter, HostListener } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: [ 
    './post-modal.component.css',
    '../../../../../shared/gaia-styles/common.css'
  ],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(175)
      ]),
      transition('* => void', [
        animate(175, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class PostModalComponent implements OnInit {
  apiUrl = environment.apiUrl;
  cdnUrl = environment.cdnUrl;

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() body: string;
  @Input() title: string;
  @Input() username: string;
  @Input() avatar: string;
  @Input() topicId: string;
  @Input() hasReward: boolean;
  @Output() claim: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentHeight: number;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() { 

  }

  claimReward() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.claim.emit(true);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}