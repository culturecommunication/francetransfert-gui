import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DownloadSectionComponent } from './download-section.component';
import {
  TagComponent,
  FileItemComponent,
  PasswordInputComponent,
  TransfersMappingPipe,
  FileSizePipe,
  FileNamePipe,
  FileTypePipe,
  CookiesManagerService
} from '@ft-core';
import { CookieService } from 'ngx-cookie-service';
import { DownloadChoiseComponent } from '../download-choice/download-choice.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe('DownloadSectionComponent', () => {
  let component: DownloadSectionComponent;
  let fixture: ComponentFixture<DownloadSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DownloadSectionComponent,
        TagComponent,
        FileItemComponent,
        DownloadChoiseComponent,
        PasswordInputComponent,
        TransfersMappingPipe,
        FileSizePipe,
        FileNamePipe,
        FileTypePipe
      ],
      imports: [PerfectScrollbarModule, FormsModule],
      providers: [CookieService, CookiesManagerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
