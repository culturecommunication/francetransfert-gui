import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs';
import { UploadInfosModel } from 'src/app/models';
import { TokenModel } from 'src/app/models/token.model';
import { environment } from 'src/environments/environment';
import { UploadManagerService } from '../upload-manager/upload-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient,
    private uploadManagerService: UploadManagerService) { }

  logout(): any {
    this.uploadManagerService.tokenInfo.next(null);
  }


  validateCode(body: any): any {
    return this._httpClient.get(
      `${environment.host}${environment.apis.upload.validateCode}?code=${body.code}&senderMail=${body.senderMail}`
    ).pipe(map((response: TokenModel) => {
      this.uploadManagerService.tokenInfo.next({
        senderEmail: response.senderEmail,
        senderId: response.senderId,
        senderToken: response.senderToken
      });
      return response;
    }),
      catchError(this.handleError('validateCode'))
    );
  }

  generateCode(body: any): any {
    return this._httpClient.get(
      `${environment.host}${environment.apis.upload.generateCode}?senderMail=${body.senderMail}`
    ).pipe(map((response: TokenModel) => {
      this.uploadManagerService.tokenInfo.next(null);
      return response;
    }),
      catchError(this.handleError('generateCode'))
    );
  }

  private handleError(operation: string) {
    return (err: any) => {
      const errMsg = `error in ${operation}()`;
      if (err instanceof HttpErrorResponse) {
        this.uploadManagerService.uploadError$.next({ statusCode: err.status, ...(err.message && !err.error.type) ? { message: err.message } : { message: err.error.type }, ...err.error.codeTryCount ? { codeTryCount: err.error.codeTryCount } : {} });
      }
      throw (errMsg);
    };
  }
}
