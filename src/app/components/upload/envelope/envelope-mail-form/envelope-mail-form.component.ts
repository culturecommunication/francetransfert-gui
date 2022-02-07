import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { MailingListManagerComponent } from 'src/app/components';
import { MailInfosModel } from 'src/app/models';
import { UploadManagerService, UploadService } from 'src/app/services';
import { saveAs } from 'file-saver';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return control.touched && (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'ft-envelope-mail-form',
  templateUrl: './envelope-mail-form.component.html',
  styleUrls: ['./envelope-mail-form.component.scss']
})
export class EnvelopeMailFormComponent implements OnInit, OnDestroy {
  @Input() mailFormValues: MailInfosModel;
  envelopeMailForm: FormGroup;
  @Output() public onFormGroupChange = new EventEmitter<any>();
  envelopeMailFormChangeSubscription: Subscription;
  senderSubscription: Subscription;
  matcher = new MyErrorStateMatcher();
  destinatairesList: string[] = [];
  destListOk = false;
  senderOk = false;
  errorEmail = false;

  constructor(private fb: FormBuilder,
    private uploadManagerService: UploadManagerService,
    private uploadService: UploadService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.envelopeMailForm = this.fb.group({
      from: [this.mailFormValues?.from, { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
      to: [this.mailFormValues?.to, { validators: [Validators.email], updateOn: 'blur' }],
      subject: [this.mailFormValues?.subject],
      message: [this.mailFormValues?.message],
      cguCheck: [this.mailFormValues?.cguCheck, [Validators.requiredTrue]]
    });
    this.senderSubscription = this.envelopeMailForm.get('from').valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.checkSenderMail();
    })
    this.envelopeMailFormChangeSubscription = this.envelopeMailForm.valueChanges
      .subscribe(() => {
        this.checkDestinatairesList();
        this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList })
        this.uploadManagerService.envelopeInfos.next({ type: 'mail', ...this.envelopeMailForm.value, ...this.uploadManagerService.envelopeInfos.getValue()?.parameters ? { parameters: this.uploadManagerService.envelopeInfos.getValue().parameters } : {} });
      });
    this.reloadDestinataires();
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeMailForm.controls; }

  reloadDestinataires() {
    if (this.envelopeMailForm.get('to').value) {
      let tmp = this.envelopeMailForm.get('to').value.toString().split(',');
      if (tmp[0] !== '') {
        this.destinatairesList = tmp;
        this.envelopeMailForm.get('to').setValue('');
        this.envelopeMailForm.markAllAsTouched();
        this.envelopeMailForm.markAsDirty();
        this.checkDestinatairesList();
        this.envelopeMailForm.updateValueAndValidity();
        this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList })
      }
    }
  }

  onBlurDestinataires() {
    this.errorEmail = false;
    let error = this.envelopeMailForm.controls['to'].errors;
    if (this.envelopeMailForm.get('to').value && !this.envelopeMailForm.get('to').hasError('email')) {
      let found = this.destinatairesList.find(o => o === this.envelopeMailForm.get('to').value);
      if (!found) {
        if (this.destinatairesList.length < 100) {
          this.destinatairesList.push(this.envelopeMailForm.get('to').value.toLowerCase());
          this.envelopeMailForm.get('to').setValue('');
          this.envelopeMailForm.controls['to'].setErrors(null);
        }
      }
    } else {
      //this.envelopeMailForm.get('to').setValue('');
      this.envelopeMailForm.controls['to'].setErrors(error);
      if (error) {
        this.errorEmail = true;
      }
    }
    this.checkDestinatairesList();
  }

  ngOnDestroy() {
    this.envelopeMailFormChangeSubscription.unsubscribe();
    this.senderSubscription.unsubscribe();
  }

  checkDestinatairesList() {
    let destListOk = false;
    let senderOk = false;
    this.uploadService.validateMail(this.destinatairesList).pipe(
      take(1)).subscribe((isValid: boolean) => {
        destListOk = isValid;
        this.uploadService.validateMail([this.envelopeMailForm.get('from').value]).pipe(
          take(1)).subscribe((isValid: boolean) => {
            senderOk = isValid;
            if (this.destinatairesList.length > 0) {
              if (destListOk || senderOk) {
                if (this.errorEmail) {
                  this.envelopeMailForm.controls['to'].markAsTouched();
                  this.envelopeMailForm.controls['to'].setErrors({ email: this.errorEmail });
                } else {
                  this.envelopeMailForm.controls['to'].markAsUntouched();
                  this.envelopeMailForm.controls['to'].setErrors(null);
                }
              } else {
                this.envelopeMailForm.controls['to'].markAsTouched();
                this.envelopeMailForm.controls['to'].setErrors({ notValid: true });
              }
            } else {
              this.envelopeMailForm.controls['to'].markAsTouched();
              if (!this.errorEmail) {
                this.envelopeMailForm.controls['to'].setErrors({ required: true });
              } else {
                this.envelopeMailForm.controls['to'].setErrors({ email: this.errorEmail });
              }
            }
            this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList });
          }, error => {
            this.envelopeMailForm.controls['to'].markAsTouched();
            if (this.envelopeMailForm.get('to').hasError('email')) {
              this.envelopeMailForm.controls['to'].setErrors({ email: true });
            } else {
              this.envelopeMailForm.controls['to'].setErrors({ notValid: true });
            }
            this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList });
          });
      }, error => {
        this.envelopeMailForm.controls['to'].markAsTouched();
        if (this.envelopeMailForm.get('to').hasError('email')) {
          this.envelopeMailForm.controls['to'].setErrors({ email: true });
        } else {
          this.envelopeMailForm.controls['to'].setErrors({ notValid: true });
        }
        this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList });
      });

  }

  deleteDestinataire(index) {
    this.destinatairesList.splice(index, 1);
    this.checkDestinatairesList();
  }

  routeToInNewWindow(_route) {
    // Converts the route into a string that can be used
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/${_route}`])
    );

    window.open(url, '_blank');
  }

  openMailingListManager() {
    const dialogRef = this.dialog.open(MailingListManagerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event === 'loadMailingListFromLocalStorage') {
          this.destinatairesList = result.data;
          this.checkDestinatairesList();
        }
        if (result.event === 'loadMailingListFromFile') {
          this.destinatairesList = result.data;
          this.checkDestinatairesList();
        }
      }
    });
  }

  checkSenderMail() {
    this.uploadService.allowedSenderMail(this.envelopeMailForm.get('from').value).pipe(take(1))
      .subscribe((isAllowed: boolean) => {
        let error = this.envelopeMailForm.controls['from'].errors;
        if (!isAllowed) {
          if (error == undefined) {
            error = { quota: true };
          } else {
            error['quota'] = true;
          }
          this.envelopeMailForm.controls['from'].markAsTouched();
          this.envelopeMailForm.controls['from'].setErrors(error);
        } else {
          if (error) {
            error['quota'] = false;
          }
          this.envelopeMailForm.controls['from'].markAsTouched();
          this.envelopeMailForm.controls['from'].setErrors(error);
        }
      })
  }

  exportDataCSV() {
    let data = this.destinatairesList;
    let csv = data.join(';');
    var blob = new Blob([csv], { type: 'text/csv' })
    saveAs(blob, "listeDestinataires.csv");
  }

}
