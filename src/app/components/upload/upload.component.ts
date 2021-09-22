import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlowDirective, UploadState } from '@flowjs/ngx-flow';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { take, takeUntil } from 'rxjs/operators';
import { DownloadManagerService, FileManagerService, ResponsiveService, UploadManagerService, UploadService } from 'src/app/services';
import { FLOW_CONFIG } from 'src/app/shared/config/flow-config';

@Component({
  selector: 'ft-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, AfterViewInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject();
  isMobile: boolean = false;
  screenWidth: string;
  uploadStarted: boolean = false;
  uploadFinished: boolean = false;
  uploadValidated: boolean = false;
  uploadManagerSubscription: Subscription;
  responsiveSubscription: Subscription = new Subscription;
  fileManagerSubscription: Subscription = new Subscription;
  senderEmail: string;
  availabilityDate: Date;
  availabilityDays: number;
  @ViewChild('flow')
  flow: FlowDirective;
  flowConfig: any;
  hasFiles: boolean = false;
  listExpanded: boolean = false;

  constructor(private responsiveService: ResponsiveService,
    private uploadManagerService: UploadManagerService,
    private downloadManagerService: DownloadManagerService,
    private fileManagerService: FileManagerService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    this.onResize();
    this.flowConfig = FLOW_CONFIG;
    this.responsiveService.checkWidth();
    this.uploadManagerSubscription = this.uploadManagerService.envelopeInfos.subscribe(_envelopeInfos => {
      if (_envelopeInfos && _envelopeInfos.from) {
        this.senderEmail = _envelopeInfos.from;
        if (_envelopeInfos.parameters) {
          this.availabilityDays = _envelopeInfos.parameters.expiryDays;
        }
      }
    });
    this.fileManagerSubscription = this.fileManagerService.hasFiles.subscribe(_hasFiles => {
      this.hasFiles = _hasFiles;
    });
    this.reset();
  }

  reset() {
    this.uploadStarted = false;
    this.uploadFinished = false;
    this.uploadValidated = false;
    this.uploadManagerService.envelopeInfos.next(null);
    this.uploadManagerService.uploadError$.next(null);
    this.downloadManagerService.downloadError$.next(null);
    //Reset token
    this.uploadManagerService.uploadInfos.next(null);
    if(this.flow){
      this.flow.cancel();
    }
  }

  ngAfterViewInit() {
    
  }

  onResize() {
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.screenWidth = this.responsiveService.screenWidth;
    });
  }

  styleObject(): Object {
    if (this.screenWidth === 'lg') {
      return { '-webkit-flex-direction': 'row' }
    }
    if (this.screenWidth === 'md') {
      if (!this.uploadFinished && !this.uploadStarted) {
        return { '-webkit-flex-direction': 'column-reverse' }
      } else {
        return { '-webkit-flex-direction': 'row' }
      }
    }
    if (this.screenWidth === 'sm') {
      if (this.uploadFinished && this.uploadStarted) {
        return { '-webkit-flex-direction': 'column' }
      } else {
        return { '-webkit-flex-direction': 'column-reverse' }
      }
    }
    return {}
  }

  onUploadStarted(event) {
    this.uploadStarted = event;
    this.upload();
  }

  onTransferCancelled(event) {
    this.uploadStarted = !event;
    this.uploadValidated = !event;
  }

  onTransferFinished(event) {
    this.uploadFinished = event;
  }

  onTransferValidated(event) {
    if (event) {
      // this.uploadValidated = true;
      this.validateCode(event);
    }
  }

  onCheckTransferCancelled(event) {
    if (event) {
      this.uploadStarted = false;
    }
  }

  onSatisfactionCheckDone(event) {
    if (event) {
      this.uploadService.rate({ mail: this.uploadManagerService.envelopeInfos.getValue().from, message: event.message, satisfaction: event.satisfaction }).pipe(take(1))
        .subscribe(() => {
          this.reset();
        });
    }
  }

  onListExpanded(event) {
    this.listExpanded = event;
  }

  async upload(): Promise<any> {
    let transfers: UploadState = await this.uploadManagerService.getRxValue(this.fileManagerService.transfers.getValue());
    this.uploadService
      .sendTree({
        transfers: transfers.transfers,
        ...this.uploadManagerService.envelopeInfos.getValue().type === 'mail' ? { emails: this.uploadManagerService.envelopeInfos.getValue().to } : {},
        message: this.uploadManagerService.envelopeInfos.getValue().message,
        senderMail: this.uploadManagerService.envelopeInfos.getValue().from,
        ...this.uploadManagerService.envelopeInfos.getValue().parameters?.password ? { password: this.uploadManagerService.envelopeInfos.getValue().parameters.password } : { password: '' },
        ...this.uploadManagerService.envelopeInfos.getValue().parameters?.expiryDays ? { expiryDays: this.uploadManagerService.envelopeInfos.getValue().parameters.expiryDays } : { expiryDays: 30 },
        ...this.uploadManagerService.envelopeInfos.getValue().type === 'link' ? { publicLink: true } : { publicLink: false },
        ...this.uploadManagerService.uploadInfos.getValue()?.senderId ? { senderId: this.uploadManagerService.uploadInfos.getValue().senderId } : {},
        ...this.uploadManagerService.uploadInfos.getValue()?.senderToken ? { senderToken: this.uploadManagerService.uploadInfos.getValue().senderToken } : {}
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: any) => {
        if (result && result?.canUpload == true) {
          this.uploadManagerService.uploadInfos.next(result);
          this.uploadValidated = true;
          this.availabilityDate = result.expireDate;
          this.beginUpload(result);
        } else {
          if (this.uploadManagerService.uploadInfos.getValue()) {
            if (this.uploadManagerService.uploadInfos.getValue().senderId && this.uploadManagerService.uploadInfos.getValue().senderToken) {
              this.validateCode();
            }
          }
        }
      });
  }

  async validateCode(code?: string): Promise<any> {
    let transfers: UploadState = await this.uploadManagerService.getRxValue(this.fileManagerService.transfers.getValue());
    this.uploadService
      .validateCode({
        ...code ? { code: code } : {},
        transfers: transfers.transfers,
        ...this.uploadManagerService.envelopeInfos.getValue().type === 'mail' ? { emails: this.uploadManagerService.envelopeInfos.getValue().to } : {},
        message: this.uploadManagerService.envelopeInfos.getValue().message,
        senderMail: this.uploadManagerService.envelopeInfos.getValue().from,
        password: this.uploadManagerService.envelopeInfos.getValue().parameters.password,
        expiryDays: this.uploadManagerService.envelopeInfos.getValue().parameters.expiryDays,
        ...this.uploadManagerService.envelopeInfos.getValue().type === 'link' ? { publicLink: true } : { publicLink: false }
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: any) => {
        this.uploadManagerService.uploadInfos.next(result);
        this.uploadValidated = true;
        this.availabilityDate = result.expireDate;
        this.beginUpload(result);
      });
  }

  beginUpload(result) {
    this.flow.flowJs.opts.query = { enclosureId: result.enclosureId };
    this.flow.upload();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.responsiveSubscription.unsubscribe();
    this.uploadManagerSubscription.unsubscribe();
    this.fileManagerSubscription.unsubscribe();
  }
}
