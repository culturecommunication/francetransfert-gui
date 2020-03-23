import { Component, Input } from '@angular/core';
import { CookiesManagerService } from '../../services/cookies.manager';
@Component({
  selector: 'lib-cookies-banner',
  template: `
    <div class="cookies-banner" [ngClass]="{ show: show }">
      <div class="cookies-banner-container">
        <div class="cookies-banner-content">
          <h5>
            FranceTransfert utilise des cookies et le stockage local de votre navigateur pour fluidifier le service.
          </h5>
          <p>
            En poursuivant votre navigation sur ce site, vous acceptez leur utilisation
            <a target="_blank" routerLink="/faq">Plus d'infos</a>
          </p>
        </div>
        <div class="cookies-banner-buttons">
          <button class=" button button-stroked" (click)="declineCookies()">
            Fermer
          </button>
          <button class=" button button-primary" (click)="acceptCookies()">
            Accepter
          </button>
        </div>
      </div>
    </div>
  `
})
export class CookiesBannerComponent {
  @Input() show: boolean;
  constructor(private cookiesManager: CookiesManagerService) {}

  /**
   * Hide banner.
   * @returns {void}
   */
  declineCookies(): void {
    this.show = false;
  }

  /**
   * Insert Cookies and hide banner.
   * @returns {void}
   */
  acceptCookies(): void {
    this.cookiesManager.setConsented();
    this.show = false;
  }
}
