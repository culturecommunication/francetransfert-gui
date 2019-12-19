import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ERRORS_TYPES } from '../configuration/errors-pages.config';
@Injectable()
export class ErrorsManagerService implements HttpInterceptor {
  constructor(private _router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        map(event => {
          if (event instanceof HttpResponse && event.body && event.body.error) {
            switch (event.body.error.type) {
              case ERRORS_TYPES.TECHNICAL_ERROR.KEY: {
                this._router.navigateByUrl(`${ERRORS_TYPES.TECHNICAL_ERROR.ROUTE}${event.body.error.id}`);
                break;
              }
              case ERRORS_TYPES.NBR_ALLOWED_DOWNLOADS_EXCEEDED.KEY: {
                this._router.navigateByUrl(ERRORS_TYPES.NBR_ALLOWED_DOWNLOADS_EXCEEDED.ROUTE);
                break;
              }
            }
          }
          return event;
        })
      )
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            this._router.navigateByUrl(ERRORS_TYPES.FRONT_ERROR.ROUTE);
          }
          // if (error.status === 500) {
          //   this._router.navigateByUrl(ERRORS_TYPES.BACK_ERROR.ROUTE);
          // }
          return throwError(error);
        })
      );
  }
}
