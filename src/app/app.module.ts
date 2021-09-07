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
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';

registerLocaleData(localeFr);
const initializer = (pwaService: PwaService) => () =>
  pwaService.initPwaPrompt()

@NgModule({
  declarations: [
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
    AdminComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgxFlowModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
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
export class AppModule { }
