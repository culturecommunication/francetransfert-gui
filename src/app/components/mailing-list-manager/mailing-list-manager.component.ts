/*
  * Copyright (c) Ministère de la Culture (2022)
  *
  * SPDX-License-Identifier: MIT
  * License-Filename: LICENSE.txt
  */

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MailingListService } from 'src/app/services';
import { DestinatairesEndMessageComponent } from '../destinataires-end-message/destinataires-end-message.component';

@Component({
  selector: 'ft-mailing-list-manager',
  templateUrl: './mailing-list-manager.component.html',
  styleUrls: ['./mailing-list-manager.component.scss']
})
export class MailingListManagerComponent implements OnInit {

  file: any;
  errorMessage;

  constructor(private dialogRef: MatDialogRef<MailingListManagerComponent>,
    private mailingListService: MailingListService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.errorMessage = '';
  }

  loadMailingListFromLocalStorage() {
    this.dialogRef.close({ event: 'loadMailingListFromLocalStorage', data: this.mailingListService.getMailingList() });
  }

  loadMailingListFromFile(e) {
    console.log("test")
    this.file = e.target.files[0];
    if(e.target.files[0].type.startsWith("text/")){
      let fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onload = (e) => {
        this.parseMailingListFile(fileReader.result);
      }
    }
    else{
      this.openSnackBar(4000);
      this.dialogRef.close({ event: 'loadMailingListFromFile' });
      }

  }

  openSnackBar(duration: number) {
    this._snackBar.openFromComponent(DestinatairesEndMessageComponent, {
      duration: duration
    });
  }

  private parseMailingListFile(_data) {
    if (_data.includes(';')) {
      let splittedData = _data.replace(/\s/g, '').split(';');
      this.dialogRef.close({ event: 'loadMailingListFromFile', data: splittedData });
    } else {
      this.errorMessage = 'Le fichier importé est invalide.'
    }
  }

}
