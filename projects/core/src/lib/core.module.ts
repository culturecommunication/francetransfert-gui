import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/** Import Vendors */
import { MaterialModule } from './material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG } from './configuration/perfect-scroll.config';
import { CookieService } from 'ngx-cookie-service';

/** Import Components */
import { FileItemComponent } from './components/file-item/file-item.component';
import { MailInputGroupComponent } from './components/mail-input-group/mail-input-group.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { TagComponent } from './components/tag/tag.component';
import { CookiesBannerComponent } from './components/cookies-banner/cookies-banner.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';

/** Import Pages */
import { IndexComponent } from './pages/index/index.component';
import { FaqComponent } from './pages/faq/faq.component';
import { MlComponent } from './pages/ml/ml.component';
import { CguComponent } from './pages/cgu/cgu.component';
import { ErrorsComponent } from './pages/errors/errors.component';

/** Import Services */
import { CookiesManagerService } from './services/cookies.manager';

/** Import Pipes */
import { FileNamePipe } from './pipes/file-name';
import { FileTypePipe } from './pipes/file-type';
import { FileSizePipe } from './pipes/file-size';
import { TransfersMappingPipe } from './pipes/transfer-mapping';
import { FileMultipleSizePipe } from './pipes/file-multiple-size';

@NgModule({
  declarations: [
    FileItemComponent,
    MailInputGroupComponent,
    PasswordInputComponent,
    TagComponent,
    IndexComponent,
    CookiesBannerComponent,
    PopUpComponent,
    ErrorsComponent,
    FileNamePipe,
    FileTypePipe,
    FileSizePipe,
    TransfersMappingPipe,
    FileMultipleSizePipe,
    FaqComponent,
    MlComponent,
    CguComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule, PerfectScrollbarModule],
  providers: [
    CookiesManagerService,
    CookieService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    FileItemComponent,
    MailInputGroupComponent,
    PasswordInputComponent,
    TagComponent,
    IndexComponent,
    CookiesBannerComponent,
    FileNamePipe,
    FileTypePipe,
    FileSizePipe,
    TransfersMappingPipe,
    FileMultipleSizePipe,
    PerfectScrollbarModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class CoreModule {}
