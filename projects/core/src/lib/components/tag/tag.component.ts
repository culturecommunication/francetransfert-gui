import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'lib-tag',
  template: `
    <div class="tag" [ngClass]="{ 'without-delete': withoutDelete }">
      <small class="font-bold">{{ content }}</small>
      <div [hidden]="withoutDelete" class="delete-button" (click)="deleteEmail()"></div>
    </div>
  `
})
export class TagComponent {
  @Output() deleted: EventEmitter<string>;
  @Input() content: string;
  @Input() withoutDelete: boolean;

  constructor() {
    this.deleted = new EventEmitter();
  }

  /**
   * Delete email
   * @returns {void}
   */

  deleteEmail(): void {
    this.deleted.emit(this.content);
  }
}
