import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'ft-download-elements',
  templateUrl: './download-elements.component.html',
  styleUrls: ['./download-elements.component.scss']
})
export class DownloadElementsComponent implements OnInit {

  @Output() dowloadStarted: EventEmitter<boolean> = new EventEmitter();
  @Input() availabilityDate: Date;
  remainingDays: number;
  checkCGU: boolean = false;

  constructor(private router: Router) {
    this.checkCGU = false;
  }

  ngOnInit(): void {
    this.remainingDays = this.calculateDiff(this.availabilityDate)
  }

  download() {
    this.dowloadStarted.emit(true);
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

  routeToInNewWindow(_route) {
    // Converts the route into a string that can be used
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/${_route}`])
    );

    window.open(url, '_blank');
  }


  cguChecked() {
    this.checkCGU = !this.checkCGU;
  }
}
