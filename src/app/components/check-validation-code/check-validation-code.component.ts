import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FTErrorModel } from 'src/app/models';
import { DownloadManagerService, UploadManagerService } from 'src/app/services';
import { ConfirmAlertDialogComponent } from './confirm-alert-dialog/confirm-alert-dialog.component';

@Component({
  selector: 'ft-check-validation-code',
  templateUrl: './check-validation-code.component.html',
  styleUrls: ['./check-validation-code.component.scss']
})
export class CheckValidationCodeComponent implements OnInit, OnDestroy {

  @Input() component: 'upload' | 'download';
  @Input() email: string;
  verificationCodeForm: FormGroup;
  @Output() transferCancelled: EventEmitter<boolean> = new EventEmitter();
  @Output() transferValidated: EventEmitter<string> = new EventEmitter();
  @Output() dowloadValidated: EventEmitter<string> = new EventEmitter();
  errorSubscription: Subscription = new Subscription();
  errorDLSubscription: Subscription = new Subscription();
  error: FTErrorModel;

  constructor(private fb: FormBuilder, private uploadManagerService: UploadManagerService, 
    private downloadManagerService: DownloadManagerService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
    this.errorSubscription = this.uploadManagerService.uploadError$.subscribe(error => {
      if (error) {
        this.error = { statusCode: error.statusCode, message: error.message, codeTryCount: error.codeTryCount };
      }
    });
    this.errorDLSubscription = this.downloadManagerService.downloadError$.subscribe(error => {
      if (error) {
        this.error = { statusCode: error.statusCode, message: error.message, codeTryCount: error.codeTryCount };
      }
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.errorDLSubscription.unsubscribe();
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

  cancel() {
    const dialogRef = this.dialog.open(ConfirmAlertDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transferCancelled.emit(true);
      }
    });    
  }
}
