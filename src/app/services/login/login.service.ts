import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, BehaviorSubject } from 'rxjs';
import { TokenModel } from 'src/app/models/token.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  tokenInfo: BehaviorSubject<TokenModel> = new BehaviorSubject<any>(null);

  constructor(private _httpClient: HttpClient) { }

  logout(): any {
    this.tokenInfo.next(null);
  }

  validateCode(body: any): any {
    return this._httpClient.get(
      `${environment.host}${environment.apis.upload.validateCode}?code=${body.code}&senderMail=${body.senderMail}`
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

  generateCode(email: any): any {
    return this._httpClient.get(
      `${environment.host}${environment.apis.upload.generateCode}?senderMail=${email}`
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
