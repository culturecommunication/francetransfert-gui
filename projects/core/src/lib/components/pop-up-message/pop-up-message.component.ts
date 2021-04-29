import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlowDirective } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'lib-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.scss']
})
export class PopUpMessageComponent implements OnInit, OnDestroy {
  message: string;
  hiddenPopup: string;
  flow: FlowDirective;
  messageSubscription: Subscription;
  hiddenPopupSubscription: Subscription;
  flowSubscription: Subscription;
  constructor(private data: DataService) {}

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.hiddenPopupSubscription.unsubscribe();
    this.flowSubscription.unsubscribe();
  }

  ngOnInit() {
    this.messageSubscription = this.data.messageSource.subscribe(message => (this.message = message));
    this.hiddenPopupSubscription = this.data.hiddenPopup.subscribe(hiddenPopup => (this.hiddenPopup = hiddenPopup));
    this.flowSubscription = this.data.flow.subscribe(flow => (this.flow = flow));
  }

  newMessage() {
    this.data.changeMessage(this.message);
  }

  hidePopup() {
    this.hiddenPopup = 'false';
    this.data.changeVisibility(this.hiddenPopup);
  }
}
