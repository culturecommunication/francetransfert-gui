import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { TokenModel } from 'src/app/models/token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminError$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  tokenInfo: BehaviorSubject<TokenModel> = new BehaviorSubject<any>(null);

  constructor(private _httpClient: HttpClient) { }


  getPlisSent(email: any): any {
    console.log("getpli")
    return this._httpClient.get(
      `${environment.host}${environment.apis.admin.getPlisSent}?senderMail=${email}`
    ).pipe(map((response: TokenModel) => {
      this.tokenInfo.next(null);
      return response;
    }),
      catchError(this.handleError('getPlisSent'))
    );
  }


  getFileInfos(params: Array<{ string: string }>) {
    return this._httpClient.get(
      `${environment.host}${environment.apis.admin.fileInfos}?enclosure=${params['enclosure']}&token=${params['token']}`
    ).pipe(map(response => {
      this.adminError$.next(null);
      return response;
    }),
      catchError(this.handleError('file-info'))
    );
  }

  deleteFile(params: Array<{ string: string }>) {
    return this._httpClient.get(
      `${environment.host}${environment.apis.admin.deleteFile}?enclosure=${params['enclosure']}&token=${params['token']}`
    ).pipe(map(response => {
      this.adminError$.next(null);
      return response;
    }),
      catchError(this.handleError('delete-file'))
    );
  }

  updateExpiredDate(body: any): any {
    return this._httpClient.post(`${environment.host}${environment.apis.admin.updateExpiredDate}`, {
      enclosureId: body.enclosureId,
      newDate: body.newDate,
      token: body.token
    }).pipe(map(response => {
      this.adminError$.next(null);
      return response;
    }),
      catchError(this.handleError('update-expired-date'))
    );
  }

  addNewRecipient(body) {
    return this._httpClient.post(`${environment.host}${environment.apis.admin.addNewRecipient}`, {
      enclosureId: body.enclosureId,
      token: body.token,
      newRecipient: body.newRecipient
    }).pipe(map(response => {
        this.adminError$.next(null);
        return response;
      }),
      catchError(this.handleError('add-new-Recipient'))
    );
  }

  deleteRecipient(body) {
    return this._httpClient.post(`${environment.host}${environment.apis.admin.deleteRecipient}`, {
      enclosureId: body.enclosureId,
      token: body.token,
      newRecipient: body.newRecipient
    }).pipe(map(response => {
        this.adminError$.next(null);
        return response;
      }),
      catchError(this.handleError('delete-Recipient'))
    );
  }

  private handleError(operation: string) {
    return (err: any) => {
      const errMsg = `error in ${operation}()`;
      if (err instanceof HttpErrorResponse) {
        this.adminError$.next(err.status);
      }
      throw (errMsg);
    };
  }
}
