import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material.module';
import { IndexComponent } from './index.component';
import { CookiesBannerComponent } from '../../components/cookies-banner/cookies-banner.component';
import { CookiesManagerService } from '../../services/cookies.manager';
import { CookieService } from 'ngx-cookie-service';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [IndexComponent, CookiesBannerComponent],
      providers: [CookieService, CookiesManagerService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(IndexComponent);
        component = fixture.componentInstance;
      });
  }));

  it(`should create the component`, async(() => {
    expect(component).toBeTruthy();
  }));
});
