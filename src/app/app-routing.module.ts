import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadComponent, UploadComponent, AccessibiliteComponent, ContactComponent, FaqComponent, MentionsLegalesComponent, AdminComponent, PolitiqueProtectionDonneesComponent } from './components';
import { CguComponent } from './components/cgu/cgu.component';
import { DownloadGuard } from './shared/guards';

const routes: Routes = [
  {
    path: 'upload', component: UploadComponent
  },
  {
    path: 'download', component: DownloadComponent, canActivate: [DownloadGuard],
    children: [
      {
        path: 'download-info-public',
        component: DownloadComponent
      }
    ]
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'accessibilite', component: AccessibiliteComponent
  },
  // {
  //   path: 'contact', component: ContactComponent
  // },
  {
    path: 'faq', component: FaqComponent
  },
  {
    path: 'mentions-legales', component: MentionsLegalesComponent
  },
  {
    path: 'politique-de-protection-des-donnees', component: PolitiqueProtectionDonneesComponent
  },
  {
    path: 'cgu', component: CguComponent
  },
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: '**', redirectTo: 'upload' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
