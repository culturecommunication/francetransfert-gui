import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UploadManagerService } from 'src/app/services';

@Component({
  selector: 'ft-check-validation-code',
  templateUrl: './check-validation-code.component.html',
  styleUrls: ['./check-validation-code.component.scss']
})
export class CheckValidationCodeComponent implements OnInit, OnDestroy {

  @Input() component: 'upload' | 'download';
  @Input() email: string;
  verificationCodeForm: FormGroup;
  @Output() transferValidated: EventEmitter<string> = new EventEmitter();
  @Output() dowloadValidated: EventEmitter<string> = new EventEmitter();
  errorSubscription: Subscription = new Subscription();
  errorCode: number;

  constructor(private fb: FormBuilder, private uploadManagerService: UploadManagerService) { }

  ngOnInit(): void {
    this.initForm();
    this.errorSubscription = this.uploadManagerService.uploadError$.subscribe(error => {
      if (error) {
        this.errorCode = error;
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
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
      this.transferValidated.emit(this.verificationCodeForm.get('verificationCode').value);
    }
    if (this.component === 'download') {
      this.dowloadValidated.emit(this.verificationCodeForm.get('verificationCode').value);
    }
  }

}
