import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesBannerComponent } from './cookies-banner.component';
import { CookieService } from 'ngx-cookie-service';
import { CookiesManagerService } from '../../services/cookies.manager';

describe('FileItemComponent', () => {
  let component: CookiesBannerComponent;
  let fixture: ComponentFixture<CookiesBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CookiesBannerComponent],
      providers: [CookieService, CookiesManagerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
