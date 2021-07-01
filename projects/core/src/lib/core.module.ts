import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule, PlatformLocation } from '@angular/common';
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
import { MailInputComponent } from './components/mail-input/mail-input.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { TagComponent } from './components/tag/tag.component';
import { CookiesBannerComponent } from './components/cookies-banner/cookies-banner.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import { MobileMenuComponent } from './components/mobile-menu/mobile-menu.component';
import { HeaderComponent } from './components/header/header.component';

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
import { FooterComponent } from './components/footer/footer.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { PopUpMessageComponent } from './components/pop-up-message/pop-up-message.component';
import { PopUpListComponent } from './components/pop-up-list/pop-up-list.component';

/** Import Remix Icons (DINUM) */
import { RiQuestionFill, RiMenuLine, RiArrowRightSLine, RemixIconModule } from 'angular-remix-icon';

import { PinchZoomModule } from 'ngx-pinch-zoom';

// Configure the required icons before hand
const icons = {
  RiMenuLine,
  RiArrowRightSLine,
  RiQuestionFill
};

@NgModule({
  declarations: [
    FileItemComponent,
    MailInputGroupComponent,
    MailInputComponent,
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
    CguComponent,
    MobileMenuComponent,
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent,
    PopUpMessageComponent,
    PopUpListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    PerfectScrollbarModule,
    RemixIconModule.configure(icons),
    PinchZoomModule
  ],
  providers: [
    CookiesManagerService,
    CookieService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: APP_BASE_HREF,
      useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
      deps: [PlatformLocation]
    }
  ],
  exports: [
    FileItemComponent,
    MailInputGroupComponent,
    MailInputComponent,
    PasswordInputComponent,
    TagComponent,
    IndexComponent,
    CookiesBannerComponent,
    MobileMenuComponent,
    HeaderComponent,
    FileNamePipe,
    FileTypePipe,
    FileSizePipe,
    TransfersMappingPipe,
    FileMultipleSizePipe,
    PerfectScrollbarModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    PopUpMessageComponent,
    PopUpListComponent
  ]
})
export class CoreModule {}
