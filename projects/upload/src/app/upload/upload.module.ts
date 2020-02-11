import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadSectionComponent } from './upload-section/upload-section.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { UploadChoiseComponent } from './upload-choice/upload-choice.component';

import { UploadService } from './services/upload.service';

import { CoreModule, CIRCLE_CONFIG, PopUpComponent, PopUpService, ErrorsManagerService } from '@ft-core';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import { NgCircleProgressModule } from 'ng-circle-progress';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  declarations: [UploadSectionComponent, UploadContentComponent, UploadChoiseComponent],
  imports: [
    CoreModule,
    UploadRoutingModule,
    NgxFlowModule,
    NgCircleProgressModule.forRoot(CIRCLE_CONFIG),
    HttpClientModule
  ],
  providers: [
    UploadService,
    PopUpService,
    {
      provide: FlowInjectionToken,
      useValue: Flow
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsManagerService,
      multi: true
    }
  ],
  entryComponents: [PopUpComponent]
})
export class UploadModule {}
