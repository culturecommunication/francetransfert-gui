import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadErrorComponent } from './download-error.component';

describe('DownloadErrorComponent', () => {
  let component: DownloadErrorComponent;
  let fixture: ComponentFixture<DownloadErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});