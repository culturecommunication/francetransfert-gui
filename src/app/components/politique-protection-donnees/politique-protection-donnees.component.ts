import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ft-politique-protection-donnees',
  templateUrl: './politique-protection-donnees.component.html',
  styleUrls: ['./politique-protection-donnees.component.scss']
})
export class PolitiqueProtectionDonneesComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('France transfert - Politique de protection des données');
  }

}
