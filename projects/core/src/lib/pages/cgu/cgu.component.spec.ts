import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CguComponent } from './cgu.component';

describe('CguComponent', () => {
  let component: CguComponent;
  let fixture: ComponentFixture<CguComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CguComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CguComponent);
        component = fixture.componentInstance;
      });
  }));

  it(`should create the component`, async(() => {
    expect(component).toBeTruthy();
  }));
});
