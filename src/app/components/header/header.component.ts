import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponsiveService, UploadManagerService } from 'src/app/services';
import { LoginService } from 'src/app/services/login/login.service';

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

  constructor(private responsiveService: ResponsiveService, private loginService: LoginService,
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

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  logout() {
    this.loginService.logout();
    this._router.navigate(['/upload']);
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  routeTo(_route) {
    this._router.navigate([_route]);
    this.routingCalled.emit(true);
  }
}