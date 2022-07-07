/*
  * Copyright (c) Ministère de la Culture (2022)
  *
  * SPDX-License-Identifier: MIT
  * License-Filename: LICENSE.txt
  */

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { FTErrorModel } from 'src/app/models';
import { DownloadManagerService } from 'src/app/services';

@Component({
  selector: 'ft-download-elements',
  templateUrl: './download-elements.component.html',
  styleUrls: ['./download-elements.component.scss']
})
export class DownloadElementsComponent implements OnInit, OnDestroy {

  @Output() dowloadStarted: EventEmitter<boolean> = new EventEmitter();
  @Input() availabilityDate: Date;
  remainingDays: number;
  checkCGU: boolean = false;
  errorDLSubscription: Subscription = new Subscription();

  error: FTErrorModel;
  buttonDisable = false;

  constructor(private router: Router, private downloadManagerService: DownloadManagerService) {
    this.checkCGU = false;
  }

  ngOnInit(): void {
    this.remainingDays = this.calculateDiff(this.availabilityDate);
    this.errorDLSubscription = this.downloadManagerService.downloadError$.subscribe(error => {
      if (error) {
        this.error = { statusCode: error.statusCode, message: error.message, codeTryCount: error.codeTryCount };
      }
    });
  }

  download() {
    this.dowloadStarted.emit(true);
    this.buttonDisable = true;
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor((Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

  routeToInNewWindow(_route) {
    // Converts the route into a string that can be used
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/${_route}`])
    );

    window.open(url, '_blank');
  }


  cguChecked() {
    this.checkCGU = !this.checkCGU;
  }

  ngOnDestroy(): void {
    this.errorDLSubscription.unsubscribe();
  }
}
