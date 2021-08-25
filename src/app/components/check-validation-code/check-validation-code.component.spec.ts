import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckValidationCodeComponent } from './check-validation-code.component';

describe('CheckValidationCodeComponent', () => {
  let component: CheckValidationCodeComponent;
  let fixture: ComponentFixture<CheckValidationCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckValidationCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckValidationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
