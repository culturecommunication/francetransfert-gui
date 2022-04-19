import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UploadState } from '@flowjs/ngx-flow';
import { timer } from 'rxjs/internal/observable/timer';
import { Subscription } from 'rxjs/internal/Subscription';
import { FileManagerService } from 'src/app/services';


@Component({
  selector: 'ft-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  mode: ProgressSpinnerMode = 'determinate';
  progressValue: number = 0;
  @Output() transferCancelled: EventEmitter<boolean> = new EventEmitter();
  @Output() transferFinished: EventEmitter<boolean> = new EventEmitter();
  @Output() transferFailed: EventEmitter<boolean> = new EventEmitter();
  timerSubscription: Subscription;
  progressSubscription: Subscription;

  constructor(private fileManagerService: FileManagerService,
    ) { }

  ngOnInit(): void {


    // this.observableTimer();
    this.progressSubscription = this.fileManagerService.uploadProgress.subscribe(t => {
      if (this.haveChunkError(t)) {
        this.cancelTransfer();
        console.log('Transfert Error');
      }
      this.progressValue = Math.round(t.totalProgress * 100);
      if (this.progressValue < 100) {
      } else if (this.isFinish(t) && !this.haveChunkError(t)) {
        this.transferFinished.emit(true);
      } else if (this.haveChunkError(t)) {
        this.cancelTransfer();
        console.log('Transfert Error');
      }
    });


  }

  observableTimer() {
    this.timerSubscription = timer(0, 500)
      .subscribe(time => {
        if (this.progressValue < 100) {
          this.progressValue += 20;
        } else {
          // this.transferFinished.emit(true);
        }
      });
  }

  cancelTransfer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
    this.transferFailed.emit(true);
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }


  haveChunkError(uploadState: UploadState): boolean {
    for (let transfer of uploadState.transfers) {
      if (transfer.error && !transfer.success) {
        return true;
      }
    }
    return false;
  }

  isFinish(uploadState: UploadState): boolean {
    return uploadState.transfers.every(x => x.complete == true);
  }

}
