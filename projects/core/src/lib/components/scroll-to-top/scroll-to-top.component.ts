import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'lib-scroll-to-top',
  template: `
    <div class="scroll-to-top" [ngClass]="{ 'show-scrollTop': windowScrolled }">
      <button mat-fab (click)="scrollToTop()" class="scroll-to-top-btn">
        <mat-icon>expand_less</mat-icon>
      </button>
    </div>
  `
})
export class ScrollToTopComponent implements OnInit {
  windowScrolled: boolean;
  constructor(@Inject(DOCUMENT) private document: Document) {}
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
  ngOnInit() {}
}
