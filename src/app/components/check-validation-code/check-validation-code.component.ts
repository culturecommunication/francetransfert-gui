import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FTErrorModel } from 'src/app/models';
import { DownloadManagerService, UploadManagerService } from 'src/app/services';
import { LoginService } from 'src/app/services/login/login.service';
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
  hide = true;

  buttonDisable = false;

  isLoggedIn = false;

  constructor(private fb: FormBuilder, private uploadManagerService: UploadManagerService,
    private downloadManagerService: DownloadManagerService, private loginService: LoginService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
    this.isLoggedIn = this.loginService.isLoggedIn();
    if (this.component === 'upload' && this.isLoggedIn == true) {
      this.loginService.logout();
    }
    this.errorSubscription = this.uploadManagerService.uploadError$.subscribe(error => {
      if (error) {
        this.error = { statusCode: error.statusCode, message: error.message, codeTryCount: error.codeTryCount };
      }
      this.buttonDisable = false;
    });
    this.errorDLSubscription = this.downloadManagerService.downloadError$.subscribe(error => {
      if (error) {
        this.error = { statusCode: error.statusCode, message: error.message, codeTryCount: error.codeTryCount };
      }
      this.buttonDisable = false;
    });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
    this.errorDLSubscription.unsubscribe();
  }

  initForm() {

    this.verificationCodeForm = this.fb.group({
      verificationCode: ['', [Validators.required]],
      connectCheck: [true, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.verificationCodeForm.controls; }

  validateForm() {
    // stop here if form is invalid
    if (this.verificationCodeForm.invalid) {
      return;
    }
    this.loginService.connectCheck.next(this.verificationCodeForm.get('connectCheck').value);
    if (this.component === 'upload') {
      this.transferValidated.emit(this.verificationCodeForm.get('verificationCode').value);
      this.buttonDisable = true;
    }
    if (this.component === 'download') {
      this.dowloadValidated.emit(this.verificationCodeForm.get('verificationCode').value);
      this.buttonDisable = true;
    }

  }

  backToHome() {
    window.location.reload();
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
