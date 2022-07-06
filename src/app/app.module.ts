/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */


import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { APP_BASE_HREF, DatePipe, PlatformLocation, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PwaService } from './services';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { UploadComponent } from './components/upload/upload.component';
import { DownloadComponent } from './components/download/download.component';
import { FooterComponent } from './components/footer/footer.component';
import { PwaPromptInstallComponent, PwaPromptUpdateComponent } from './components';
import { ListElementsComponent } from './components/list-elements/list-elements.component';
import { EnvelopeComponent } from './components/upload/envelope/envelope.component';
import { EnvelopeMailFormComponent } from './components/upload/envelope/envelope-mail-form/envelope-mail-form.component';
import { EnvelopeLinkFormComponent } from './components/upload/envelope/envelope-link-form/envelope-link-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';
import { MentionsLegalesComponent } from './components/mentions-legales/mentions-legales.component';
import { FaqComponent } from './components/faq/faq.component';
import { AccessibiliteComponent } from './components/accessibilite/accessibilite.component';
import { DownloadElementsComponent } from './components/download/download-elements/download-elements.component';
import { DragDropFileUploadDirective } from './shared/directives/drag-drop-file-upload.directive';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import { FileItemComponent } from './components/list-elements/file-item/file-item.component';
import { FileMultipleSizePipe, FileNamePipe, FileSizePipe, FileTypePipe, TransfersMappingPipe } from './shared/pipes';
import { LoaderComponent } from './components/loader/loader.component';
import { EnvelopeParametersFormComponent } from './components/upload/envelope/envelope-parameters-form/envelope-parameters-form.component';
import { CheckValidationCodeComponent } from './components/check-validation-code/check-validation-code.component';
import { EndMessageComponent } from './components/end-message/end-message.component';
import { SatisfactionCheckComponent } from './components/satisfaction-check/satisfaction-check.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { AdminAlertDialogComponent } from './components/admin/admin-alert-dialog/admin-alert-dialog.component';
import { CguComponent } from './components/cgu/cgu.component';
import { MailingListManagerComponent } from './components/mailing-list-manager/mailing-list-manager.component';
import { ConfirmAlertDialogComponent } from './components/check-validation-code/confirm-alert-dialog/confirm-alert-dialog.component';
import { PolitiqueProtectionDonneesComponent } from './components/politique-protection-donnees/politique-protection-donnees.component';
import { DownloadErrorComponent } from './components/download/download-error/download-error.component';
import { SatisfactionMessageComponent } from './components/satisfaction-message/satisfaction-message.component';
import { ContactEndMessageComponent } from './components/contact-end-message/contact-end-message.component';
import { InfoMsgComponent } from './components/info-msg/info-msg.component';
import { AdminEndMsgComponent } from './components/admin/admin-end-msg/admin-end-msg.component';
import { ConnectComponent } from './components/connect/connect.component';
import { ConnectEndMessageComponent } from './components/connect-end-message/connect-end-message.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeEnExtra from '@angular/common/locales/extra/en';
import { PlisComponent } from './components/plis/plis.component';
import { PlisRecusComponent } from './components/plis/plis-recus/plis-recus.component';
import { PlisEnvoyesComponent } from './components/plis/plis-envoyes/plis-envoyes.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DownloadEndMessageComponent } from './components/download-end-message/download-end-message.component';
import { CustomPaginatorService } from './shared/custom-paginator/custom-paginator.service';
// search module
import { FilterPipe } from './shared/pipes/FilterPipe.pipe';
import { FilterQuestionsPipe } from './shared/pipes/FilterQuestionsPipe.pipe';

registerLocaleData(localeEn, 'en', localeEnExtra);
registerLocaleData(localeEs, 'es', localeEsExtra);
registerLocaleData(localeFr, 'fr', localeFrExtra);


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


//registerLocaleData(localeFr);
const initializer = (pwaService: PwaService) => () =>
  pwaService.initPwaPrompt()

@NgModule({
  declarations: [
    FilterQuestionsPipe,
    FilterPipe,
    AppComponent,
    HeaderComponent,
    MenuComponent,
    UploadComponent,
    DownloadComponent,
    FooterComponent,
    PwaPromptInstallComponent,
    PwaPromptUpdateComponent,
    ListElementsComponent,
    EnvelopeComponent,
    EnvelopeMailFormComponent,
    EnvelopeLinkFormComponent,
    ContactComponent,
    MentionsLegalesComponent,
    FaqComponent,
    AccessibiliteComponent,
    DownloadElementsComponent,
    DragDropFileUploadDirective,
    FileItemComponent,
    FileMultipleSizePipe,
    FileNamePipe,
    FileSizePipe,
    FileTypePipe,
    TransfersMappingPipe,
    LoaderComponent,
    EnvelopeParametersFormComponent,
    CheckValidationCodeComponent,
    EndMessageComponent,
    SatisfactionCheckComponent,
    LanguageSelectorComponent,
    AdminComponent,
    AdminAlertDialogComponent,
    CguComponent,
    MailingListManagerComponent,
    ConfirmAlertDialogComponent,
    PolitiqueProtectionDonneesComponent,
    DownloadErrorComponent,
    SatisfactionMessageComponent,
    ContactEndMessageComponent,
    InfoMsgComponent,
    AdminEndMsgComponent,
    ConnectComponent,
    ConnectEndMessageComponent,
    PlisComponent,
    PlisRecusComponent,
    PlisEnvoyesComponent,
    DownloadEndMessageComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxFlowModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginatorService
    },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    DatePipe,
    FileMultipleSizePipe,
    FileNamePipe,
    FileSizePipe,
    FileTypePipe,
    TransfersMappingPipe,
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true },
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    },
    {
      provide: FlowInjectionToken,
      useValue: Flow
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
