import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { of } from 'rxjs';
import { RESPONSE_DOWNLOAD } from '../mock/mock';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private _httpClient: HttpClient) {}

  getDownloadInfos(params: Array<{ string: string }>) {
    return of(RESPONSE_DOWNLOAD); /** Juste pour tester */
    return this._httpClient.get(
      `${env.host}${env.apis.download}?enclosure=${params['enclosure']}&recipient=${params['recipient']}&token=${params['token']}`
    );
  }
  getDownloadUrl(params: Array<{ string: string }>, withPassword: boolean, password: string) {
    return (window.location.href = 'https://go.skype.com/windows.desktop.download'); /** Juste pour tester */
    return this._httpClient.get(
      `${env.host}${env.apis.download}?enclosure=${params['enclosure']}&recipient=${params['recipient']}&token=${
        params['token']
      }${withPassword ? '&password=' + password : ''}`
    );
  }
}
