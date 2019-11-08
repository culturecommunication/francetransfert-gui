import { TestBed, async } from "@angular/core/testing";
import { AuteursService } from 'src/app/modules/auteurs/shared/services/auteurs.service';
import { Auteur } from 'src/app/modules/auteurs/shared/interfaces/auteur.interface';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataMockService } from 'src/app/mocks/data-mock.service';

describe('AuteursService', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [AuteursService],
            imports: [
                HttpClientModule,
                HttpClientInMemoryWebApiModule.forRoot(DataMockService),
            ]
        })
    }))

    /**
     * Tester la création du service.
     */
    it('should be created', () => {
        const auteursService = TestBed.get(AuteursService);
        expect(auteursService).toBeTruthy();
    });

    /**
     * Tester l'ajout d'un auteur
     */
    it('Ajouter un auteur', async(() => {
        const auteursService = TestBed.get(AuteursService);

        const id = 44
        const nom = 'Asimov'
        const prenom = 'Isaac'
        const auteur: Auteur = { id: id, nom: nom, prenom: prenom }

        auteursService.addAuteur(auteur).subscribe(() => {
            auteursService.getAuteurs().subscribe((auteurs) => {
                expect(auteurs).toContain(auteur)
            })
        })
    }))

    /**
     * Tester la suppression d'un auteur
     */
    it('Supprimer un auteur', async(() => {
        const auteursService = TestBed.get(AuteursService);

        const id = 44
        const nom = 'Asimov'
        const prenom = 'Isaac'
        const auteur: Auteur = { id: id, nom: nom, prenom: prenom }

        auteursService.addAuteur(auteur).subscribe(() => {
            console.log('ADD OK')
        })

        auteursService.deleteAuteur(44)
        console.log('DELETE OK')

        auteursService.getAuteurs().subscribe((auteurs) => {
            expect(auteurs).not.toContain(auteur)
            console.log('VERIFY OK')
        })

    }))
})