import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PopUpComponent } from '../components/pop-up/pop-up.component';
@Injectable({
  providedIn: 'root'
})
export class PopUpService {
  constructor(public dialog: MatDialog) {}

  openModal(config: any): any {
    return this.dialog.open(PopUpComponent, config);
  }
}
