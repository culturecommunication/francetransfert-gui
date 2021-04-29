import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'lib-pop-up-list',
  templateUrl: './pop-up-list.component.html',
  styleUrls: ['./pop-up-list.component.scss']
})
export class PopUpListComponent implements OnInit, OnDestroy {
  hiddenPopupList: string;
  flow: FlowDirective;
  emails: Array<string>;
  flagFiles: boolean;
  title: string;

  hiddenPopupSubscription: Subscription;
  flowSubscription: Subscription;
  emailsSubscription: Subscription;
  flagFilesSubscription: Subscription;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.hiddenPopupSubscription = this.data.hiddenPopup.subscribe(hiddenPopup => (this.hiddenPopupList = hiddenPopup));
    this.flowSubscription = this.data.flow.subscribe(flow => {
      this.flow = flow;
      this.title = 'Fichiers';
    });
    this.emailsSubscription = this.data.emails.subscribe(emails => {
      this.emails = emails;
      this.title = 'Destinataires';
    });
    this.flagFilesSubscription = this.data.flagFiles.subscribe(flagFiles => {
      this.flagFiles = flagFiles;
      this.title = 'Fichiers';
    });
  }

  ngOnDestroy() {
    this.hiddenPopupSubscription.unsubscribe();
    this.flowSubscription.unsubscribe();
    this.emailsSubscription.unsubscribe();
    this.flagFilesSubscription.unsubscribe();
  }

  hidePopup() {
    this.hiddenPopupList = 'false';
    this.data.changeVisibility(this.hiddenPopupList);
  }

  setEmails(emails: Array<string>) {
    this.data.setEmail(emails);
  }

  trackTransfer(transfer: Transfer): string {
    return transfer.id;
  }

  /**
   * Delete transfer
   * @param {Transfer} transfer
   * @returns {void}
   */
  deleteTransfer(transfer: Transfer): void {
    if (this.flow.flowJs.files.length == 1) {
      this.data.changeVisibility('false');
    }
    this.flow.cancelFile(transfer);
  }

  /**
   * Delete an email
   * @param {string} deletedEmail
   * @returns {void}
   */
  deleteEmail(deletedEmail: string): void {
    if (this.emails.length == 1) {
      this.data.changeVisibility('false');
    }
    this.emails.splice(this.emails.indexOf(deletedEmail), 1);
  }
}
