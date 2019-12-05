import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadChoiseComponent } from './upload-choice.component';
import { CookiesManagerService } from '@ft-core';
import { CookieService } from 'ngx-cookie-service';

describe('UploadChoiseComponent', () => {
  let component: UploadChoiseComponent;
  let fixture: ComponentFixture<UploadChoiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadChoiseComponent],
      providers: [CookieService, CookiesManagerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadChoiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
