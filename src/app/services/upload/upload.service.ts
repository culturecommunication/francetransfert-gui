import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transfer } from '@flowjs/ngx-flow/lib/transfer';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UploadManagerService } from '../upload-manager/upload-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _httpClient: HttpClient,
    private uploadManagerService: UploadManagerService) { }

  sendTree(body: any): any {
    console.log(body)
    const trMapping = this._mappingTree(body.transfers);
    const treeBody = {
      confirmedSenderId: '',
      senderEmail: body.senderMail,
      recipientEmails: body.emails,
      password: body.password,
      message: body.message,
      rootFiles: trMapping.files,
      rootDirs: trMapping.dirs,
      publicLink: body.publicLink,
      expireDelay: body.expiryDays
    };
    return this._httpClient.post(`${environment.host}${environment.apis.upload.tree}`, treeBody).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.handleError('sendTree'))
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
      rootDirs: trMapping.dirs,
      publicLink: body.publicLink,
      expireDelay: body.expiryDays
    };
    return this._httpClient.post(
      `${environment.host}${environment.apis.upload.confirmationCode}?code=${body.code}&senderMail=${body.senderMail}`,
      treeBody
    ).pipe(map(response => {
      return response;
    }),
      catchError(this.handleError('validateCode'))
    );
  }

  rate(body: any): any {
    return this._httpClient.post(`${environment.host}${environment.apis.upload.rate}`, {
      mailAdress: body.mail,
      message: body.message,
      satisfaction: body.satisfaction
    }).pipe(map(response => {
      return response;
    }),
      catchError(this.handleError('rate'))
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

  private handleError(operation: string) {
    return (err: any) => {
      const errMsg = `error in ${operation}()`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        this.uploadManagerService.uploadError$.next(err.status);
        console.log(`status: ${err.status}, ${err.statusText}`);
      }
      throw (errMsg);
    };
  }
}
