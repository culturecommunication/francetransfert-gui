import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminError$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(private _httpClient: HttpClient) { }

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

  private handleError(operation: string) {
    return (err: any) => {
      const errMsg = `error in ${operation}()`;
      console.log(`${errMsg}:`, err);
      if (err instanceof HttpErrorResponse) {
        this.adminError$.next(err.status);
        console.log(`status: ${err.status}, ${err.statusText}`);
      }
      throw (errMsg);
    };
  }
}
