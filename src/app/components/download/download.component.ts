import { Component, OnInit } from '@angular/core';
import { Transfer } from '@flowjs/ngx-flow';
import { FTTransferModel } from 'src/app/models';

@Component({
  selector: 'ft-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  downloadValidated: boolean = false;
  transfers: Array<any> = [];
  downloadInfos: any;

  MOCK_RESPONSE_DOWNLOAD = {
    validUntilDate: '2021-08-23',
    senderEmail: 'r.lalanne@actongroup.com',
    rootFiles: [
      { name: 'fond_ecran.jpg', size: 3055454 }
    ],
    rootDirs: [
      { name: 'Projet FT', totalSize: 9055454 },
      { name: 'Références dossier', totalSize: 1011457 }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this.downloadInfos = this.MOCK_RESPONSE_DOWNLOAD;
    this.downloadInfos.rootFiles.map(file => {
      this.transfers.push({ ...file, folder: false } as FTTransferModel<Transfer>);
    });
    this.downloadInfos.rootDirs.map(file => {
      this.transfers.push({ ...file, size: file.totalSize, folder: true } as FTTransferModel<Transfer>);
    });
  }

  onDownloadValidated(event) {
    this.downloadValidated = event;
  }

}
