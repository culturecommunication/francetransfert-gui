import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadManagerService } from 'src/app/services';

@Component({
  selector: 'ft-check-validation-code',
  templateUrl: './check-validation-code.component.html',
  styleUrls: ['./check-validation-code.component.scss']
})
export class CheckValidationCodeComponent implements OnInit {

  @Input() component: 'upload' | 'download';
  @Input() email: string;
  verificationCodeForm: FormGroup;
  @Output() transferValidated: EventEmitter<boolean> = new EventEmitter();
  @Output() dowloadValidated: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();    
  }

  initForm() {
    this.verificationCodeForm = this.fb.group({
      verificationCode: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.verificationCodeForm.controls; }

  validateForm() {
    // stop here if form is invalid
    if (this.verificationCodeForm.invalid) {
      return;
    }
    if (this.component === 'upload') {
      this.transferValidated.emit(true);
    }
    if (this.component === 'download') {
      this.dowloadValidated.emit(true);
    }
  }

}
