import { Component, EventEmitter, Output, Input } from '@angular/core';

import { FTTransfer } from '@ft-core';
import { Transfer } from '@flowjs/ngx-flow';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-upload-content',
  templateUrl: './upload-content.component.html'
})
export class UploadContentComponent {
  @Output() nextLayout: EventEmitter<string>;
  @Input() transfers: Array<FTTransfer<Transfer>>;
  @Input() emails: Array<string>;
  @Input() message: string;
  perfectScrollbarConfig: PerfectScrollbarConfigInterface;

  constructor() {
    this.perfectScrollbarConfig = {};
    this.nextLayout = new EventEmitter();
  }

  /**
   * Select next Layout.
   * @param {string} LayoutName
   * @returns {void}
   */
  goto(LayoutName: string): void {
    this.nextLayout.emit(LayoutName);
  }
}
