import { Component, OnInit } from '@angular/core';
import { AuteursService } from '../../shared/services/auteurs.service';
import { Observable } from 'rxjs';
import { Auteur } from '../../shared/interfaces/auteur.interface';


@Component({
  selector: 'app-auteurs-liste',
  templateUrl: './auteurs-liste.component.html',
  styleUrls: ['./auteurs-liste.component.css']
})
export class AuteursListeComponent implements OnInit {
  auteursSelectionnes: number[] = []

  auteurs$: Observable<Auteur[]>

  constructor(private auteurService: AuteursService) { }

  ngOnInit() {
    this.auteurs$ = this.auteurService.auteurs$
    this.auteurService.updateListeAuteurs()
  }

  supprimerAuteurs() {
    this.auteursSelectionnes.forEach(idAuteur => {
      this.auteurService.deleteAuteur(idAuteur)
    })
  }

  selectionnerAuteur(id: number) {
    const index = this.auteursSelectionnes.indexOf(id)
    if (index === -1) {
      this.auteursSelectionnes.push(id)
    } else {
      this.auteursSelectionnes.splice(index, 1)
    }
  }
}
