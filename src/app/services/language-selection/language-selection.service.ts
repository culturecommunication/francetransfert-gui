import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LanguageModel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class LanguageSelectionService {

  languageList: LanguageModel[] = [];
  selectedLanguage: BehaviorSubject<LanguageModel> = new BehaviorSubject<LanguageModel>({ code: '', label: '', flagUrl: '', href: '' });

  constructor(@Inject(APP_BASE_HREF) public baseHref: string) { 
    const rootHref = this.baseHref.split('/');
    this.languageList = [
      { code: 'fr', label: 'Français', flagUrl: './assets/flags/flag_fr.svg', href: `${rootHref[1]}/fr/` },
      { code: 'en', label: 'English', flagUrl: './assets/flags/flag_en.svg', href: `${rootHref[1]}/en/` },
      { code: 'de', label: 'Deutsch', flagUrl: './assets/flags/flag_de.svg', href: `${rootHref[1]}/de/` },
      { code: 'es', label: 'Español', flagUrl: './assets/flags/flag_es.svg', href: `${rootHref[1]}/es/` }
    ];
    this.selectedLanguage.next(this.languageList[0]);
  }
}
