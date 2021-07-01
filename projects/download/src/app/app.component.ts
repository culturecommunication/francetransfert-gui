import { Component } from '@angular/core';
import { ResponsiveService } from 'projects/core/src/lib/services/responsive/responsive.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  template: `
    <div (window:resize)="onResize()">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  opened: boolean;
  isMobile: boolean;
  responsiveSubscription: Subscription;

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      if (isMobile) {
        // console.log('Mobile device detected');
        this.isMobile = isMobile;
      } else {
        // console.log('Desktop detected');
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
}
