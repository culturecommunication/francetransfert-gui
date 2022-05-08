import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'ft-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();
  @Output() routingCalled: EventEmitter<boolean> = new EventEmitter();

  constructor(private _router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  goToLink(url) {
    this._router.navigate([url]);
    this.sidenavToggle.emit();
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  logout() {
    this.loginService.logout();
    this._router.navigate(['/upload']);
  }

  routeTo(_route) {
    this._router.navigate([_route]);
    this.routingCalled.emit(true);
  }

}
