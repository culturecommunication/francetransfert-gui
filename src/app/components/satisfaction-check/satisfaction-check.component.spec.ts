import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionCheckComponent } from './satisfaction-check.component';

describe('SatisfactionCheckComponent', () => {
  let component: SatisfactionCheckComponent;
  let fixture: ComponentFixture<SatisfactionCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SatisfactionCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SatisfactionCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
