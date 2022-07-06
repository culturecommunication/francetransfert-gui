/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Transfer } from '@flowjs/ngx-flow';
import { FTTransferModel } from 'src/app/models';

@Component({
  selector: 'ft-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent implements OnInit {

  @Input() transfer: FTTransferModel<Transfer>;
  @Input() readOnly: boolean = false;
  @Output() itemAdded: EventEmitter<FTTransferModel<Transfer>> = new EventEmitter();
  @Output() deletedTransfer: EventEmitter<Transfer>;

  constructor() {
    this.deletedTransfer = new EventEmitter();
  }

  ngOnInit(): void {
    this.itemAdded.emit(this.transfer);
  }

  /**
   * Send transfer to delete
   * @returns {void}
   */
  deleteTransfer(): void {
      this.deletedTransfer.emit(this.transfer);
  }

}
