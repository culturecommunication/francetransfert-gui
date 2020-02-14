import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContentComponent } from './upload-content.component';
import {
  TagComponent,
  FileItemComponent,
  FileSizePipe,
  FileNamePipe,
  FileTypePipe,
  FileMultipleSizePipe
} from '@ft-core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';

describe('UploadContentComponent', () => {
  let component: UploadContentComponent;
  let fixture: ComponentFixture<UploadContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UploadContentComponent,
        TagComponent,
        FileItemComponent,
        FileSizePipe,
        FileNamePipe,
        FileTypePipe,
        FileMultipleSizePipe
      ],
      imports: [PerfectScrollbarModule, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
