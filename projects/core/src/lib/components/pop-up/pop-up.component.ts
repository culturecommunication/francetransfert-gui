import { Component, Inject, EventEmitter } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  input?: any;
  content?: string;
  button?: any;
}

@Component({
  selector: 'lib-pop-up',
  template: `
    <div class="pop-up">
      <h3 *ngIf="data?.title">{{ data?.title }}</h3>
      <mat-dialog-content>
        <div *ngIf="data?.content" [innerHTML]="data?.content"></div>
        <p *ngIf="haveError" class="text-error">Le code fourni ne correspond pas à la valeur attendue</p>
        <input
          *ngIf="data?.input"
          type="text"
          placeholder="{{ data?.input?.placeholder }}"
          [(ngModel)]="inputText"
          (change)="haveError = false"
          (keyup)="haveError = false"
        />
      </mat-dialog-content>
      <mat-dialog-actions align="center" *ngIf="data?.button">
        <button class=" button button-stroked" *ngIf="data?.button?.unDo" (click)="unDo()">
          {{ data?.button?.unDo }}
        </button>
        <button
          [ngClass]="{ disabled: !inputText.length }"
          class="button button-primary"
          *ngIf="data?.button?.do"
          (click)="do()"
        >
          {{ data?.button?.do }}
        </button>
      </mat-dialog-actions>
    </div>
  `
})
export class PopUpComponent {
  inputText: string;
  action: EventEmitter<any>;
  haveError: boolean;
  constructor(public dialogRef: MatDialogRef<PopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.inputText = '';
    this.action = new EventEmitter();
    this.haveError = false;
  }

  /** Decline function */
  unDo(): void {
    this.dialogRef.close();
  }

  /** Accept function */
  do(): void {
    this.action.emit(this.inputText);
  }
}
