import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEndMsgComponent } from './admin-end-msg.component';

describe('AdminEndMsgComponent', () => {
  let component: AdminEndMsgComponent;
  let fixture: ComponentFixture<AdminEndMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEndMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEndMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});