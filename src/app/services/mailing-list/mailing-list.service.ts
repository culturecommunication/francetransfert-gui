import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailingListService {

  constructor() { }

  storeMailingList(_mailingList: Array<string>) {
    localStorage.setItem('ft-mailing-list', JSON.stringify(_mailingList));
  }

  getMailingList(): Array<string> {
    return JSON.parse(localStorage.getItem('ft-mailing-list'));
  }

  removeMailingList() {
    localStorage.removeItem('ft-mailing-list');
  }
}
