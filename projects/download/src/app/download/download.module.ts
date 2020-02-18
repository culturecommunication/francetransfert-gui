import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { DownloadRoutingModule } from './download-routing.module';
import { CoreModule, ErrorsManagerService } from '@ft-core';

import { DownloadSectionComponent } from './download-section/download-section.component';
import { DownloadChoiceComponent } from './download-choice/download-choice.component';

import { DownloadService } from './services/download.service';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  declarations: [DownloadSectionComponent, DownloadChoiceComponent],
  imports: [CoreModule, DownloadRoutingModule, HttpClientModule],
  providers: [
    DownloadService,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsManagerService,
      multi: true
    }
  ]
})
export class DownloadModule {}
