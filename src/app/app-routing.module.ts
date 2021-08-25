import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadComponent, UploadComponent, AccessibiliteComponent, ContactComponent, FaqComponent, MentionsLegalesComponent } from './components';
import { DownloadGuard } from './shared/guards';

const routes: Routes = [
  {
    path: 'upload', component: UploadComponent
  },
  {
    path: 'download', component: DownloadComponent, canActivate: [DownloadGuard]
  },
  {
    path: 'accessibilite', component: AccessibiliteComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'faq', component: FaqComponent
  },
  {
    path: 'mentions-legales', component: MentionsLegalesComponent
  },
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: '**', redirectTo: 'upload' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
