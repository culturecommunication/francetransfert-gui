import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Transfer } from "@flowjs/ngx-flow";

@Component({
  selector: "app-upload-item",
  templateUrl: "./upload-item.component.html"
})
export class UploadItemComponent {
  @Input() transfer: Transfer;
  @Output() deletedTransfer: EventEmitter<Transfer>;

  constructor() {
    this.deletedTransfer = new EventEmitter();
  }

  /**
   * Send transfer to delete
   * @returns {void}
   */
  deleteTransfer(): void {
    this.deletedTransfer.emit(this.transfer);
  }
}
