import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

/** Import Vendors */
import { MaterialModule } from "./material.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { DEFAULT_PERFECT_SCROLLBAR_CONFIG } from "./configuration/perfect-scroll.config";

/** Import Components */
import { FileItemComponent } from "./components/file-item/file-item.component";
import { MailInputGroupComponent } from "./components/mail-input-group/mail-input-group.component";
import { PasswordInputComponent } from "./components/password-input/password-input.component";
import { TagComponent } from "./components/tag/tag.component";

/** Import Pages */
import { IndexComponent } from "./pages/index/index.component";

/** Import Pipes */
import { FileNamePipe } from "./pipes/file-name";
import { FileTypePipe } from "./pipes/file-type";
import { FileSizePipe } from "./pipes/file-size";

@NgModule({
  declarations: [
    FileItemComponent,
    MailInputGroupComponent,
    PasswordInputComponent,
    TagComponent,
    IndexComponent,
    FileNamePipe,
    FileTypePipe,
    FileSizePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    PerfectScrollbarModule
  ],
  providers: [
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
    FileNamePipe,
    FileTypePipe,
    FileSizePipe,
    PerfectScrollbarModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class CoreModule {}
