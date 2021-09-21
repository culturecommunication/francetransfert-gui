import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService } from 'src/app/services';

@Component({
  selector: 'ft-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMobile: boolean = false;
  @Output() sidenavToggle = new EventEmitter();
  @Output() routingCalled: EventEmitter<boolean> = new EventEmitter();
  responsiveSubscription: Subscription = new Subscription;
  screenWidth: string;

  constructor(private responsiveService: ResponsiveService,
    private _router: Router) { }

  ngOnInit(): void {
    this.onResize();
    this.responsiveService.checkWidth();
  }

  ngOnDestroy() {
    this.responsiveSubscription.unsubscribe();
  }

  onResize() {
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.screenWidth = this.responsiveService.screenWidth;
    });
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  backToHome() { 
    if (this._router.url.includes('upload')) {
      window.location.reload();
    } else {
      this._router.navigate(['/upload']);
    }
  }

  routeTo(_route) {
    this._router.navigate([_route]);
    this.routingCalled.emit(true);
  }
}