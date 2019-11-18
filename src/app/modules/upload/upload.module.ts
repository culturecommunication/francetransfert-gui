import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MaterialModule } from "../../material.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG } from "./utils/perfect-scroll.config";
import { NgxFlowModule, FlowInjectionToken } from "@flowjs/ngx-flow";
import Flow from "@flowjs/flow.js";
import { NgCircleProgressModule } from "ng-circle-progress";
import { CIRCLE_CONFIG } from "./utils/circle.config";

import { UploadRoutingModule } from "./upload-routing.module";
import { UploadIndexComponent } from "./upload-index/upload-index.component";
import { UploadSectionComponent } from "./upload-section/upload-section.component";
import { UploadItemComponent } from "./components/upload-item/upload-item.component";
import { InputAddComponent } from "./components/input-add/input-add.component";
import { TagComponent } from "./components/tag/tag.component";
import { FileSizePipe } from "./pipes/file-size";
import { FileNamePipe } from "./pipes/file-name";
import { FileTypePipe } from "./pipes/file-type";

@NgModule({
  declarations: [
    UploadIndexComponent,
    UploadSectionComponent,
    UploadItemComponent,
    InputAddComponent,
    TagComponent,
    FileSizePipe,
    FileNamePipe,
    FileTypePipe
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    UploadRoutingModule,
    NgxFlowModule,
    MaterialModule,
    FormsModule,
    NgCircleProgressModule.forRoot(CIRCLE_CONFIG)
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: FlowInjectionToken,
      useValue: Flow
    }
  ],
  bootstrap: []
})
export class UploadModule {}
