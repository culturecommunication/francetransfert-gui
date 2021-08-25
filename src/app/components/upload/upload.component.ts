import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ResponsiveService, UploadManagerService } from 'src/app/services';

@Component({
  selector: 'ft-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  uploadStarted: boolean = false;
  uploadFinished: boolean = false;
  uploadValidated: boolean = false;
  uploadManagerSubscription: Subscription;
  senderEmail: string;

  constructor(private uploadManagerService: UploadManagerService) { }

  ngOnInit(): void {
    this.uploadManagerSubscription = this.uploadManagerService.envelopeInfos.subscribe(_envelopeInfos => {
      console.log(_envelopeInfos);
      if (_envelopeInfos && _envelopeInfos.from) {
        this.senderEmail = _envelopeInfos.from;
      }
    });
  }

  onUploadStarted(event) {
    this.uploadStarted = event;
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
    this.uploadStarted = false;
    this.uploadValidated = false;
    this.uploadFinished = false;
  }

  ngOnDestroy() {
    this.uploadManagerSubscription.unsubscribe();
  }
}
