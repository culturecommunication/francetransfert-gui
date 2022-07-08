/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configError$: BehaviorSubject<number> = new BehaviorSubject<number>(null);


  constructor(private _httpClient: HttpClient) {


  }

  getConfig() {
    return this._httpClient.get(
      `${environment.host}${environment.apis.upload.config}`
    ).pipe(map(response => {
      this.configError$.next(null);
      return response;
    }),
      catchError(this.handleError('getConfig'))
    );
  }

  private handleError(operation: string) {
    return (err: any) => {
      const errMsg = `error in ${operation}()`;
      if (err instanceof HttpErrorResponse) {
        this.configError$.next(err.status);
      }
      throw (errMsg);
    };
  }
}
