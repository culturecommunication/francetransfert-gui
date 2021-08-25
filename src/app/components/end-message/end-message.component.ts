import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ft-end-message',
  templateUrl: './end-message.component.html',
  styleUrls: ['./end-message.component.scss']
})
export class EndMessageComponent implements OnInit {

  @Input() component: 'upload' | 'download';
  availabilityDate: Date;

  constructor() { }

  ngOnInit(): void {
    this.availabilityDate = new Date();
    this.availabilityDate.setDate( this.availabilityDate.getDate() + 7 );
  }

}
