import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DownloadService } from './download.service';

describe('DownloadService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: DownloadService = TestBed.get(DownloadService);
    expect(service).toBeTruthy();
  });
});
