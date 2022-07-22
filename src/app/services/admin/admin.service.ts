/*
  * Copyright (c) Ministère de la Culture (2022)
  *
  * SPDX-License-Identifier: MIT
  * License-Filename: LICENSE.txt
  */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { PliDestinataires } from 'src/app/models/pli-destinataires.model';
import { TokenModel } from 'src/app/models/token.model';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminError$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  currentDestinatairesInfo: BehaviorSubject<PliDestinataires> = new BehaviorSubject<PliDestinataires>(null);

  constructor(private _httpClient: HttpClient,
    private loginService: LoginService) { }

  getFileInfosConnect(body: any, enclosureId: string): Observable<any> {
    const treeBody = {
      senderMail: body.senderMail,
      senderToken: body.senderToken,
    };
    return this._httpClient.post(
      `${environment.host}${environment.apis.admin.fileInfosConnect}?enclosure=${enclosureId}`,
      treeBody
    ).pipe(map(response => {
      this.adminError$.next(null);
      return response;
    }),
      catchError(this.handleError('file-info-connect'))
    );
  }


  getPlisSent(body: any): Observable<any> {
    const treeBody = {
      senderMail: body.senderMail,
      senderToken: body.senderToken,
    };
    return this._httpClient.post(
      `${environment.host}${environment.apis.admin.getPlisSent}`,
      treeBody
    ).pipe(map((response) => {
      return response;
    }),
      catchError(this.handleError('get-plis-sent'))
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

  deleteFile(body) {

    return this._httpClient.post(
      `${environment.host}${environment.apis.admin.deleteFile}`,
      body
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
      token: body.token,
      senderMail: body.senderMail,
    }).pipe(map(response => {
      this.adminError$.next(null);
      return response;
    }),
      catchError(this.handleError('update-expired-date'))
    );
  }

  resendLink(body) {
    return this._httpClient.post(`${environment.host}${environment.apis.admin.resendLink}`, {
      enclosureId: body.enclosureId,
      token: body.token,
      newRecipient: body.recipient,
      senderMail: body.senderMail,
    }).pipe(map(response => {
      this.adminError$.next(null);
      return response;
    }),
      catchError(this.handleError('resend-Link'))
    );

  }


  addNewRecipient(body) {
    return this._httpClient.post(`${environment.host}${environment.apis.admin.addNewRecipient}`, {
      enclosureId: body.enclosureId,
      token: body.token,
      newRecipient: body.newRecipient,
      senderMail: body.senderMail,
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
      newRecipient: body.newRecipient,
      senderMail: body.senderMail,
    }).pipe(map(response => {
      this.adminError$.next(null);
      return response;
    }),
      catchError(this.handleError('delete-Recipient'))
    );
  }

  getPlisReceived(body: any): Observable<any> {
    const treeBody = {
      senderMail: body.receiverMail,
      senderToken: body.senderToken,
    };
    return this._httpClient.post(
      `${environment.host}${environment.apis.admin.getPlisReceived}`,
      treeBody
    ).pipe(map((response) => {
      return response;
    }),
      catchError(this.handleError('get-plis-received'))
    );
  }

  setDestinatairesList(destinatairesData) {
      this.currentDestinatairesInfo.next({
        destinataires: destinatairesData.destinataires,
      });
  }

  cleanDestinatairesList() {
    this.currentDestinatairesInfo.next(null);
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
