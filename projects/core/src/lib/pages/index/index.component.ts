import { Component, OnInit } from '@angular/core';
import { CookiesManagerService } from '../../services/cookies.manager';

@Component({
  selector: 'lib-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {
  public today: Date;
  public showBanner: boolean;
  public baseUrl: string;

  constructor(private _cookiesManager: CookiesManagerService) {
    this.today = new Date();
    this.showBanner = false;
    this.baseUrl = window.location.origin;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showBanner = !this._cookiesManager.isConsented();
    }, 1500);
  }

  openBlank(url: string): void {
    window.open(url, '_blank');
  }

  returnHome() {
    window.location.href = this.baseUrl;
  }
}
