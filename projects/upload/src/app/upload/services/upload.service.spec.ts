import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UploadService } from './upload.service';
import { CookiesManagerService } from '@ft-core';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';

describe('UploadService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [
        CookieService,
        CookiesManagerService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
      ]
    })
  );

  it('should be created', () => {
    const service: UploadService = TestBed.get(UploadService);
    expect(service).toBeTruthy();
  });
});
