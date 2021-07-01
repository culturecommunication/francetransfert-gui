import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-footer',
  template: `
    <div class="ft-footer">
      <div class="footer-column">
        <h6 class="footer-title">francetransfert.culture.gouv.fr</h6>
      </div>
      <div class="footer-column">
        <h6 (click)="goTo('/ml')" class="footer-link" i18n="mentions legales">Mentions légales</h6>
        <h6 (click)="goTo('/cgu')" class="footer-link" i18n="cgu">CGU</h6>
        <h6 (click)="goTo('/faq')" class="footer-link" i18n="cgu">F.A.Q</h6>
        <h6 i18n="copyright">© {{ today | date: 'yyyy' }} Service en bêta test du Ministère de la culture</h6>
      </div>
    </div>
  `
})
export class FooterComponent implements OnInit {
  public today: Date;

  constructor(private router: Router) {
    this.today = new Date();
  }

  ngOnInit() {}

  goTo(event) {
    this.router.navigate([]).then(result => {
      window.open(event, '_blank');
    });
  }
}
