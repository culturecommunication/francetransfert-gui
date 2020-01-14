import { Component, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DownloadService } from '../services/download.service';
import { FTTransfer } from '@ft-core';
import { Transfer } from '@flowjs/ngx-flow';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-donwload-section',
  templateUrl: './download-section.component.html'
})
export class DownloadSectionComponent implements AfterViewInit, OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject();

  @ViewChild('downloadSection', { static: false }) downloadSection: TemplateRef<any>;
  @ViewChild('downloadchoice', { static: false }) downloadchoice: TemplateRef<any>;

  perfectScrollbarConfig: PerfectScrollbarConfigInterface;
  emails: Array<string>;
  transfers: Array<any>;
  password: string;
  withPassword: boolean;
  templateRf: TemplateRef<any>;
  downloadInfos: any;
  params: Array<{ string: string }>;

  constructor(
    private cd: ChangeDetectorRef,
    private _downloadService: DownloadService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.perfectScrollbarConfig = {};
    this.downloadInfos = {};
    this.params = [];
    this.transfers = [];
    this.withPassword = false;
    this.password = '';
  }

  ngOnInit() {
    this._activatedRoute.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe((params: Array<{ string: string }>) => {
      this.params = params;
      this._downloadService
        .getDownloadInfos(params)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe(downloadInfos => {
          this.downloadInfos = downloadInfos;
          this.downloadInfos.rootFiles.map(file => {
            this.transfers.push({ ...file, folder: false } as FTTransfer<Transfer>);
          });
          this.downloadInfos.rootDirs.map(file => {
            this.transfers.push({ ...file, size: file.totalSize, folder: true } as FTTransfer<Transfer>);
          });
        });
    });
  }

  /**
   * Select default Layout
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.selectLayout('downloadSection');
  }

  /**
   * Select Layout.
   * @param {string} Layout
   * @returns {void}
   */
  selectLayout(Layout: string): void {
    this.templateRf = this[Layout];
    this.cd.detectChanges();
  }

  /**
   * Download Files.
   * @returns {void}
   */
  download(): void {
    this._downloadService.getDownloadUrl(this.params, this.downloadInfos.withPassword, this.password);
    this.selectLayout('downloadchoice');
  }

  /**
   * Check Valid form (valid) : false ; (invalid) : true
   * @returns {boolean}
   */
  checkValid(): boolean {
    return this.downloadInfos && this.downloadInfos.withPassword && !this.password.length;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
