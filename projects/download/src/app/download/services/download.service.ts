import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(private _httpClient: HttpClient) {}

  getDownloadInfos(params: Array<{ string: string }>) {
    return this._httpClient.get(
      `${env.host}${env.apis.download}?enclosure=${params['enclosure']}&recipient=${params['recipient']}&token=${params['token']}`
    );
  }

  getDownloadUrl(params: Array<{ string: string }>, withPassword: boolean, password: string): Observable<any> {
    var escapedPassword = '';
    if (withPassword) {
      escapedPassword = encodeURIComponent(password);
    }
    return this._httpClient.get(
      `${env.host}${env.apis.downloadUrl}?enclosure=${params['enclosure']}&recipient=${params['recipient']}&token=${
        params['token']
      }&password=${withPassword ? escapedPassword : ''}`
    );
  }

  rate(body: any): any {
    return this._httpClient.post(`${env.host}${env.apis.rate}`, {
      mailAdress: body.mail,
      message: body.message,
      satisfaction: body.satisfaction
    });
  }
}
