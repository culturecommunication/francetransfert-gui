import { Component, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef, TemplateRef } from '@angular/core';

import { UploadService } from '../services/upload.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FLOW_EVENTS, MSG_ERR, getRxValue, REGEX_EXP, BAD_EXTENSIONS, FLOW_LIMIT } from '@ft-core';
import { FlowDirective, Transfer, UploadState } from '@flowjs/ngx-flow';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FLOW_CONFIG } from '../config/flow-config';

@Component({
  selector: 'app-upload-section',
  templateUrl: './upload-section.component.html'
})
export class UploadSectionComponent implements AfterViewInit, OnDestroy {
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
  withPassword: boolean;
  showPassword1: boolean;
  showPassword2: boolean;
  password1: string;
  password2: string;
  acceptConditions: boolean;
  message: string;
  openedButton: boolean;
  templateRf: TemplateRef<any>;
  senderMail: string;
  errorsMessages: string;
  haveChoice: boolean;
  uploadError: boolean;
  localConfig: any;
  constructor(private cd: ChangeDetectorRef, private uploadService: UploadService) {
    this.perfectScrollbarConfig = {};
    this.dragging = false;
    this.acceptConditions = false;
    this.haveChoice = false;
    this.initUpload();
  }

  /**
   * Init Upload form
   * @returns {Promise<any>}
   */
  async initUpload(): Promise<any> {
    this.emails = [];
    this.withPassword = false;
    this.showPassword1 = false;
    this.showPassword2 = false;
    this.openedButton = false;
    this.password1 = '';
    this.password2 = '';
    this.acceptConditions = false;
    this.message = '';
    this.senderMail = '';
    this.errorsMessages = '';
    this.uploadError = false;
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
      if (uploadState.totalProgress === 1 && !this.uploadError && this.templateRf === this.uploadLoading) {
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
      if (transfer.error) {
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
    let transfers: UploadState = await getRxValue(this.flow.transfers$);
    this.uploadService
      .sendTree({
        transfers: transfers.transfers,
        emails: this.emails,
        password: this.password1,
        message: this.message,
        senderMail: this.senderMail
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: any) => {
        if (result.senderId) {
          this.uploadBegin(result);
        } else {
          result.componentInstance.action.pipe(takeUntil(this.onDestroy$)).subscribe(code => {
            this.uploadService
              .validateCode({
                code: code,
                transfers: transfers.transfers,
                emails: this.emails,
                password: this.password1,
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
      !REGEX_EXP.EMAIL.test(this.senderMail) ||
      (!REGEX_EXP.GOUV_EMAIL.test(this.senderMail) &&
        this.emails.findIndex((email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)) !== -1) ||
      !((this.withPassword && this.password1 === this.password2 && this.password1.length > 0) || !this.withPassword) ||
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
      !REGEX_EXP.EMAIL.test(this.senderMail) ||
      (!REGEX_EXP.GOUV_EMAIL.test(this.senderMail) &&
        this.emails.findIndex((email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)) !== -1) ||
      !((this.withPassword && this.password1 === this.password2 && this.password1.length > 0) || !this.withPassword) ||
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
        } else if (event.length > 0 && !REGEX_EXP.EMAIL.test(event)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        } else if (
          this.senderMail.length &&
          !REGEX_EXP.GOUV_EMAIL.test(this.senderMail) &&
          this.emails.findIndex((email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)) !== -1
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
        } else if (!REGEX_EXP.EMAIL.test(this.senderMail)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        } else if (
          !REGEX_EXP.GOUV_EMAIL.test(this.senderMail) &&
          this.emails.findIndex((email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)) !== -1
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
        }
        break;
      }

      case 5 /** Select (with Paswword)*/: {
        this.password1 = '';
        this.password2 = '';
        if (!transfers.transfers.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_03;
        } else if (!this.emails.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_06;
        } else if (!this.senderMail.length) {
          this.errorsMessages = MSG_ERR.MSG_ERR_07;
        } else if (!REGEX_EXP.EMAIL.test(this.senderMail)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        } else if (
          !REGEX_EXP.GOUV_EMAIL.test(this.senderMail) &&
          this.emails.findIndex((email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)) !== -1
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
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
        } else if (!REGEX_EXP.EMAIL.test(this.senderMail)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        } else if (
          !REGEX_EXP.GOUV_EMAIL.test(this.senderMail) &&
          this.emails.findIndex((email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)) !== -1
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
        } else if (!this.password1.length || (this.password1 !== this.password2 && this.password2.length > 0)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_01;
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
        } else if (!REGEX_EXP.EMAIL.test(this.senderMail)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
        } else if (
          !REGEX_EXP.GOUV_EMAIL.test(this.senderMail) &&
          this.emails.findIndex((email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)) !== -1
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
        } else if (!this.password2.length || this.password1 !== this.password2) {
          this.errorsMessages = MSG_ERR.MSG_ERR_01;
        }
        break;
      }
    }
  }

  /**
   * Check limit errors.
   * @returns {any>}
   */
  checkLimit(transfers): boolean {
    const somme = (accumulator, currentValue) => accumulator + currentValue.size;
    const totalSize = transfers.reduce(somme, 0);
    if (FLOW_LIMIT < totalSize) {
      this.errorsMessages = MSG_ERR.MSG_ERR_00;
      return false;
    }
    return true;
  }

  /**
   * Bloc bad extensions.
   * @param {event} any
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

  openBlank(url: string): void {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
