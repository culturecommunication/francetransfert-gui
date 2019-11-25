import {
  Component,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  TemplateRef
} from "@angular/core";

import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { FLOW_EVENTS } from "@ft-core";
import { FlowDirective, Transfer } from "@flowjs/ngx-flow";
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
  }

  /**
   * Flow upload fuc
   * @returns {void}
   */
  upload(): void {
    this.templateRf = this.uploadLoading;
    this.flow.upload();
  }

  ngOnDestroy(): void {
    this.autoUploadSubscription.unsubscribe();
  }
}
