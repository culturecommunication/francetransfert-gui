import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs/internal/operators/map';
import { share } from 'rxjs/internal/operators/share';
import { Subscription } from 'rxjs/internal/Subscription';

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
  timerSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.observableTimer();
  }

  observableTimer() {
    this.timerSubscription = timer(0, 500)
      .subscribe(time => {
        if (this.progressValue < 100) {
          this.progressValue += 20;
        } else {
          this.transferFinished.emit(true);
        }
      });
  }

  cancelTransfer() {
    this.transferCancelled.emit(true);
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}