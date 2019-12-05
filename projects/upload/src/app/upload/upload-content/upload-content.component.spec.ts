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

describe('UploadChoiseComponent', () => {
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
      imports: [PerfectScrollbarModule]
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
