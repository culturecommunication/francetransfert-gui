import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponent } from './faq.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FaqComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(FaqComponent);
        component = fixture.componentInstance;
      });
  }));

  it(`should create the component`, async(() => {
    expect(component).toBeTruthy();
  }));
});
