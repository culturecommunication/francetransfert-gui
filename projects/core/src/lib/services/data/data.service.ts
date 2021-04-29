import { Injectable } from '@angular/core';
import { FlowDirective } from '@flowjs/ngx-flow';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  messageSource = new BehaviorSubject<string>('');
  flow = new BehaviorSubject<FlowDirective>(null);
  hiddenPopup = new BehaviorSubject<string>('');
  emails = new BehaviorSubject<Array<string>>(null);
  flagFiles = new BehaviorSubject<boolean>(false);

  constructor() {}

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeVisibility(bool: string) {
    this.hiddenPopup.next(bool);
  }

  setFlow(flow: FlowDirective) {
    this.flow.next(flow);
  }

  setEmail(emails: Array<string>) {
    this.emails.next(emails);
  }

  setFlagFiles(flagFiles: boolean) {
    this.flagFiles.next(flagFiles);
  }
}
