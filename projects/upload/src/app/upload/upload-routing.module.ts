import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IndexComponent, FaqComponent, MlComponent, CguComponent, ErrorsComponent } from '@ft-core';
import { UploadSectionComponent } from './upload-section/upload-section.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [{ path: '', component: UploadSectionComponent }]
  },
  {
    path: 'faq',
    component: IndexComponent,
    children: [{ path: '', component: FaqComponent }]
  },
  {
    path: 'ml',
    component: IndexComponent,
    children: [{ path: '', component: MlComponent }]
  },
  {
    path: 'cgu',
    component: IndexComponent,
    children: [{ path: '', component: CguComponent }]
  },
  {
    path: 'error',
    component: IndexComponent,
    children: [{ path: '', component: ErrorsComponent }]
  },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, ReactiveFormsModule]
})
export class UploadRoutingModule {}
