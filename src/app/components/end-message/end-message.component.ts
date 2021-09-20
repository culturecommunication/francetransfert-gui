import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ft-end-message',
  templateUrl: './end-message.component.html',
  styleUrls: ['./end-message.component.scss']
})
export class EndMessageComponent implements OnInit {

  @Input() component: 'upload' | 'download';
  @Input() availabilityDate: Date;

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  backToHome(from: string) { 
    if (from === 'upload') {
      window.location.reload()
    } else {
      this._router.navigate(['/upload']);
    }    
  }

}
