import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent, FaqComponent, MlComponent, CguComponent } from '@ft-core';
import { UploadSectionComponent } from './upload-section/upload-section.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [{ path: '', component: UploadSectionComponent }]
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'ml',
    component: MlComponent
  },
  {
    path: 'cgu',
    component: CguComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule {}
