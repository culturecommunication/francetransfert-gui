import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DownloadChoiceComponent } from './download-choice.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

let ActivatedRouteMock = {
  queryParams: of([{ mock: 'mock' }])
};
describe('DownloadChoiceComponent', () => {
  let component: DownloadChoiceComponent;
  let fixture: ComponentFixture<DownloadChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadChoiceComponent],
      imports: [PerfectScrollbarModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteMock
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
