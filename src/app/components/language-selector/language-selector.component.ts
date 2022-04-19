import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageModel } from 'src/app/models';
import { LanguageSelectionService, UploadService } from 'src/app/services';
import {TranslateService} from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'ft-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {

  public selectedDate: Date = new Date();
  languageSelectionSubscription: Subscription;
  defaultLanguage: LanguageModel;
  languageList: LanguageModel[];
  langueCourriels: String;
  selectedOption: string;


  constructor(private languageSelectionService: LanguageSelectionService,
  public translateService: TranslateService,
  private uploadService: UploadService,
  private dateAdapter: DateAdapter<Date>
  ) {
    //translateService.setDefaultLang("en-US")
    translateService.setDefaultLang("fr-FR");
    translateService.use('fr-FR');

 }


  public selectLanguage(event: any){
    this.translateService.use(event.target.value);
    this.dateAdapter.setLocale(event.target.value);
    this.uploadService.setLangueCourriels(event.target.value);
    this.uploadService.setLangue(event.target.value);
  }

  ngOnInit(): void {
    this.languageSelectionSubscription = this.languageSelectionService.selectedLanguage.subscribe(lang => {
      this.defaultLanguage = lang;
    });
    this.languageList = this.languageSelectionService.languageList;

  }

  ngOnDestroy(): void {
    this.languageSelectionSubscription.unsubscribe();
  }
}
