import { Component, OnInit } from '@angular/core';
import { AuteursService } from '../../shared/services/auteurs.service';
import { Auteur } from '../../shared/interfaces/auteur.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auteur-ajout',
  templateUrl: './auteur-ajout.component.html',
  styleUrls: ['./auteur-ajout.component.css']
})
export class AuteurAjoutComponent implements OnInit {

  auteur: Auteur = { id: -1, nom: '', prenom: '' }

  constructor(
    private auteursService: AuteursService,
    private router: Router) { }

  ngOnInit() {
  }

  /**
   * Ajouter un auteur.
   */
  ajouter(): void {
    this.auteursService.addAuteur(this.auteur).subscribe(() => {
      this.router.navigate(['/auteurs']);
    },
      (error) => {
        console.error(error)
      })
  }

}
