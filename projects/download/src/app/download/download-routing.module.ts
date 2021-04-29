import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  IndexComponent,
  FaqComponent,
  MlComponent,
  CguComponent,
  ErrorsComponent
} from '../../../../core/src/public-api';
import { DownloadSectionComponent } from './download-section/download-section.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [{ path: '', component: DownloadSectionComponent }]
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
  exports: [RouterModule]
})
export class DownloadRoutingModule {}
