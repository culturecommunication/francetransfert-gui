import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ft-end-message',
  templateUrl: './end-message.component.html',
  styleUrls: ['./end-message.component.scss']
})
export class EndMessageComponent implements OnInit {

  @Input() component: 'upload' | 'download';
  @Input() availabilityDays: number;
  availabilityDate: Date;

  constructor() { }

  ngOnInit(): void {
    console.log(this.availabilityDays)
    this.availabilityDate = new Date();
    this.availabilityDate.setDate( this.availabilityDate.getDate() + this.availabilityDays );
    console.log(this.availabilityDate)
  }

}
