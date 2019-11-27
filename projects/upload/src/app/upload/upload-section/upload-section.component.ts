import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  TemplateRef
} from "@angular/core";

import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { FLOW_EVENTS, MSG_ERR, getRxValue, REGEX_EXP } from "@ft-core";
import { FlowDirective, Transfer, UploadState } from "@flowjs/ngx-flow";
import { Subscription } from "rxjs";

@Component({
  selector: "app-upload-section",
  templateUrl: "./upload-section.component.html"
})
export class UploadSectionComponent implements AfterViewInit, OnDestroy {
  @ViewChild("uploadForm", { static: false }) uploadForm: TemplateRef<any>;
  @ViewChild("uploadLoading", { static: false }) uploadLoading: TemplateRef<
    any
  >;
  @ViewChild("flow", { static: false })
  flow: FlowDirective;
  perfectScrollbarConfig: PerfectScrollbarConfigInterface;
  dragging: boolean;
  autoUploadSubscription: Subscription;
  emails: Array<string>;
  withPassword: boolean;
  showPassword1: boolean;
  showPassword2: boolean;
  password1: string;
  password2: string;
  acceptConditions: boolean;
  message: string;
  openedButton: boolean;
  flowDirectoryOnlyDrop: boolean;
  templateRf: TemplateRef<any>;
  senderMail: string;
  errorsMessages: string;
  currentTrasfers: Array<Transfer>;
  constructor(private cd: ChangeDetectorRef) {
    this.perfectScrollbarConfig = {};
    this.dragging = false;
    this.emails = [];
    this.withPassword = false;
    this.showPassword1 = false;
    this.showPassword2 = false;
    this.openedButton = false;
    this.password1 = "";
    this.password2 = "";
    this.acceptConditions = false;
    this.flowDirectoryOnlyDrop = false;
    this.message = "";
    this.senderMail = "";
    this.errorsMessages = "";
    this.currentTrasfers = [];
  }

  /**
   * Subscribe to the flow event flux
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.templateRf = this.uploadForm;
    this.cd.detectChanges();
    this.autoUploadSubscription = this.flow.events$.subscribe(event => {
      if (event.type === FLOW_EVENTS.FILESSUBMITTED) {
        this.openedButton = false;
        this.errorsMessages = "";
        this.cd.detectChanges();
      }
    });
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
    this.errorsMessages = "";
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
    this.errorsManager("", 1);
  }

  /**
   * Flow upload fuc
   * @returns {void}
   */
  upload(): void {
    this.templateRf = this.uploadLoading;
    this.flow.upload();
  }

  /**
   * Check Valid form (valid) : false ; (invalid) : true
   * @param {Array<Transfer>} transfers
   * @returns {boolean}
   */
  checkForm(transfers: Array<Transfer>): boolean {
    return (
      !transfers.length ||
      !this.emails.length ||
      !REGEX_EXP.EMAIL.test(this.senderMail) ||
      (!REGEX_EXP.GOUV_EMAIL.test(this.senderMail) &&
        this.emails.findIndex(
          (email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)
        ) !== -1) ||
      !(
        (this.withPassword &&
          this.password1 === this.password2 &&
          this.password1.length > 0) ||
        !this.withPassword
      ) ||
      !this.acceptConditions
    );
  }

  /**
   * Mange errors messages.
   * @returns {Promise<any>}
   */
  async errorsManager(event: string, level: number): Promise<any> {
    let transfers: UploadState = await getRxValue(this.flow.transfers$);
    this.openedButton = false;
    this.errorsMessages = "";
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
        } else if (!REGEX_EXP.EMAIL.test(event)) {
          this.errorsMessages = MSG_ERR.MSG_ERR_04;
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
          this.emails.findIndex(
            (email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)
          ) !== -1
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
        }
        break;
      }

      case 5 /** Select (with Paswword)*/: {
        this.password1 = "";
        this.password2 = "";
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
          this.emails.findIndex(
            (email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)
          ) !== -1
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
          this.emails.findIndex(
            (email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)
          ) !== -1
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
        } else if (
          !this.password1.length ||
          (this.password1 !== this.password2 && this.password2.length > 0)
        ) {
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
          this.emails.findIndex(
            (email: string) => !REGEX_EXP.GOUV_EMAIL.test(email)
          ) !== -1
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_02;
        } else if (
          !this.password2.length ||
          this.password1 !== this.password2
        ) {
          this.errorsMessages = MSG_ERR.MSG_ERR_01;
        }
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.autoUploadSubscription.unsubscribe();
  }
}
