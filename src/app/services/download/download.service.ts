import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private _httpClient: HttpClient) { }

  getDownloadInfos(params: Array<{ string: string }>) {
    return this._httpClient.get(
      `${environment.host}${environment.apis.download.download}?enclosure=${params['enclosure']}&recipient=${params['recipient']}&token=${params['token']}`
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
    );
  }

  rate(body: any): any {
    return this._httpClient.post(`${environment.host}${environment.apis.download.rate}`, {
      mailAdress: body.mail,
      message: body.message,
      satisfaction: body.satisfaction
    });
  }
}
