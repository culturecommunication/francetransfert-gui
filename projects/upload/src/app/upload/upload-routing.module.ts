import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "@ft-core";
import { UploadSectionComponent } from "./upload-section/upload-section.component";

const routes: Routes = [
  {
    path: "",
    component: IndexComponent,
    children: [{ path: "", component: UploadSectionComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
