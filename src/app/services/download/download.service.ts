import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { DownloadManagerService } from '../download-manager/download-manager.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private _httpClient: HttpClient, private downloadManagerService: DownloadManagerService) { }

  getDownloadInfos(params: Array<{ string: string }>) {
    return this._httpClient.get(
      `${environment.host}${environment.apis.download.download}?enclosure=${params['enclosure']}&recipient=${params['recipient']}&token=${params['token']}`
    ).pipe(map(response => {
      return response;
    }),
      catchError(this.handleError('download-info'))
    );
  }

  getDownloadUrl(params: Array<{ string: string }>, withPassword: boolean, password: string): Observable<any> {
    var escapedPassword = '';
    if (withPassword) {
      escapedPassword = encodeURIComponent(password);
    }
    return this._httpClient.get(
      `${environment.host}${environment.apis.download.downloadUrl}?enclosure=${params['enclosure']}&recipient=${params['recipient']}&token=${params['token']
      }&password=${withPassword ? escapedPassword : ''}`
    ).pipe(map(response => {
      return response;
    }),
      catchError(this.handleError('generate-download-url'))
    );
  }

  getDownloadInfosPublic(params: Array<{ string: string }>) {
    return this._httpClient.get(
      `${environment.host}${environment.apis.download.downloadInfosPublic}?enclosure=${params['enclosure']}`
    ).pipe(map(response => {
      return response;
    }),
      catchError(this.handleError('download-info-public'))
    );
  }

  getDownloadUrlPublic(params: Array<{ string: string }>, password: string): Observable<any> {
    let escapedPassword = encodeURIComponent(password);
    return this._httpClient.get(
      `${environment.host}${environment.apis.download.downloadUrlPublic}?enclosure=${params['enclosure']}&password=${escapedPassword}`
    ).pipe(map(response => {
      return response;
    }),
      catchError(this.handleError('generate-download-url-public'))
    );
  }

  rate(body: any): any {
    return this._httpClient.post(`${environment.host}${environment.apis.download.rate}`, {
      mailAdress: body.mail,
      message: body.message,
      satisfaction: body.satisfaction
    }).pipe(map(response => {
      return response;
    }),
      catchError(this.handleError('rate'))
    );
  }

  private handleError(operation: string) {
    return (err: any) => {
      const errMsg = `error in ${operation}()`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        this.downloadManagerService.downloadError$.next(err.status);
        console.log(`status: ${err.status}, ${err.statusText}`);
      }
      throw (errMsg);
    };
  }
}
