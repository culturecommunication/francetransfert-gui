import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Transfer } from "@flowjs/ngx-flow";

@Component({
  selector: "file-item",
  template: `
    <div class="upload-item" [ngClass]="{ uploaded: transfer.progress === 1 }">
      <div class="upload-item-icon" *ngIf="transfer.progress === 1"></div>
      <div class="upload-item-details">
        <p class="upload-item-title font-bold">
          {{ transfer.name | filename }}
        </p>
        <p class="upload-item-size text-gris-m1">
          {{ transfer.size | filesize }}
        </p>
        <p class="upload-item-type text-gris-m1">
          {{ transfer.name | filetype }}
        </p>
      </div>
      <div
        class="upload-item-delete"
        *ngIf="transfer.progress === 1"
        (click)="deleteTransfer()"
      ></div>
    </div>
  `
})
export class FileItemComponent {
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
