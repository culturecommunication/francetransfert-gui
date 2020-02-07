import { Component } from '@angular/core';

@Component({
  selector: 'lib-cgu',
  templateUrl: './cgu.component.html'
})
export class CguComponent {
  baseUrl: string;
  constructor() {
    this.baseUrl = window.location.origin;
  }

  returnHome() {
    window.location.href = this.baseUrl;
  }
}
