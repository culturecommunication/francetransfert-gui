import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Transfer } from '@flowjs/ngx-flow';
import { PopUpService, CODE_CONFIRMATION, CookiesManagerService, MAIL_COOKIES } from '@ft-core';
import { environment as env } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private _httpClient: HttpClient,
    private _popUpService: PopUpService,
    private cookiesManager: CookiesManagerService
  ) {}

  sendTree(body: any): any {
    const trMapping = this._mappingTree(body.transfers);
    this._setSuggestionsEmails([...body.emails]);
    const treeBody = {
      confirmedSenderId: '',
      senderEmail: body.senderMail,
      recipientEmails: body.emails,
      password: body.password,
      message: body.message,
      rootFiles: trMapping.files,
      rootDirs: trMapping.dirs
    };
    return this._httpClient.post(`${env.host}${env.apis.tree}`, treeBody).pipe(
      map((response: any) => {
        return response ? response : this._popUpService.openModal(CODE_CONFIRMATION(treeBody.senderEmail));
      })
    );
  }

  validateCode(body: any): any {
    const trMapping = this._mappingTree(body.transfers);
    const treeBody = {
      confirmedSenderId: '',
      senderEmail: body.senderMail,
      recipientEmails: body.emails,
      password: body.password,
      message: body.message,
      rootFiles: trMapping.files,
      rootDirs: trMapping.dirs
    };
    return this._httpClient.post(
      `${env.host}${env.apis.confirmationCode}?code=${body.code}&senderMail=${body.senderMail}`,
      treeBody
    );
  }

  rate(body: any): any {
    return this._httpClient.post(`${env.host}${env.apis.rate}`, {
      mailAdress: body.mail,
      message: body.message,
      satisfaction: body.satisfaction
    });
  }

  private _mappingTree(transfers: Array<any>) {
    let data = { files: [], dirs: [], totalSize: 0 };
    transfers = transfers.map((transfer: Transfer) => ({
      name: transfer.name,
      path:
        transfer.flowFile.relativePath.split('/').length === 1
          ? ''
          : transfer.flowFile.relativePath.replace(`/${transfer.flowFile.name}`, ''),
      fid: transfer.id,
      size: transfer.size
    }));

    for (let transfer of transfers) {
      this._rec(data, transfer);
    }
    return data;
  }

  private _rec(data: any, file: any) {
    if (file.path.length === 0) {
      data.files.push({ name: file.name, size: file.size, fid: file.fid });
    } else {
      const parent = file.path.split('/')[0];
      file.path = file.path.replace(`${parent}/`, '');
      file.path = file.path.replace(`${parent}`, '');
      if (this._dirIndex(data.dirs, parent) !== -1) {
        data.dirs[this._dirIndex(data.dirs, parent)].totalSize =
          data.dirs[this._dirIndex(data.dirs, parent)].totalSize + file.size;
        this._rec(data.dirs[this._dirIndex(data.dirs, parent)], file);
      } else {
        const index =
          data.dirs.push({
            name: parent,
            files: [],
            dirs: [],
            totalSize: file.size
          }) - 1;
        this._rec(data.dirs[index], file);
      }
    }
  }

  private _dirIndex(tab: Array<any>, name: string): number {
    return tab.findIndex(dir => dir.name == name);
  }

  private _setSuggestionsEmails(emails: Array<string>) {
    if (this.cookiesManager.isConsented()) {
      let currentEmails = JSON.parse(localStorage.getItem(MAIL_COOKIES))
        ? JSON.parse(localStorage.getItem(MAIL_COOKIES))
        : [];
      for (let email of emails) {
        if (currentEmails.findIndex(cemail => cemail.toUpperCase() === email.toUpperCase()) === -1) {
          currentEmails.push(email);
        }
      }
      localStorage.setItem(MAIL_COOKIES, JSON.stringify(currentEmails));
    }
  }
}
