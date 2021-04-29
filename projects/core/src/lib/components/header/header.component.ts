import { APP_BASE_HREF } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, OnDestroy, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponsiveService } from '../../services/responsive/responsive.service';

@Component({
  selector: 'lib-header',
  template: `
    <mat-toolbar class="ft-header">
      <button *ngIf="isMobile" mat-icon-button (click)="onToggleSidenav()" class="menu-icon">
        <rmx-icon name="menu-line"></rmx-icon>
      </button>
      <div class="header-logos" *ngIf="!isMobile; else ftLogo">
        <div class="logo-marianne" (click)="returnHome()">
          <img src="./assets/images/svgs/logo_marianne.svg" alt="Ministère de la culture" />
        </div>
        <div class="logo" (click)="returnHome()">
          <img src="./assets/images/svgs/ft-2.svg" alt="FranceTransfert logo" />
        </div>
      </div>
      <ng-template #ftLogo>
        <div class="logo" (click)="returnHome()">
          <img src="./assets/images/svgs/ft-2.svg" alt="FranceTransfert logo" />
        </div>
      </ng-template>
      <div class="flags">
        <mat-select [(value)]="defaultLanguage">
          <mat-select-trigger class="language-selected">
            <img [src]="defaultLanguage.flagUrl" class="flag-icon" />{{ defaultLanguage.code | uppercase }}
          </mat-select-trigger>
          <mat-option [value]="lang" *ngFor="let lang of languageList" class="language-option"
            ><img [src]="lang.flagUrl" class="flag-icon" /><span>{{ lang.label }}</span></mat-option
          >
        </mat-select>
        <!-- <a href="/{{ lang.href }}"><img [src]="lang.flagUrl"/></a> -->
      </div>
    </mat-toolbar>
  `
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() public sidenavToggle = new EventEmitter();
  isMobile: boolean;
  responsiveSubscription: Subscription;

  languageList;
  defaultLanguage;

  constructor(
    @Inject(APP_BASE_HREF) public baseHref: string,
    private responsiveService: ResponsiveService,
    private router: Router
  ) {}

  ngOnInit() {
    this.onResize();
    this.responsiveService.checkWidth();
    const rootHref = this.baseHref.split('/');
    this.languageList = [
      { code: 'fr', label: 'Français', flagUrl: './assets/images/svgs/flag_fr.svg', href: `${rootHref[1]}/fr/` },
      { code: 'en', label: 'English', flagUrl: './assets/images/svgs/flag_en.svg', href: `${rootHref[1]}/en/` },
      { code: 'de', label: 'Deutsch', flagUrl: './assets/images/svgs/flag_de.svg', href: `${rootHref[1]}/de/` },
      { code: 'es', label: 'Español', flagUrl: './assets/images/svgs/flag_es.svg', href: `${rootHref[1]}/es/` }
    ];
    this.defaultLanguage = this.languageList[0];
  }

  returnHome() {
    this.router.navigate(['']);
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  ngOnDestroy() {
    this.responsiveSubscription.unsubscribe();
  }

  onResize() {
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
