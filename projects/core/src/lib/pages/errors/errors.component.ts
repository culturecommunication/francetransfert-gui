import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PAGES } from '../../configuration/errors-pages.config';
import { environment as env } from '../../../../../download/src/environments/environment';
@Component({
  selector: 'lib-errors',
  templateUrl: './errors.component.html'
})
export class ErrorsComponent {
  error: any;
  nbrAllowedDownloads: number;

  constructor(private _activatedRoute: ActivatedRoute) {
    this.error = { ...PAGES.BASIC_404 };
    this.nbrAllowedDownloads = env.nbrOfDownloads;
  }

  ngOnInit() {
    this._activatedRoute.queryParams.pipe(take(1)).subscribe((params: any) => {
      if (params.id && params.type === PAGES.TECHNICAL_ERROR.key) {
        this.error = { ...PAGES.TECHNICAL_ERROR, id: params.id };
      } else if (params.type && PAGES[params.type]) {
        this.error = { ...PAGES[params.type] };
      }
    });
  }

  retourHome() {
    window.location.href = window.location.origin;
  }

  getNbrAllowedDownloads() {
    return this.nbrAllowedDownloads;
  }
}
