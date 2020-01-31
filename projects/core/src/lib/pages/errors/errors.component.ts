import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGES } from '../../configuration/errors-pages.config';
@Component({
  selector: 'lib-errors',
  templateUrl: './errors.component.html'
})
export class ErrorsComponent {
  error: any;
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.error = { ...PAGES.BASIC_404 };
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
    this._router.navigateByUrl('/'); /** TODO:Redirect to Upload */
  }
}
