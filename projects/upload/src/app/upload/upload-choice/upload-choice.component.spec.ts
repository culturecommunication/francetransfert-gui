import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UploadChoiceComponent } from './upload-choice.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { CookiesManagerService } from '@ft-core';
import { CookieService } from 'ngx-cookie-service';

describe('UploadChoiceComponent', () => {
  let component: UploadChoiceComponent;
  let fixture: ComponentFixture<UploadChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadChoiceComponent],
      imports: [PerfectScrollbarModule, FormsModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        CookieService,
        CookiesManagerService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
