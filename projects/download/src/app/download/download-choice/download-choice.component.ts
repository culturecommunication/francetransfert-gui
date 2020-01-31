import { Component, Output, EventEmitter } from '@angular/core';
import { DownloadService } from '../services/download.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-download-choice',
  templateUrl: './download-choice.component.html'
})
export class DownloadChoiseComponent {
  @Output() nextLayout: EventEmitter<string>;
  activeView: boolean;
  haveChoice: boolean;
  selectedView: number;
  icons: Array<string>;
  message: string;
  constructor(private _downloadService: DownloadService, private _router: Router) {
    this.nextLayout = new EventEmitter();
    this.activeView = false;
    this.haveChoice = false;
    this.selectedView = 0;
    this.message = '';
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
   * Go to
   * @param {string} LayoutName
   * @returns {void}
   */
  goto(): void {
    this._router.navigateByUrl('/');
  }

  /**
   * Select view.
   * @returns {void}
   */
  makeChoice(): void {
    this._downloadService
      .rate({ mail: '', message: this.message, satisfaction: this.selectedView })
      .pipe(take(1))
      .subscribe(() => {});
    this.haveChoice = true;
  }
}
