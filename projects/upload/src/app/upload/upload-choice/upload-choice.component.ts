import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-upload-choice',
  templateUrl: './upload-choice.component.html'
})
export class UploadChoiseComponent {
  @Output() nextLayout: EventEmitter<string>;
  @Input() emailSender: string;
  activeView: boolean;
  haveChoice: boolean;
  selectedView: number;
  icons: Array<string>;
  message: string;
  limitDate: Date;
  constructor(private _uploadService: UploadService) {
    this.nextLayout = new EventEmitter();
    this.activeView = false;
    this.haveChoice = false;
    this.selectedView = -1;
    this.message = '';
    this.limitDate = new Date();
    this.limitDate.setDate(this.limitDate.getDate() + 30);
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
    this._uploadService
      .rate({ mail: this.emailSender, message: this.message, satisfaction: this.selectedView })
      .pipe(take(1))
      .subscribe(() => {});
    this.haveChoice = true;
  }
}
