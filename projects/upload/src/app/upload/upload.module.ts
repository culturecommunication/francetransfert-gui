import { NgModule } from "@angular/core";

import { UploadRoutingModule } from "./upload-routing.module";
import { UploadSectionComponent } from "./upload-section/upload-section.component";

import { CoreModule, CIRCLE_CONFIG } from "@ft-core";
import { NgxFlowModule, FlowInjectionToken } from "@flowjs/ngx-flow";
import Flow from "@flowjs/flow.js";
import { NgCircleProgressModule } from "ng-circle-progress";

@NgModule({
  declarations: [UploadSectionComponent],
  imports: [
    CoreModule,
    UploadRoutingModule,
    NgxFlowModule,
    NgCircleProgressModule.forRoot(CIRCLE_CONFIG)
  ],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow
    }
  ]
})
export class UploadModule {}
