import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ft-download-error',
  templateUrl: './download-error.component.html',
  styleUrls: ['./download-error.component.scss']
})
export class DownloadErrorComponent implements OnInit {

  @Input() downloadAvailable: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
