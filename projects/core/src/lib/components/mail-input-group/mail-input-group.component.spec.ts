import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { MailInputGroupComponent } from './mail-input-group.component';

describe('MailInputGroupComponent', () => {
  let component: MailInputGroupComponent;
  let fixture: ComponentFixture<MailInputGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailInputGroupComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
