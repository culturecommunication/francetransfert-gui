import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ft-end-message',
  templateUrl: './end-message.component.html',
  styleUrls: ['./end-message.component.scss']
})
export class EndMessageComponent implements OnInit {

  @Input() component: 'upload' | 'download';
  @Input() availabilityDate: Date
  @Output() backToHomeEvent: EventEmitter<any> = new EventEmitter();

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  backToHome(from: string) {
    if (from === 'upload') {
      this.backToHomeEvent.emit();
    } else {
      this._router.navigate(['/upload']);
    }
  }

}
