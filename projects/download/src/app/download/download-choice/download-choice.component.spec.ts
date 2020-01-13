import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadChoiseComponent } from './download-choice.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

describe('DownloadChoiseComponent', () => {
  let component: DownloadChoiseComponent;
  let fixture: ComponentFixture<DownloadChoiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadChoiseComponent],
      imports: [PerfectScrollbarModule]
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
