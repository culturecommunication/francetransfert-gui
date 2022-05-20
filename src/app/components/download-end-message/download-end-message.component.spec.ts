import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadEndMessageComponent } from './download-end-message.component';

describe('DownloadEndMessageComponent', () => {
  let component: DownloadEndMessageComponent;
  let fixture: ComponentFixture<DownloadEndMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadEndMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadEndMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
