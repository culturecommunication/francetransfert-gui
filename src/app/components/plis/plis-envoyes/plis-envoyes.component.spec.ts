import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlisEnvoyesComponent } from './plis-envoyes.component';

describe('PlisEnvoyesComponent', () => {
  let component: PlisEnvoyesComponent;
  let fixture: ComponentFixture<PlisEnvoyesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlisEnvoyesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlisEnvoyesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
