import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-choice',
  templateUrl: './upload-choice.component.html'
})
export class UploadChoiseComponent {
  @Output() nextLayout: EventEmitter<string>;
  activeView: boolean;
  haveChoice: boolean;
  selectedView: number;
  icons: Array<string>;
  constructor() {
    this.nextLayout = new EventEmitter();
    this.activeView = false;
    this.haveChoice = false;
    this.selectedView = 0;
    this.icons = ['Insatisfait', 'Neutre', 'Satisfait', 'Tres-Satisfait'];
  }

  /**
   * Mange active icons.
   * @param {string} icon
   * @param {number} index
   * @returns {string}
   */
  getIcon(icon: string, index: number): string {
    return index === this.selectedView ? `${icon}_green` : `${icon}`;
  }

  /**
   * Select next Layout.
   * @param {string} LayoutName
   * @returns {void}
   */
  goto(LayoutName: string): void {
    this.nextLayout.emit(LayoutName);
  }

  /**
   * Select view.
   * @returns {void}
   */
  makeChoice(): void {
    /** Call to API */
    this.haveChoice = true;
  }
}
