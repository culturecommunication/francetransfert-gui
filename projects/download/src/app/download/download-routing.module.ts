import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "../../../../core/src/public-api";
import { DownloadSectionComponent } from "./download-section/download-section.component";

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    children: [{ path: "", component: DownloadSectionComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule {}
