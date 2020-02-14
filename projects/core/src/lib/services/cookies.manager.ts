import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { COOKIES_CONSTANTS } from '../configuration/cookie.config';

@Injectable({
  providedIn: 'root'
})
export class CookiesManagerService {
  constructor(private cookieService: CookieService) {}

  /**
   * Returns _isConsented value.
   * @returns {boolean}
   */
  isConsented(): boolean {
    return +this.cookieService.get(COOKIES_CONSTANTS.CONSENTED) === 1;
  }

  /**
   * Set _isConsented value.
   * @returns {boolean}
   */
  setConsented(): void {
    this.cookieService.set(
      COOKIES_CONSTANTS.CONSENTED,
      '1',
      COOKIES_CONSTANTS.EXPIRED,
      COOKIES_CONSTANTS.PATH,
      COOKIES_CONSTANTS.DOMAINE,
      COOKIES_CONSTANTS.SECURE
    );
  }

  /**
   * Returns item from cookies.
   * @param {string} itemName
   * @returns {string}
   */
  getItem(itemName: string): string {
    return this.isConsented() ? this.cookieService.get(itemName) : '';
  }

  /**
   * Insert item content in cookies.
   * @param {string} itemName
   * @param {any} content
   * @returns {string}
   */
  setItem(itemName: string, content: any): void {
    if (this.isConsented()) {
      this.cookieService.set(itemName, content);
    }
  }
}
