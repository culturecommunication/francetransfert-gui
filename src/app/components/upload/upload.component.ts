import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FlowDirective, UploadState } from '@flowjs/ngx-flow';
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs/internal/Subscription';
import { take, takeUntil } from 'rxjs/operators';
import { DownloadManagerService, FileManagerService, ResponsiveService, UploadManagerService, UploadService } from 'src/app/services';
import { FLOW_CONFIG } from 'src/app/shared/config/flow-config';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SatisfactionMessageComponent } from "../satisfaction-message/satisfaction-message.component";
import { Router } from "@angular/router";
import { LoginService } from 'src/app/services/login/login.service';

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
  uploadFailed: boolean = false;
  publicLink: boolean = false;
  uploadManagerSubscription: Subscription = new Subscription;
  responsiveSubscription: Subscription = new Subscription;
  fileManagerSubscription: Subscription = new Subscription;
  transfertSubscription: Subscription = new Subscription;
  senderEmail: string;
  availabilityDate: Date;
  availabilityDays: number;
  @ViewChild('upload') private uploadFragment: ElementRef;
  @ViewChild('flow')
  flow: FlowDirective;
  flowConfig: any;
  hasFiles: boolean = false;
  listExpanded: boolean = false;
  enclosureId: string = '';
  canReset: boolean = false;
  showCode: boolean = false;



  constructor(private responsiveService: ResponsiveService,
    private uploadManagerService: UploadManagerService,
    private downloadManagerService: DownloadManagerService,
    private fileManagerService: FileManagerService,
    private uploadService: UploadService,
    private loginService: LoginService,
    private titleService: Title,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('France transfert - Téléversement');
    this.onResize();
    this.flowConfig = FLOW_CONFIG;
    this.responsiveService.checkWidth();
    this.uploadManagerSubscription = this.uploadManagerService.envelopeInfos.subscribe(_envelopeInfos => {
      if (_envelopeInfos && _envelopeInfos.from) {
        this.senderEmail = _envelopeInfos.from.toLowerCase();
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

  ngAfterViewInit() {
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment) {
      this.scrollTo(tree.fragment);
    }

  }

  scrollTo(_anchor: string) {
    switch (_anchor) {
      case 'upload':
        this.uploadFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
    }
  }


  reset() {
    if (this.transfertSubscription) {
      this.transfertSubscription.unsubscribe();
    }
    this.enclosureId = '';
    this.uploadStarted = false;
    this.uploadFinished = false;
    this.uploadValidated = false;
    this.showCode = false;
    this.uploadFailed = false;
    this.publicLink = false;
    this.uploadManagerService.uploadInfos.next(null);
    this.uploadManagerService.uploadError$.next(null);
    this.downloadManagerService.downloadError$.next(null);
    //Reset token
    if (!this.canReset) {
      this.uploadManagerService.envelopeInfos.next(null);
      if (this.flow) {
        this.fileManagerService.hasFiles.next(false);
        this.flow.cancel();
      }
    } else {
      this.flow.transfers$.pipe(take(1)).subscribe(transfer => {
        transfer.transfers.forEach(t => {
          t.flowFile.bootstrap();
        });
      });
    }
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

  onTransferFailed(event) {
    this.uploadFailed = true;
    this.uploadFinished = true;
    this.canReset = true;
  }

  onTransferCancelled(event) {
    this.uploadStarted = !event;
    this.uploadValidated = !event;
  }

  onTransferFinished(event) {
    this.uploadFinished = event;
    this.canReset = !event;
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
      this.uploadService.rate({ plis: this.enclosureId, mail: this.uploadManagerService.envelopeInfos.getValue().from, message: event.message, satisfaction: event.satisfaction }).pipe(take(1))
        .subscribe((result: any) => {
          if (result) {
            this.openSnackBar(4000);
          }
          this.reset();
        });
    }
  }

  openSnackBar(duration: number) {
    this._snackBar.openFromComponent(SatisfactionMessageComponent, {
      panelClass: 'panel-success',
      duration: duration
    });
  }

  onListExpanded(event) {
    this.listExpanded = event;
  }

  ispublicLink(val: any) {
    if (val === 'link')
      this.publicLink = true;
  }

  async upload(): Promise<any> {
    let transfers: UploadState = await this.uploadManagerService.getRxValue(this.fileManagerService.transfers.getValue());
    this.uploadService
      .sendTree({
        transfers: transfers.transfers,
        ...this.uploadManagerService.envelopeInfos.getValue().type === 'mail' ? { emails: this.uploadManagerService.envelopeInfos.getValue().to } : {},
        message: this.uploadManagerService.envelopeInfos.getValue().message,
        subject: this.uploadManagerService.envelopeInfos.getValue().subject,
        senderMail: this.uploadManagerService.envelopeInfos.getValue().from.toLowerCase(),
        ...this.uploadManagerService.envelopeInfos.getValue().parameters?.password ? { password: this.uploadManagerService.envelopeInfos.getValue().parameters.password } : { password: '' },
        ...this.uploadManagerService.envelopeInfos.getValue().parameters?.expiryDays ? { expiryDays: this.uploadManagerService.envelopeInfos.getValue().parameters.expiryDays } : { expiryDays: 30 },
        ...this.uploadManagerService.envelopeInfos.getValue().type === 'link' ? { publicLink: true } : { publicLink: false },
        ...this.loginService.tokenInfo.getValue()?.senderToken ? { senderToken: this.loginService.tokenInfo.getValue()?.senderToken } : {}
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: any) => {
        if (result && result?.canUpload == true) {
          this.uploadManagerService.uploadInfos.next(result);
          this.uploadValidated = true;
          this.showCode = false;
          this.availabilityDate = result.expireDate;
          this.ispublicLink(this.uploadManagerService.envelopeInfos.getValue().type);
          this.beginUpload(result);
        } else {
          this.showCode = true;
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
        subject: this.uploadManagerService.envelopeInfos.getValue().subject,
        senderMail: this.uploadManagerService.envelopeInfos.getValue().from.toLowerCase(),
        ...this.uploadManagerService.envelopeInfos.getValue().parameters?.password ? { password: this.uploadManagerService.envelopeInfos.getValue().parameters.password } : { password: '' },
        ...this.uploadManagerService.envelopeInfos.getValue().parameters?.expiryDays ? { expiryDays: this.uploadManagerService.envelopeInfos.getValue().parameters.expiryDays } : { expiryDays: 30 },
        ...this.uploadManagerService.envelopeInfos.getValue().type === 'link' ? { publicLink: true } : { publicLink: false }
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: any) => {
        this.uploadManagerService.uploadInfos.next(result);
        this.uploadValidated = true;
        this.availabilityDate = result.expireDate;
        this.ispublicLink(this.uploadManagerService.envelopeInfos.getValue().type);
        this.beginUpload(result);
      });
  }

  beginUpload(result) {
    let token = '';
    if (this.transfertSubscription) {
      this.transfertSubscription.unsubscribe();
    }
    if (this.loginService.isLoggedIn()) {
      token = this.loginService.tokenInfo.getValue()?.senderToken
    } else {
      token = this.uploadManagerService.uploadInfos.getValue().senderToken;
    }

    this.enclosureId = result.enclosureId;
    this.flow.flowJs.opts.query = {
      enclosureId: result.enclosureId,
      senderId: this.uploadManagerService.envelopeInfos.getValue().from.toLowerCase(),
      senderToken: token,
    };

    this.transfertSubscription = this.flow.transfers$.subscribe((uploadState: UploadState) => {
      this.fileManagerService.uploadProgress.next(uploadState);
    });
    this.flow.upload();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.responsiveSubscription.unsubscribe();
    this.uploadManagerSubscription.unsubscribe();
    this.fileManagerSubscription.unsubscribe();
    this.transfertSubscription.unsubscribe();
  }
}
