import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Auteur } from '../modules/auteurs/shared/interfaces/auteur.interface';

export class DataMockService implements InMemoryDbService {

    createDb() {
        const auteurs: Auteur[] = [
            { id: 0, nom: "Lovecraft", prenom: "Howard Phillips" },
            { id: 1, nom: "King", prenom: "Stephen" }
        ]
        return { auteurs }
    }
}