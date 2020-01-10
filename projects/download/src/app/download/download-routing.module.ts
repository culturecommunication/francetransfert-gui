import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent, FaqComponent, MlComponent, CguComponent } from '../../../../core/src/public-api';
import { DownloadSectionComponent } from './download-section/download-section.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [{ path: '', component: DownloadSectionComponent }]
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
export class DownloadRoutingModule {}
