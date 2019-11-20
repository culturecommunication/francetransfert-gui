import { NgModule } from "@angular/core";

import { DownloadRoutingModule } from "./download-routing.module";
import { CoreModule } from "../../../../core/src/public-api";

import { DownloadSectionComponent } from "./download-section/download-section.component";

@NgModule({
  declarations: [DownloadSectionComponent],
  imports: [CoreModule, DownloadRoutingModule]
})
export class DownloadModule {}
