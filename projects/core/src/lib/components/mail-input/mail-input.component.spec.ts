import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MailInputComponent } from './mail-input.component';

describe('MailInputComponent', () => {
  let component: MailInputComponent;
  let fixture: ComponentFixture<MailInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailInputComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
