import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuteursListeComponent } from '../app/modules/auteurs/components/auteurs-liste/auteurs-liste.component';
import { MaterialModule } from '../app/material.module'
import { AuteursService } from '../app/modules/auteurs/shared/services/auteurs.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataMockService } from '../app/mocks/data-mock.service';
import { Auteur } from 'src/app/modules/auteurs/shared/interfaces/auteur.interface';

describe('AuteursListeComponent', () => {
  let component: AuteursListeComponent;
  let fixture: ComponentFixture<AuteursListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuteursListeComponent],
      imports: [MaterialModule,
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
    fixture = TestBed.createComponent(AuteursListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Supprimer un auteur', () => {
    const auteursService = TestBed.get(AuteursService);
    const resultatAttendu: Auteur = { id: 1, nom: "King", prenom: "Stephen" }

    component.auteursSelectionnes.push(0)
    component.supprimerAuteurs()

    auteursService.getAuteurs().subscribe(auteurs => {
      expect(auteurs).toBeTruthy()
      expect(auteurs.length).toBe(1)
      expect(auteurs[0]).toEqual(resultatAttendu)
    })
  })
});
