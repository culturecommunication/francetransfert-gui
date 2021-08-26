import { Component, OnDestroy, OnInit } from '@angular/core';
import { UploadState } from '@flowjs/ngx-flow';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { take, takeUntil } from 'rxjs/operators';
import { FileManagerService, ResponsiveService, UploadManagerService, UploadService } from 'src/app/services';

@Component({
  selector: 'ft-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject();
  isMobile: boolean = false;
  screenWidth: string;
  uploadStarted: boolean = false;
  uploadFinished: boolean = false;
  uploadValidated: boolean = false;
  uploadManagerSubscription: Subscription;
  responsiveSubscription: Subscription = new Subscription;
  senderEmail: string;

  constructor(private responsiveService: ResponsiveService,
              private uploadManagerService: UploadManagerService,
              private fileManagerService: FileManagerService,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.onResize();
    this.responsiveService.checkWidth();
    this.uploadManagerSubscription = this.uploadManagerService.envelopeInfos.subscribe(_envelopeInfos => {
      console.log(_envelopeInfos);
      if (_envelopeInfos && _envelopeInfos.from) {
        this.senderEmail = _envelopeInfos.from;
      }
    });
  }  

  onResize() {
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.screenWidth = this.responsiveService.screenWidth;
    });
  }

  onUploadStarted(event) {
    this.uploadStarted = event;
    this.upload();
  }

  onTransferCancelled(event) {
    this.uploadStarted = !event;
  }

  onTransferFinished(event) {
    this.uploadFinished = event;
  }

  onTransferValidated(event) {
    this.uploadValidated = event;
  }

  onSatisfactionCheckDone(event) {
    if (event) {
      this.uploadService.rate({ mail: this.uploadManagerService.envelopeInfos.getValue().from, message: event.message, satisfaction: event.satisfaction }).pipe(take(1))
      .subscribe(() => {
        
      });
      this.uploadStarted = false;
      this.uploadValidated = false;
      this.uploadFinished = false;
    }
    this.uploadManagerService.envelopeInfos.next(null);
  }

  async upload(): Promise<any> {
    let transfers: UploadState = await this.uploadManagerService.getRxValue(this.fileManagerService.transfers.getValue());
    console.log(transfers);
    console.log(this.uploadManagerService.envelopeInfos.getValue());
    this.uploadService
      .sendTree({
        transfers: transfers.transfers,
        emails: this.uploadManagerService.envelopeInfos.getValue().to,
        message: this.uploadManagerService.envelopeInfos.getValue().message,
        senderMail: this.uploadManagerService.envelopeInfos.getValue().from
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: any) => {
        if (result.senderId) {
          console.log(`this.uploadBegin(${result})`);
        } else {
          result.componentInstance.action.pipe(takeUntil(this.onDestroy$)).subscribe(code => {
            this.uploadService
              .validateCode({
                code: code,
                transfers: transfers.transfers,
                emails: this.uploadManagerService.envelopeInfos.getValue().to,
                message: this.uploadManagerService.envelopeInfos.getValue().message,
                senderMail: this.uploadManagerService.envelopeInfos.getValue().from
              })
              .pipe(takeUntil(this.onDestroy$))
              .subscribe(
                rs => {
                  result.close();
                  console.log(`this.uploadBegin(${result})`);
                },
                () => {
                  result.componentInstance.haveError = true;
                }
              );
          });
        }
      });
  }

  ngOnDestroy() {
    this.responsiveSubscription.unsubscribe();
    this.uploadManagerSubscription.unsubscribe();
  }
}
