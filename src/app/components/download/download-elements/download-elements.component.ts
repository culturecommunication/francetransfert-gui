import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ft-download-elements',
  templateUrl: './download-elements.component.html',
  styleUrls: ['./download-elements.component.scss']
})
export class DownloadElementsComponent implements OnInit {

  @Output() dowloadStarted: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  download() {
    this.dowloadStarted.emit(true);
  }

}
