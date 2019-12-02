import { Component, Output, EventEmitter } from "@angular/core";

import { CookiesManagerService, COOKIES_CONSTANTS } from "@ft-core";

@Component({
  selector: "download-choice",
  templateUrl: "./download-choice.component.html"
})
export class DownloadChoiseComponent {
  @Output() nextLayout: EventEmitter<string>;
  activeView: boolean;
  haveChoice: boolean;
  selectedView: number;
  icons: Array<string>;
  constructor(private cookiesManager: CookiesManagerService) {
    this.nextLayout = new EventEmitter();
    this.activeView = false;
    this.haveChoice = false;
    this.selectedView = 0;
    this.icons = ["Insatisfait", "Neutre", "Satisfait", "Tres-Satisfait"];
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

  /**
   * Check if the user have a choice.
   * @returns {boolean}
   */
  checkChoice(): boolean {
    return (
      (+this.cookiesManager.getItem(COOKIES_CONSTANTS.HAVE_CHOICE_FORM) === 1 &&
        +this.cookiesManager.getItem(COOKIES_CONSTANTS.HAVE_CHOICE_GLOBAL) !==
          1) ||
      !this.cookiesManager.isConsented()
    );
  }
}
