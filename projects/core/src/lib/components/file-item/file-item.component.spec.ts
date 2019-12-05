import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileItemComponent } from './file-item.component';
import { FileNamePipe } from '../../pipes/file-name';
import { FileSizePipe } from '../../pipes/file-size';
import { FileTypePipe } from '../../pipes/file-type';
import { Transfer } from '@flowjs/ngx-flow';
import { FTTransfer } from '../../models/ft-transfers';

describe('FileItemComponent', () => {
  let component: FileItemComponent;
  let fixture: ComponentFixture<FileItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileItemComponent, FileNamePipe, FileSizePipe, FileTypePipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileItemComponent);
    component = fixture.componentInstance;
    component.transfer = {
      folder: false
    } as FTTransfer<Transfer>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
