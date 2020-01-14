import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { DownloadRoutingModule } from './download-routing.module';
import { CoreModule } from '../../../../core/src/public-api';

import { DownloadSectionComponent } from './download-section/download-section.component';
import { DownloadChoiseComponent } from './download-choice/download-choice.component';

import { DownloadService } from './services/download.service';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  declarations: [DownloadSectionComponent, DownloadChoiseComponent],
  imports: [CoreModule, DownloadRoutingModule, HttpClientModule],
  providers: [
    DownloadService,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ]
})
export class DownloadModule {}
