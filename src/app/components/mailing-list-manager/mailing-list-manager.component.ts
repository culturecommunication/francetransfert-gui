/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MailingListService } from 'src/app/services';

@Component({
  selector: 'ft-mailing-list-manager',
  templateUrl: './mailing-list-manager.component.html',
  styleUrls: ['./mailing-list-manager.component.scss']
})
export class MailingListManagerComponent implements OnInit {

  file: any;
  errorMessage;

  constructor(private dialogRef: MatDialogRef<MailingListManagerComponent>,
    private mailingListService: MailingListService) { }

  ngOnInit(): void {
    this.errorMessage = '';
  }

  loadMailingListFromLocalStorage() {
    this.dialogRef.close({ event: 'loadMailingListFromLocalStorage', data: this.mailingListService.getMailingList() });
  }

  loadMailingListFromFile(e) {
    this.file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsText(this.file);
    fileReader.onload = (e) => {
      this.parseMailingListFile(fileReader.result);
    }
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
