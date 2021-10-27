import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageModel } from 'src/app/models';
import { LanguageSelectionService } from 'src/app/services';

@Component({
  selector: 'ft-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {

  languageSelectionSubscription: Subscription;
  defaultLanguage: LanguageModel;
  languageList: LanguageModel[];

  constructor(private languageSelectionService: LanguageSelectionService) { }

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
