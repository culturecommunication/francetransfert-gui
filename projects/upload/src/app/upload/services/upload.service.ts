import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Transfer } from '@flowjs/ngx-flow';
import { CookiesManagerService } from '@ft-core';
import { environment as env } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private _httpClient: HttpClient, private _CookiesManager: CookiesManagerService) {}

  sendTree(body: any): any {
    const trMapping = this._mappingTree(body.transfers);
    return this._httpClient
      .post(`${env.host}${env.apis.tree}`, {
        confirmedSenderId: '',
        senderEmail: body.senderMail,
        recipientEmails: body.emails,
        password: body.password,
        message: body.message,
        rootFiles: trMapping.files,
        rootDirs: trMapping.dirs
      })
      .pipe(
        map((response: any) => {
          this._CookiesManager.setItem('senderId', response.senderId);
          return response.enclosureId;
        })
      );
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
}
