import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ft-accessibilite',
  templateUrl: './accessibilite.component.html',
  styleUrls: ['./accessibilite.component.scss']
})
export class AccessibiliteComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('France transfert - Accessibilité');
  }

}
