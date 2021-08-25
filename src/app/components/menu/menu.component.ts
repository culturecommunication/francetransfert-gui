import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ft-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLink(url) {
    this.router.navigateByUrl(url);
    this.sidenavToggle.emit();
  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
