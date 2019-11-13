import { InMemoryDbService } from "angular-in-memory-web-api";

export class DataMockService implements InMemoryDbService {
  createDb() {
    const data: Array<any> = [
      { id: 0, nom: "Lovecraft", prenom: "Howard Phillips" },
      { id: 1, nom: "King", prenom: "Stephen" }
    ];
    return { data };
  }
}
