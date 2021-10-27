import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadElementsComponent } from './download-elements.component';

describe('DownloadElementsComponent', () => {
  let component: DownloadElementsComponent;
  let fixture: ComponentFixture<DownloadElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
