import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UploadSectionComponent } from './upload-section.component';
import { UploadChoiceComponent } from '../upload-choice/upload-choice.component';
import { UploadContentComponent } from '../upload-content/upload-content.component';
import {
  TagComponent,
  FileItemComponent,
  PasswordInputComponent,
  TransfersMappingPipe,
  MailInputGroupComponent,
  MailInputComponent,
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
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('UploadSectionComponent', () => {
  let component: UploadSectionComponent;
  let fixture: ComponentFixture<UploadSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadSectionComponent,
        UploadChoiceComponent,
        UploadContentComponent,
        TagComponent,
        FileItemComponent,
        PasswordInputComponent,
        TransfersMappingPipe,
        FileSizePipe,
        FileNamePipe,
        FileTypePipe,
        MailInputGroupComponent,
        MailInputComponent,
        FileMultipleSizePipe
      ],
      imports: [
        NgCircleProgressModule,
        FormsModule,
        PerfectScrollbarModule,
        NgxFlowModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        CookiesManagerService,
        CookieService,
        {
          provide: FlowInjectionToken,
          useValue: Flow
        },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
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
