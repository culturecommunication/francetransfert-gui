import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Data, Params } from '@angular/router';

import { DownloadSectionComponent } from './download-section.component';
import {
  TagComponent,
  FileItemComponent,
  PasswordInputComponent,
  TransfersMappingPipe,
  FileSizePipe,
  FileNamePipe,
  FileTypePipe
} from '@ft-core';
import { DownloadChoiseComponent } from '../download-choice/download-choice.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { of } from 'rxjs';

let ActivatedRouteMock = {
  queryParams: of([{ mock: 'mock' }])
};
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
      imports: [PerfectScrollbarModule, FormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteMock
        }
      ]
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
