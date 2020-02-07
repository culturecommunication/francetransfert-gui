import { Component } from '@angular/core';

@Component({
  selector: 'lib-ml',
  templateUrl: './ml.component.html'
})
export class MlComponent {
  baseUrl: string;
  constructor() {
    this.baseUrl = window.location.origin;
  }

  returnHome() {
    window.location.href = this.baseUrl;
  }
}
