import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuteursListeComponent } from './components/auteurs-liste/auteurs-liste.component';
import { AuteurAjoutComponent } from './components/auteur-ajout/auteur-ajout.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: AuteursListeComponent },
            { path: 'ajouter', component: AuteurAjoutComponent }

        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AuteursRoutingModule { }