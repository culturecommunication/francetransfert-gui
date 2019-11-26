import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Transfer } from "@flowjs/ngx-flow";
import { FTTransfer } from "../../models/ft-transfers";
@Component({
  selector: "file-item",
  template: `
    <div class="upload-item">
      <div [hidden]="transfer.folder" class="upload-item-icon file"></div>
      <div [hidden]="!transfer.folder" class="upload-item-icon folder"></div>
      <div class="upload-item-details">
        <p class="upload-item-title font-bold">
          {{ transfer.name | filename }}
        </p>
        <p class="upload-item-size text-gris-m1">
          {{ transfer.size | filesize }}
        </p>
        <p *ngIf="!transfer.folder" class="upload-item-type text-gris-m1">
          {{ transfer.name | filetype }}
        </p>
        <p *ngIf="transfer.folder" class="upload-item-type text-gris-m1">
          Dossier
        </p>
      </div>
      <div class="upload-item-delete" (click)="deleteTransfer()"></div>
    </div>
  `
})
export class FileItemComponent {
  @Input() transfer: FTTransfer<Transfer>;
  @Output() deletedTransfer: EventEmitter<Transfer>;
  constructor() {
    this.deletedTransfer = new EventEmitter();
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
