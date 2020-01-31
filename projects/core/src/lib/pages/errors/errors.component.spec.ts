import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsComponent } from './errors.component';

describe('ErrorsComponent', () => {
  let component: ErrorsComponent;
  let fixture: ComponentFixture<ErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ErrorsComponent);
        component = fixture.componentInstance;
      });
  }));

  it(`should create the component`, async(() => {
    expect(component).toBeTruthy();
  }));
});
