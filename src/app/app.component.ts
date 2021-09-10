import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { BackgroundSelectionService, PwaService, ResponsiveService, TarteaucitronService } from './services';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  opened: boolean = false;
  isMobile: boolean = false;
  sideNavMode: MatDrawerMode = 'over';
  responsiveSubscription: Subscription = new Subscription;
  @ViewChild('sidenav') sidenav!: MatSidenav;
  @ViewChild('topRoot') private topRoot: ElementRef;
  fixedTopGap = 114;
  backgroundPath: string;
  screenWidth: string;

  constructor(private responsiveService: ResponsiveService,
    private pwaService: PwaService,
    private tarteaucitronService: TarteaucitronService,
    private backgroundSelectionService: BackgroundSelectionService) {
    this.pwaService.checkForUpdates();
  }

  ngOnInit() {
    this.backgroundPath = this.backgroundSelectionService.getBackground();
    this.tarteaucitronService.initTarteaucitron();
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.screenWidth = this.responsiveService.screenWidth;
      if (isMobile) {
        this.opened = false;
        this.sideNavMode = 'over';
        this.fixedTopGap = 0;
      }
    });
    this.onResize();
  }

  ngOnDestroy() {
    this.responsiveSubscription.unsubscribe();
  }

  onResize() {
    this.responsiveService.checkWidth();
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }

  onRoutingCalled(_event) {
    if (_event && this.topRoot) {
      this.topRoot.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}
