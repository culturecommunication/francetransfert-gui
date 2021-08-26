import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ft-satisfaction-check',
  templateUrl: './satisfaction-check.component.html',
  styleUrls: ['./satisfaction-check.component.scss']
})
export class SatisfactionCheckComponent implements OnInit {
  satisfactionCheckForm: FormGroup;
  selectedFace: 'dissatisfied' | 'neutral' | 'satisfied' | '';
  @Output() satisfactionCheckDone: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.selectedFace = '';
    this.satisfactionCheckForm = this.fb.group({
      message: [''],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.satisfactionCheckForm.controls; }

  validateForm() {
    // stop here if form is invalid
    if (this.satisfactionCheckForm.invalid) {
      return;
    }
    let faceValue;
    switch(this.selectedFace) {
      case 'dissatisfied':
        faceValue = 1;
        break;
      case 'neutral':
        faceValue = 2;
        break;
      case 'satisfied':
        faceValue = 4;
        break;
    }
    this.satisfactionCheckDone.emit({ satisfaction: faceValue, message: this.satisfactionCheckForm.get('message').value });
  }

  selectFace(face) {
    this.selectedFace = face;
  }
}
