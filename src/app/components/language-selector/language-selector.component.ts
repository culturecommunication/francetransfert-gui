/*
  * Copyright (c) Ministère de la Culture (2022)
  *
  * SPDX-License-Identifier: MIT
  * License-Filename: LICENSE.txt
  */

import { Component, OnDestroy, OnInit, inject, Inject, LOCALE_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageModel } from 'src/app/models';
import { LanguageSelectionService, UploadService } from 'src/app/services';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'ft-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {

  public selectedDate: Date = new Date();
  languageSelectionSubscription: Subscription;
  checkValidationSubscription: Subscription;
  defaultLanguage: LanguageModel;
  languageList: LanguageModel[];
  selectedOption: string;
  language: string;
  checkValidation: any;


  constructor(private languageSelectionService: LanguageSelectionService,
    public translateService: TranslateService,
    private dateAdapter: DateAdapter<Date>,
    private uploadService: UploadService,

  ) {
    //translateService.setDefaultLang("en-US")
    translateService.setDefaultLang("fr-FR");
    translateService.use('fr-FR');
    this.language = 'fr-FR';
    this.uploadService.setLangueCourriels('fr-FR');


  }


  public selectLanguage(value: any) {
    this.translateService.use(value);
    this.dateAdapter.setLocale(value);
    this.checkValidationSubscription = this.uploadService.checkValidation.subscribe(checkValidation => {
      this.checkValidation = checkValidation;
    });

    if (this.checkValidation == false) {
      this.uploadService.setLangueCourriels(value);
    }
  }

  ngOnInit(): void {
    this.languageSelectionSubscription = this.languageSelectionService.selectedLanguage.subscribe(lang => {
      this.defaultLanguage = lang;
    });
    this.languageList = this.languageSelectionService.languageList;

  }

  ngOnDestroy(): void {
    this.languageSelectionSubscription.unsubscribe();
    this.checkValidationSubscription.unsubscribe();
  }
}
