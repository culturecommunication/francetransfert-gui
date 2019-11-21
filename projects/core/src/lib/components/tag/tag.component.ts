import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "tag",
  template: `
    <div class="tag">
      <small class="font-bold text-blue-clair">{{ content }}</small>
      <div class="delete-button" (click)="deleteEmail()"></div>
    </div>
  `
})
export class TagComponent {
  @Output() deleted: EventEmitter<string>;
  @Input() content: string;

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
