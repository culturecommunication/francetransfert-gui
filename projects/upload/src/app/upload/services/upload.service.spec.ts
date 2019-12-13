import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UploadService } from './upload.service';
import { CookiesManagerService } from '@ft-core';
import { CookieService } from 'ngx-cookie-service';

describe('UploadService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService, CookiesManagerService]
    })
  );

  it('should be created', () => {
    const service: UploadService = TestBed.get(UploadService);
    expect(service).toBeTruthy();
  });
});
