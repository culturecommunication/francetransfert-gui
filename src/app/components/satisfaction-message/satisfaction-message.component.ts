import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'ft-satisfaction-message',
  templateUrl: './satisfaction-message.component.html',
  styleUrls: ['./satisfaction-message.component.scss']
})
export class SatisfactionMessageComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }


}
