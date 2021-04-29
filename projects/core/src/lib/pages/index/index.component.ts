import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CookiesManagerService } from '../../services/cookies.manager';
import { ResponsiveService } from '../../services/responsive/responsive.service';

@Component({
  selector: 'lib-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, OnDestroy {
  public today: Date;
  public showBanner: boolean;
  public baseUrl: string;
  opened = false;
  isMobile: boolean;
  responsiveSubscription: Subscription;
  routerEventsSubscription: Subscription;
  isOnMainPage: boolean;

  constructor(
    private _cookiesManager: CookiesManagerService,
    private responsiveService: ResponsiveService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.today = new Date();
    this.showBanner = false;
    this.baseUrl = window.location.origin;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showBanner = !this._cookiesManager.isConsented();
    }, 1500);
    this.onResize();
    this.responsiveService.checkWidth();
    if (this.activatedRoute.snapshot.url.length > 0) {
      this.isOnMainPage = false;
    } else {
      this.isOnMainPage = true;
    }
    this.routerEventsSubscription = this.router.events.subscribe((url: any) => {
      if (url === '/') {
        this.isOnMainPage = true;
      } else {
        this.isOnMainPage = false;
      }
    });
  }

  openBlank(url: string): void {
    window.open(url, '_blank');
  }

  returnHome() {
    window.location.href = this.baseUrl;
  }

  ngOnDestroy() {
    this.responsiveSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
  }

  onResize() {
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
