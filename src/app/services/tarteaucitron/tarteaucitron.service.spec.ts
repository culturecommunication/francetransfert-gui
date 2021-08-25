import { TestBed } from '@angular/core/testing';

import { TarteaucitronService } from './tarteaucitron.service';

describe('TarteaucitronService', () => {
  let service: TarteaucitronService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarteaucitronService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
