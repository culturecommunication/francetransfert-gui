/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, BehaviorSubject } from 'rxjs';
import { PliDestinataires } from 'src/app/models/pli-destinataires.model';
import { TokenModel } from 'src/app/models/token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenInfo: BehaviorSubject<TokenModel> = new BehaviorSubject<any>(null);
  connectCheck: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);


  constructor(private _httpClient: HttpClient) { }


  logout(): any {
    this.tokenInfo.next(null);
  }

  validateCode(body: any, currentLanguage: any): any {
    return this._httpClient.get(
      `${environment.host}${environment.apis.upload.validateCode}?code=${body.code}&senderMail=${body.senderMail}&currentLanguage=${currentLanguage}`
    ).pipe(map((response: TokenModel) => {
      this.tokenInfo.next({
        senderMail: response.senderMail,
        senderToken: response.senderToken
      });
      return response;
    }),
      catchError(this.handleError('validateCode'))
    );
  }

  setLogin(loginData) {
    if (this.connectCheck.getValue() == true) {
      this.tokenInfo.next({
        senderMail: loginData.senderMail,
        senderToken: loginData.senderToken
      });
    }
  }


  generateCode(email: any, currentLanguage: any): any {
    return this._httpClient.get(
      `${environment.host}${environment.apis.upload.generateCode}?senderMail=${email}&currentLanguage=${currentLanguage}`
    ).pipe(map((response: TokenModel) => {
      this.tokenInfo.next(null);
      return response;
    }),
      catchError(this.handleError('generateCode'))
    );
  }

  isLoggedIn(): boolean {
    if (this.tokenInfo.getValue() && this.tokenInfo.getValue().senderMail) {
      return true;
    }
    return false;
  }

  getEmail(): string {
    if (this.isLoggedIn()) {
      return this.tokenInfo.getValue().senderMail;
    }
    return "";
  }

  private handleError(operation: string) {
    return (err: any) => {
      throw (err);
    };
  }
}
