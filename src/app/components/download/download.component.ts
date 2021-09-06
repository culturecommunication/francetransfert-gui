import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { FTTransferModel } from 'src/app/models';
import { DownloadService } from 'src/app/services';
import { FLOW_CONFIG } from 'src/app/shared/config/flow-config';

@Component({
  selector: 'ft-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();
  downloadValidated: boolean = false;
  downloadStarted: boolean = false;
  usingPublicLink: boolean = false;
  transfers: Array<any> = [];
  downloadInfos: any;
  emails: Array<string>;
  password: string;
  passwordError: boolean;
  withPassword: boolean;
  params: Array<{ string: string }>;
  @ViewChild('flow')
  flow: FlowDirective;
  flowConfig: any;

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

  constructor(private _downloadService: DownloadService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.flowConfig = FLOW_CONFIG;
    this._activatedRoute.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe((params: Array<{ string: string }>) => {
      this.params = params;
      if (this.params['enclosure'] && this.params['recipient'] && this.params['token']) {
        this._downloadService
          .getDownloadInfos(params)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(downloadInfos => {
            this.downloadInfos = downloadInfos;
            this.downloadInfos.rootFiles.map(file => {
              this.transfers.push({ ...file, folder: false } as FTTransferModel<Transfer>);
            });
            this.downloadInfos.rootDirs.map(file => {
              this.transfers.push({ ...file, size: file.totalSize, folder: true } as FTTransferModel<Transfer>);
            });
          });
      } else {
        if (this._router.url.includes('download/download-info-public')) {
          if (this.params['enclosure']) {
            this._downloadService
              .getDownloadInfosPublic(params)
              .pipe(takeUntil(this.onDestroy$))
              .subscribe(downloadInfosPublic => {
                this.downloadInfos = downloadInfosPublic;
                this.downloadInfos.rootFiles.map(file => {
                  this.transfers.push({ ...file, folder: false } as FTTransferModel<Transfer>);
                });
                this.downloadInfos.rootDirs.map(file => {
                  this.transfers.push({ ...file, size: file.totalSize, folder: true } as FTTransferModel<Transfer>);
                });
              });
            this.usingPublicLink = true;
          }
        } else {
          if (this.params['mock']) {
            this.downloadInfos = this.MOCK_RESPONSE_DOWNLOAD;
            this.downloadInfos.rootFiles.map(file => {
              this.transfers.push({ ...file, folder: false } as FTTransferModel<Transfer>);
            });
            this.downloadInfos.rootDirs.map(file => {
              this.transfers.push({ ...file, size: file.totalSize, folder: true } as FTTransferModel<Transfer>);
            });
          } else {
            this._router.navigateByUrl('/error');
          }
        }
      }
    });
  }

  download(): void {
    if (this.usingPublicLink) {
      this._downloadService
        .getDownloadUrlPublic(this.params, this.password)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(result => {
          console.log(result)
          if (result.type && result.type === 'WRONG_PASSWORD') {
            this.passwordError = true;
          } else {
            window.location.assign(result.downloadURL);
            this.downloadStarted = true;
          }
        });
    } else {
      this._downloadService
        .getDownloadUrl(this.params, this.downloadInfos.withPassword, this.password)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(result => {
          console.log(result)
          if (result.type && result.type === 'WRONG_PASSWORD') {
            this.passwordError = true;
          } else {
            window.location.assign(result.downloadURL);
            this.downloadStarted = true;
          }
        });
    }

  }

  onDowloadStarted(event) {
    if (event) {
      this.download();
    }
  }

  onDownloadValidated(event) {
    this.password = event;
    this.downloadValidated = true;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
