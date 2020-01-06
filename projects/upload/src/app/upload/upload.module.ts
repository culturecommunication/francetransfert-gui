import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadSectionComponent } from './upload-section/upload-section.component';
import { UploadContentComponent } from './upload-content/upload-content.component';
import { UploadChoiseComponent } from './upload-choice/upload-choice.component';

import { UploadService } from './services/upload.service';
import { CoreModule, CIRCLE_CONFIG } from '@ft-core';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
    {
      provide: FlowInjectionToken,
      useValue: Flow
    }
  ]
})
export class UploadModule {}
