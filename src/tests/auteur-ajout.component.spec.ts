import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuteurAjoutComponent } from '../app/modules/auteurs/components/auteur-ajout/auteur-ajout.component';
import { MaterialModule } from '../app/material.module';
import { AuteursService } from '../app/modules/auteurs/shared/services/auteurs.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataMockService } from '../app/mocks/data-mock.service';

describe('AuteurAjoutComponent', () => {
  let component: AuteurAjoutComponent;
  let fixture: ComponentFixture<AuteurAjoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuteurAjoutComponent],

      imports: [MaterialModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(DataMockService)
      ],

      providers: [
        AuteursService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuteurAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
