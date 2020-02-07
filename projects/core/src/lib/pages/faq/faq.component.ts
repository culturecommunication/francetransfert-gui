import { Component } from '@angular/core';

@Component({
  selector: 'lib-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent {
  baseUrl: string;
  constructor() {
    this.baseUrl = window.location.origin;
  }

  returnHome() {
    window.location.href = this.baseUrl;
  }
}
