import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { UploadSectionComponent } from './upload-section.component';
import { UploadChoiseComponent } from '../upload-choice/upload-choice.component';
import { UploadContentComponent } from '../upload-content/upload-content.component';
import {
  TagComponent,
  FileItemComponent,
  PasswordInputComponent,
  TransfersMappingPipe,
  MailInputGroupComponent,
  FileSizePipe,
  FileNamePipe,
  FileTypePipe,
  CookiesManagerService,
  FileMultipleSizePipe
} from '@ft-core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxFlowModule, FlowInjectionToken } from '@flowjs/ngx-flow';
import Flow from '@flowjs/flow.js';
import { CookieService } from 'ngx-cookie-service';

describe('UploadChoiseComponent', () => {
  let component: UploadSectionComponent;
  let fixture: ComponentFixture<UploadSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadSectionComponent,
        UploadChoiseComponent,
        UploadContentComponent,
        TagComponent,
        FileItemComponent,
        PasswordInputComponent,
        TransfersMappingPipe,
        FileSizePipe,
        FileNamePipe,
        FileTypePipe,
        MailInputGroupComponent,
        FileMultipleSizePipe
      ],
      imports: [NgCircleProgressModule, FormsModule, PerfectScrollbarModule, NgxFlowModule],
      providers: [
        CookiesManagerService,
        CookieService,
        {
          provide: FlowInjectionToken,
          useValue: Flow
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
