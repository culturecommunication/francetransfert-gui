import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpMessageComponent } from './pop-up-message.component';

describe('PopUpMessageComponent', () => {
  let component: PopUpMessageComponent;
  let fixture: ComponentFixture<PopUpMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopUpMessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
