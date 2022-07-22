/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */


import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Transfer } from '@flowjs/ngx-flow';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { FTTransferModel, LinkInfosModel, MailInfosModel, ParametersModel } from 'src/app/models';
import { TokenModel } from 'src/app/models/token.model';
import { AdminService, FileManagerService, UploadManagerService } from 'src/app/services';
import { LoginService } from 'src/app/services/login/login.service';
import { majChar, minChar, numChar, sizeControl, specialChar } from 'src/app/shared/validators/forms-validator';

@Component({
  selector: 'ft-plis',
  templateUrl: './plis.component.html',
  styleUrls: ['./plis.component.scss']
})
export class PlisComponent implements OnInit {

  //added by abir
  tokenInfo: BehaviorSubject<TokenModel> = new BehaviorSubject<any>(null);
  fileInfos: any;
  transfers: Array<any> = [];
  validUntilDate;
  maxDate = new Date();
  public selectedDate: Date = new Date();


  @Output() uploadStarted: EventEmitter<boolean> = new EventEmitter();
  selectedTab: string;
  selectedTabIndex: number = 0;

  showParameters: boolean = false;

  parametersFormValues: ParametersModel;

  constructor() { }

  ngOnInit(): void {


  }


  onSelectedTabChange(event) {
    this.selectedTab = event.tab.textLabel;
    this.selectedTabIndex = event.index;
  }





}
