import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlComponent } from './ml.component';

describe('MlComponent', () => {
  let component: MlComponent;
  let fixture: ComponentFixture<MlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MlComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MlComponent);
        component = fixture.componentInstance;
      });
  }));

  it(`should create the component`, async(() => {
    expect(component).toBeTruthy();
  }));
});
