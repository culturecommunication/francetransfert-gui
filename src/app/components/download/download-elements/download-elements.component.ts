import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ft-download-elements',
  templateUrl: './download-elements.component.html',
  styleUrls: ['./download-elements.component.scss']
})
export class DownloadElementsComponent implements OnInit {

  @Output() dowloadStarted: EventEmitter<boolean> = new EventEmitter();
  @Input() availabilityDate: Date;
  remainingDays: number

  constructor() { }

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

}
