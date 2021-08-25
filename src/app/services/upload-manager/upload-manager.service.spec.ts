import { TestBed } from '@angular/core/testing';

import { UploadManagerService } from './upload-manager.service';

describe('UploadManagerService', () => {
  let service: UploadManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
