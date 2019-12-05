import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadChoiseComponent } from './download-choice.component';
import { CookieService } from 'ngx-cookie-service';
import { CookiesManagerService } from '@ft-core';

describe('DownloadChoiseComponent', () => {
  let component: DownloadChoiseComponent;
  let fixture: ComponentFixture<DownloadChoiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadChoiseComponent],
      providers: [CookieService, CookiesManagerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadChoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
