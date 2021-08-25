import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponsiveService } from 'src/app/services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ft-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  isMobile: boolean = false;
  responsiveSubscription: Subscription = new Subscription;
  version: string;

  constructor(private responsiveService: ResponsiveService) { 
    this.version = environment.version;
  }

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
    });
  }

}
