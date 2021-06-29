import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  TemplateRef,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import { UploadService } from '../services/upload.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FLOW_EVENTS, MSG_ERR, getRxValue, BAD_EXTENSIONS, FLOW_LIMIT } from '@ft-core';
import { FlowDirective, Transfer, UploadState } from '@flowjs/ngx-flow';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FLOW_CONFIG } from '../config/flow-config';
import { environment as env } from '../../../environments/environment';
import { DataService } from 'projects/core/src/lib/services/data/data.service';
import { ResponsiveService } from 'projects/core/src/lib/services/responsive/responsive.service';

@Component({
  selector: 'app-upload-section',
  templateUrl: './upload-section.component.html'
})
export class UploadSectionComponent implements AfterViewInit, OnDestroy, OnInit {
  private onDestroy$: Subject<void> = new Subject();

  @ViewChild('uploadForm', { static: false }) uploadForm: TemplateRef<any>;
  @ViewChild('uploadLoading', { static: false }) uploadLoading: TemplateRef<any>;
  @ViewChild('uploadChoice', { static: false }) uploadChoice: TemplateRef<any>;
  @ViewChild('uploadContent', { static: false }) uploadContent: TemplateRef<any>;
  @ViewChild('flow', { static: false })
  flow: FlowDirective;
  perfectScrollbarConfig: PerfectScrollbarConfigInterface;
  dragging: boolean;
  emails: Array<string>;
  acceptConditions: boolean;
  message: string;
  openedButton: boolean;
  templateRf: TemplateRef<any>;
  senderMail: string;
  expireDate: string;
  errorsMessages: string;
  haveChoice: boolean;
  uploadError: boolean;
  localConfig: any;
  regex: any;
  loadApi: boolean;
  showPopupMsg: boolean;
  showPopupList: boolean;
  flagFiles: boolean;
  sumFileSizes: number;
  showPopupMsgSubscription: Subscription;
  showPopupListSubscription: Subscription;
  flagFilesSubscription: Subscription;
  messageSubscription: Subscription;
  flowSubscription: Subscription;
  isMobile: boolean;
  responsiveSubscription: Subscription;
  constructor(
    private cd: ChangeDetectorRef,
    private uploadService: UploadService,
    private data: DataService,
    private responsiveService: ResponsiveService
  ) {
    this.perfectScrollbarConfig = {};
    this.dragging = false;
    this.acceptConditions = false;
    this.haveChoice = false;
    this.regex = env.regex
      ? env.regex
      : {
          EMAIL: '',
          GOUV_EMAIL: ''
        };
    this.initUpload();
  }

  ngOnInit() {
    this.messageSubscription = this.data.messageSource.subscribe(message => (this.message = message));
    this.flowSubscription = this.data.flow.subscribe(flow => (this.flow = flow));
    this.showPopupMsgSubscription = this.data.hiddenPopup.subscribe(
      hiddenPopup => (this.showPopupMsg = hiddenPopup ? true : false)
    );
    this.showPopupListSubscription = this.data.hiddenPopup.subscribe(
      hiddenPopup => (this.showPopupList = hiddenPopup ? true : false)
    );
    this.flagFilesSubscription = this.data.flagFiles.subscribe(flagFile => (this.flagFiles = flagFile));
    this.onResize();
    this.responsiveService.checkWidth();
  }
  newMessage() {
    this.data.changeMessage(this.message);
  }

  setFiles() {
    this.flagFiles = true;
    this.data.setFlagFiles(this.flagFiles);
    this.data.setFlow(this.flow);
  }

  setEmails() {
    this.flagFiles = false;
    this.data.setFlagFiles(this.flagFiles);
    this.data.setEmail(this.emails);
  }

  /**
   * Init Upload form
   * @returns {Promise<any>}
   */
  async initUpload(): Promise<any> {
    this.emails = [];
    this.acceptConditions = false;
    this.showPopupMsg = true;
    this.showPopupList = true;
    this.flagFiles = false;
    this.message = '';
    this.senderMail = '';
    this.errorsMessages = '';
    this.uploadError = false;
    this.loadApi = false;
    if (this.flow) {
      let uploadState: UploadState = await getRxValue(this.flow.transfers$);
      for (let transfer of uploadState.transfers) {
        this.flow.cancelFile(transfer);
      }
    }
  }

  /**
   * Subscribe to the flow event flux
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.localConfig = FLOW_CONFIG;
    this.selectLayout('uploadForm');
    this.cd.detectChanges();
    this.flow.events$.pipe(takeUntil(this.onDestroy$)).subscribe(event => {
      if (event.type === FLOW_EVENTS.FILESSUBMITTED) {
        this.checkValidExtensions(event);
        this.openedButton = false;
        this.errorsMessages = '';
        this.cd.detectChanges();
      }
    });
    this.flow.transfers$.pipe(takeUntil(this.onDestroy$)).subscribe((uploadState: UploadState) => {
      this.uploadError = this.haveChunkError(uploadState);
      if (
        uploadState.totalProgress === 1 &&
        !this.uploadError &&
        !this.getSucces(uploadState) &&
        this.templateRf === this.uploadLoading
      ) {
        this.selectLayout('uploadChoice');
        this.uploadError = false;
      }
    });
  }

  /**
   * Check chunk error
   * @param {UploadState} uploadState
   * @returns {boolean}
   */
  haveChunkError(uploadState: UploadState): boolean {
    for (let transfer of uploadState.transfers) {
      if (transfer.error && !transfer.success) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check succes
   * @param {UploadState} uploadState
   * @returns {boolean}
   */
  getSucces(uploadState: UploadState): boolean {
    for (let transfer of uploadState.transfers) {
      if (!transfer.success) {
        return true;
      }
    }
    return false;
  }

  /**
   * Return from error.
   * @returns {void}
   */
  retournFromError(): void {
    this.selectLayout('uploadForm');
    this.uploadError = false;
  }
  /**
   * Add new email
   * @param {string} newEmail
   * @returns {void}
   */
  addEmail(newEmail: string): void {
    this.emails.push(newEmail);
  }

  /**
   * Delete an email
   * @param {string} deletedEmail
   * @returns {void}
   */
  deleteEmail(deletedEmail: string): void {
    this.emails.splice(this.emails.indexOf(deletedEmail), 1);
    this.errorsMessages = '';
  }

  /**
   * Returns transfer Id
   * @param {Transfer} transfer
   * @returns {string}
   */
  trackTransfer(transfer: Transfer): string {
    return transfer.id;
  }

  /**
   * OnDragOver hook
   * @returns {void}
   */
  onDragOver(): void {
    this.dragging = true;
  }

  /**
   * On drop hook
   * @returns {void}
   */
  onDrop(): void {
    this.dragging = false;
  }

  /**
   * Delete transfer
   * @param {Transfer} transfer
   * @returns {void}
   */
  deleteTransfer(transfer: Transfer): void {
    this.flow.cancelFile(transfer);
    this.errorsManager('', 1);
  }

  /**
   * Edit have choice
   * @param {boolean} value
   * @returns {void}
   */
  setHaveChoice(value: boolean): void {
    if (value) {
      this.haveChoice = true;
    }
  }

  /**
   * Flow upload fuc
   * @returns {void}
   */
  async upload(): Promise<any> {
    /** Call to API */
    this.loadApi = true;
    let transfers: UploadState = await getRxValue(this.flow.transfers$);
    this.uploadService
      .sendTree({
        transfers: transfers.transfers,
        emails: this.emails,
        message: this.message,
        senderMail: this.senderMail
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: any) => {
        this.loadApi = false;
        this.expireDate = result.expireDate;
        if (result.canUpload == false) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
        } else if (result.senderId) {
          this.uploadBegin(result);
        } else {
          result.componentInstance.action.pipe(takeUntil(this.onDestroy$)).subscribe(code => {
            this.uploadService
              .validateCode({
                code: code,
                transfers: transfers.transfers,
                emails: this.emails,
                message: this.message,
                senderMail: this.senderMail
              })
              .pipe(takeUntil(this.onDestroy$))
              .subscribe(
                rs => {
                  result.close();
                  this.uploadBegin(rs);
                },
                () => {
                  result.componentInstance.haveError = true;
                }
              );
          });
        }
      });
  }

  uploadBegin(result) {
    this.selectLayout('uploadLoading');
    this.flow.flowJs.opts.query = { enclosureId: result.enclosureId };
    this.flow.upload();
  }

  /**
   * Select Layout.
   * @param {string} Layout
   * @returns {void}
   */
  selectLayout(Layout: string): void {
    window.scrollTo(0, 0);
    this.templateRf = this[Layout];
    if (Layout === 'uploadForm') {
      this.haveChoice = false;
      this.initUpload();
    }
  }

  /**
   * Check Valid form (valid) : false ; (invalid) : true
   * @param {Array<Transfer>} transfers
   * @returns {boolean}
   */
  checkForm(transfers: Array<Transfer>): boolean {
    return (
      !transfers.length ||
      !this.checkLimit(transfers) ||
      !this.emails.length ||
      !this.regex.EMAIL.test(this.senderMail) ||
      !this.acceptConditions
    );
  }

  /**
   * Check Valid form (without acceptation)(valid) : false ; (invalid) : true
   * @param {Array<Transfer>} transfers
   * @returns {boolean}
   */
  checkAcceptation(transfers: Array<Transfer>): boolean {
    return (
      !transfers.length ||
      !this.checkLimit(transfers) ||
      !this.emails.length ||
      !this.regex.EMAIL.test(this.senderMail) ||
      this.acceptConditions
    );
  }

  /**
   * Mange emails errors.
   * @param {string} error
   * @returns {void}
   */
  emailsErrors(error: string): void {
    this.errorsMessages = error;
  }

  /**
   * Mange errors messages.
   * @param {string} event
   * @param {number} level
   * @returns {Promise<any>}
   */
  async errorsManager(event: string, level: number): Promise<any> {
    let transfers: UploadState = await getRxValue(this.flow.transfers$);
    this.openedButton = false;
    this.errorsMessages = '';
    switch (level) {
      case 1 /** Change email group */: {
        if (!transfers.transfers.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_03;
        }
        break;
      }
      case 2 /** Add email sender */: {
        if (!transfers.transfers.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_03;
        } else if (event.length > 0 && !this.regex.EMAIL.test(event)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        } else if (
          this.senderMail.length &&
          !this.regex.GOUV_EMAIL.test(this.senderMail) &&
          this.emails.findIndex((email: string) => !this.regex.GOUV_EMAIL.test(email)) !== -1
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
        }
        break;
      }
      case 3 /** Change email sender */: {
        if (!transfers.transfers.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_03;
        } else if (!this.emails.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_06;
        }
        break;
      }
      case 4 /** Add email sender */: {
        if (!transfers.transfers.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_03;
        } else if (!this.emails.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_06;
        } else if (!this.senderMail.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_07;
        }
        break;
      }

      case 5 /** Select (with Paswword)*/: {
        if (!transfers.transfers.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_03;
        } else if (!this.emails.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_06;
        } else if (!this.senderMail.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_07;
        } else if (!this.regex.EMAIL.test(this.senderMail)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        }
        break;
      }

      case 6 /** Add First Password*/: {
        if (!transfers.transfers.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_03;
        } else if (!this.emails.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_06;
        } else if (!this.senderMail.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_07;
        } else if (!this.regex.EMAIL.test(this.senderMail)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        }
        break;
      }

      case 7 /** Add Second Password*/: {
        if (!transfers.transfers.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_03;
        } else if (!this.emails.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_06;
        } else if (!this.senderMail.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_07;
        } else if (!this.regex.EMAIL.test(this.senderMail)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        }
        break;
      }
    }
    //this.hideErrorMessage(50000);
  }

  /**
   * Check limit errors.
   * @returns {any>}
   */
  checkLimit(transfers): boolean {
    const somme = (accumulator, currentValue) => accumulator + currentValue.size;
    const totalSize = transfers.reduce(somme, 0);
    this.sumFileSizes = Number(totalSize);
    if (FLOW_LIMIT < totalSize) {
      this.errorsMessages = MSG_ERR.MSG_ERR_00;
      return false;
    }
    return true;
  }

  hideErrorMessage(timout) {
    setTimeout(() => {
      if (this.errorsMessages.length) {
        this.errorsMessages = '';
      }
    }, timout);
  }

  /**
   * Bloc bad extensions.
   * @param {any} event
   * @returns {Promise<any>}
   */
  async checkValidExtensions(event): Promise<any> {
    let transfers: UploadState = await getRxValue(this.flow.transfers$);
    let BadFiles: any[] = [];
    for (let file of event.event[0]) {
      const extension = `.${file.name.split('.')[file.name.split('.').length - 1]}`;
      if (BAD_EXTENSIONS.findIndex((ext: string) => ext.toLocaleUpperCase() === extension.toLocaleUpperCase()) !== -1) {
        BadFiles.push(file);
      }
    }
    if (BadFiles.length) {
      this.errorsMessages = MSG_ERR.MSG_ERR_08;
      for (let file of BadFiles) {
        this.flow.cancelFile(
          transfers.transfers[transfers.transfers.findIndex((transfer: Transfer) => transfer.name === file.name)]
        );
      }
    }
  }

  /**
   * Open blank Urls
   * @param {string} url
   * @returns {void}
   */
  openBlank(url: string): void {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.messageSubscription.unsubscribe();
    this.flowSubscription.unsubscribe();
    this.showPopupMsgSubscription.unsubscribe();
    this.showPopupListSubscription.unsubscribe();
    this.flagFilesSubscription.unsubscribe();
    this.responsiveSubscription.unsubscribe();
  }

  onResize() {
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
    });
  }
}
