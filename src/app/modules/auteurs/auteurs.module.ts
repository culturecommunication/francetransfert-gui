import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuteursListeComponent } from './components/auteurs-liste/auteurs-liste.component';
import { MaterialModule } from 'src/app/material.module';
import { AuteursRoutingModule } from './auteurs-routing.module';
import { AuteursService } from './shared/services/auteurs.service';
import { AuteurAjoutComponent } from './components/auteur-ajout/auteur-ajout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuteursListeComponent, AuteurAjoutComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    AuteursRoutingModule
  ],
  providers: [
    AuteursService
  ]
})
export class AuteursModule { }
