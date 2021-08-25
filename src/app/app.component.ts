import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  fixedTopGap = 114;
  backgroundPath: string;

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
      if (isMobile) {
        this.opened = false;
        this.sideNavMode = 'over';
        this.fixedTopGap = 114
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
    if (this.isMobile) {
      this.sidenav.toggle();
    }
  }
}
