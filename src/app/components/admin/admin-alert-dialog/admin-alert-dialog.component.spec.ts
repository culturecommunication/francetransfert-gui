import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAlertDialogComponent } from './admin-alert-dialog.component';

describe('AdminAlertDialogComponent', () => {
  let component: AdminAlertDialogComponent;
  let fixture: ComponentFixture<AdminAlertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAlertDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
