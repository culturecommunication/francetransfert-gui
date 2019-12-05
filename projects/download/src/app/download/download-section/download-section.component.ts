import { Component, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CookiesManagerService, COOKIES_CONSTANTS } from '@ft-core';
import { EMAILS, FILES } from '../mock/mock';

@Component({
  selector: 'app-donwload-section',
  templateUrl: './download-section.component.html'
})
export class DownloadSectionComponent implements AfterViewInit {
  @ViewChild('downloadSection', { static: false }) downloadSection: TemplateRef<any>;
  @ViewChild('downloadchoice', { static: false }) downloadchoice: TemplateRef<any>;

  perfectScrollbarConfig: PerfectScrollbarConfigInterface;
  emails: Array<string>;
  transfers: Array<any>;
  password: string;
  withPassword: boolean;
  templateRf: TemplateRef<any>;
  icons: Array<string>;
  selectedView: number;
  activeView: boolean;
  makedchoice: boolean;

  constructor(private cd: ChangeDetectorRef, private cookiesManager: CookiesManagerService) {
    this.perfectScrollbarConfig = {};
    this.emails = EMAILS;
    this.transfers = FILES;
    this.withPassword = true;
    this.icons = ['Insatisfait', 'Neutre', 'Satisfait', 'Tres-Satisfait'];
    this.initDownload();
  }

  /**
   * Init Download
   * @returns {void}
   */
  initDownload(): void {
    this.password = '';
    this.selectedView = 0;
    this.activeView = false;
    this.makedchoice = false;
    if (+this.cookiesManager.getItem(COOKIES_CONSTANTS.HAVE_CHOICE_FORM) === 1) {
      this.cookiesManager.setItem(COOKIES_CONSTANTS.HAVE_CHOICE_GLOBAL, 1);
    }
  }

  /**
   * Select default Layout
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.selectLayout('downloadSection');
  }

  /**
   * Select Layout.
   * @param {string} Layout
   * @returns {void}
   */
  selectLayout(Layout: string): void {
    this.templateRf = this[Layout];
    if (Layout === 'downloadSection') {
      this.initDownload();
    }
    this.cd.detectChanges();
  }

  /**
   * Check if the user have a choice.
   * @returns {boolean}
   */
  checkChoice(): boolean {
    return +this.cookiesManager.getItem(COOKIES_CONSTANTS.HAVE_CHOICE_GLOBAL) === 1;
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
   * Select view.
   * @returns {void}
   */
  makeChoice(): void {
    this.makedchoice = true;
  }

  /**
   * Download Files.
   * @returns {void}
   */
  download(): void {
    this.selectLayout('downloadchoice');
    this.cookiesManager.setItem(COOKIES_CONSTANTS.HAVE_CHOICE_FORM, 1);
  }

  /**
   * Check Valid form (valid) : false ; (invalid) : true
   * @returns {boolean}
   */
  checkValid(): boolean {
    return (!this.makedchoice && !this.checkChoice()) || (this.withPassword && !this.password.length);
  }
}
