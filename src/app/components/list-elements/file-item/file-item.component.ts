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
    console.log(this.transfer);
    this.itemAdded.emit(this.transfer);
  }

  /**
   * Send transfer to delete
   * @returns {void}
   */
  deleteTransfer(): void {
    if (this.transfer.folder) {
      for (let transfer of this.transfer.childs) {
        this.deletedTransfer.emit(transfer);
      }
    } else {
      this.deletedTransfer.emit(this.transfer);
    }
  }

}
