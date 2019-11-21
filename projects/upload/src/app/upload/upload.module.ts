import { NgModule } from "@angular/core";

import { UploadRoutingModule } from "./upload-routing.module";
import { UploadSectionComponent } from "./upload-section/upload-section.component";

import { CoreModule } from "../../../../core/src/public-api";
import { NgxFlowModule, FlowInjectionToken } from "@flowjs/ngx-flow";
import Flow from "@flowjs/flow.js";

@NgModule({
  declarations: [UploadSectionComponent],
  imports: [CoreModule, UploadRoutingModule, NgxFlowModule],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow
    }
  ]
})
export class UploadModule {}
