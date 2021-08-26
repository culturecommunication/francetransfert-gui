import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
  responsiveSubscription: Subscription = new Subscription;
  screenWidth: string;

  constructor(private responsiveService: ResponsiveService) { }

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
}