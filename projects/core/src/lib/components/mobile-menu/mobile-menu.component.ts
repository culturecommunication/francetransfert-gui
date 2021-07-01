import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-mobile-menu',
  template: `
    <div class="mobile-menu-wrapper">
      <mat-list class="mobile-menu-list">
        <mat-list-item role="listitem" class="logo-item">
          <div class="logo">
            <img src="./assets/images/svgs/logo_marianne.svg" alt="Ministère de la culture" />
          </div>
        </mat-list-item>
        <mat-divider></mat-divider>
        <mat-list-item role="listitem" (click)="goTo('/cgu')"
          ><div class="icon-wrapper"><rmx-icon name="arrow-right-s-line"></rmx-icon></div>
          <span>CGU</span></mat-list-item
        >
        <mat-divider></mat-divider>
        <mat-list-item role="listitem" (click)="goTo('/faq')"
          ><div class="icon-wrapper"><rmx-icon name="arrow-right-s-line"></rmx-icon></div>
          <span>F.A.Q</span></mat-list-item
        >
        <mat-divider></mat-divider>
        <mat-list-item role="listitem" (click)="goTo('/ml')"
          ><div class="icon-wrapper"><rmx-icon name="arrow-right-s-line"></rmx-icon></div>
          <span>Mentions Légales</span></mat-list-item
        >
        <mat-divider></mat-divider>
      </mat-list>
      <div class="mobile-menu-bottom">
        <mat-divider></mat-divider>
        <h6>© {{ today | date: 'yyyy' }} Service en bêta test du Ministère de la culture</h6>
      </div>
    </div>
  `
})
export class MobileMenuComponent implements OnInit {
  public today: Date;

  constructor(private router: Router) {
    this.today = new Date();
  }

  ngOnInit() {}

  goTo(event) {
    this.router.navigate([]).then(result => {
      window.open(event, '_blank');
    });
  }
}
