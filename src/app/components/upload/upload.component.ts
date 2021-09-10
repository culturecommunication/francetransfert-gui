import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlowDirective, UploadState } from '@flowjs/ngx-flow';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { take, takeUntil } from 'rxjs/operators';
import { FileManagerService, ResponsiveService, UploadManagerService, UploadService } from 'src/app/services';
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
    private fileManagerService: FileManagerService,
    private uploadService: UploadService) { }

  ngOnInit(): void {
    this.onResize();
    this.flowConfig = FLOW_CONFIG;
    this.responsiveService.checkWidth();
    this.uploadManagerSubscription = this.uploadManagerService.envelopeInfos.subscribe(_envelopeInfos => {
      if (_envelopeInfos && _envelopeInfos.from) {
        this.senderEmail = _envelopeInfos.from;
        this.availabilityDays = _envelopeInfos.parameters.expiryDays
      }
    });
    this.fileManagerSubscription = this.fileManagerService.hasFiles.subscribe(_hasFiles => {
      this.hasFiles = _hasFiles;
    });
  }

  ngAfterViewInit() {
    // console.log(this.flow);
  }

  onResize() {
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.screenWidth = this.responsiveService.screenWidth;
    });
  }

  styleObject(): Object {
    if (this.screenWidth === 'lg') {
      return { 'flex-direction': 'row' }
    }
    if (this.screenWidth === 'md') {
      if (!this.uploadFinished && !this.uploadStarted){
        return { 'flex-direction': 'column-reverse' }
      } else {
        return { 'flex-direction': 'row' }
      }
    }
    if (this.screenWidth === 'sm') {
      if (this.uploadFinished && this.uploadStarted){
        return { 'flex-direction': 'column' }
      } else {
        return { 'flex-direction': 'column-reverse' }
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

  onSatisfactionCheckDone(event) {
    if (event) {
      this.uploadService.rate({ mail: this.uploadManagerService.envelopeInfos.getValue().from, message: event.message, satisfaction: event.satisfaction }).pipe(take(1))
        .subscribe(() => {

        });
      window.location.reload();
    }
  }

  onListExpanded(event) {
    this.listExpanded = event;
  }

  async upload(): Promise<any> {
    let transfers: UploadState = await this.uploadManagerService.getRxValue(this.fileManagerService.transfers.getValue());
    console.log(transfers);
    console.log(this.uploadManagerService.envelopeInfos.getValue());
    this.uploadService
      .sendTree({
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
      });
  }

  async validateCode(code: string): Promise<any> {
    let transfers: UploadState = await this.uploadManagerService.getRxValue(this.fileManagerService.transfers.getValue());
    this.uploadService
      .validateCode({
        code: code,
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
