import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-tag",
  templateUrl: "./tag.component.html"
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
