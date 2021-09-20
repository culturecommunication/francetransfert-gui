import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MailingListManagerComponent } from 'src/app/components';
import { MailInfosModel } from 'src/app/models';
import { UploadManagerService } from 'src/app/services';

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
  matcher = new MyErrorStateMatcher();
  destinatairesList: string[] = [];
  regexDomain = new RegExp('^[a-z0-9](\.?[a-z0-9]){3,}@culture\.gouv\.fr$');

  constructor(private fb: FormBuilder,
    private uploadManagerService: UploadManagerService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.envelopeMailForm = this.fb.group({
      // from: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9](\.?[a-z0-9]){3,}@culture\.gouv\.fr$')]],
      from: [this.mailFormValues?.from, [Validators.required, Validators.email]],
      to: [this.mailFormValues?.to, [Validators.email]],
      subject: [this.mailFormValues?.subject],
      message: [this.mailFormValues?.message],
      cguCheck: [this.mailFormValues?.cguCheck, [Validators.requiredTrue]]
    }, { validator: this.checkEmails });
    this.envelopeMailFormChangeSubscription = this.envelopeMailForm.valueChanges
      .subscribe(() => {
        this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList })
        this.uploadManagerService.envelopeInfos.next({ type: 'mail', ...this.envelopeMailForm.value });
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
        this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList });
        this.uploadManagerService.envelopeInfos.next({ type: 'mail', ...this.envelopeMailForm.value });
      }
    }
  }

  onBlurDestinataires() {
    if (this.envelopeMailForm.get('to').value && !this.envelopeMailForm.get('to').hasError('email')) {
      let found = this.destinatairesList.find(o => o === this.envelopeMailForm.get('to').value);
      if (!found) {
        if (this.destinatairesList.length < 100) {
          this.destinatairesList.push(this.envelopeMailForm.get('to').value.toLowerCase());
          this.envelopeMailForm.get('to').setValue('');
          this.envelopeMailForm.controls['to'].setErrors(null);
        }
      }
    }
  }

  checkEmails: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let from = group.get('from').value;
    let destListOk = true;
    this.destinatairesList.forEach(dest => {
      if (!this.regexDomain.test(dest)) {
        destListOk = false;
      }
    });
    return ((this.destinatairesList.length > 0 && (this.regexDomain.test(from) || destListOk)) ? null : { notValid: true })
  }

  ngOnDestroy() {
    this.envelopeMailFormChangeSubscription.unsubscribe();
  }

  checkDestinatairesList(): boolean {
    let destListOk = true;
    this.destinatairesList.forEach(dest => {
      if (!this.regexDomain.test(dest)) {
        destListOk = false;
      }
    });
    return destListOk;
  }

  deleteDestinataire(index) {
    this.destinatairesList.splice(index, 1);
    this.envelopeMailForm.get('to').setValue('');
    if (this.destinatairesList.length === 0) {
      this.envelopeMailForm.controls['to'].setErrors({ 'required': true });
    }
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
          this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList })
          this.uploadManagerService.envelopeInfos.next({ type: 'mail', ...this.envelopeMailForm.value });
        }
        if (result.event === 'loadMailingListFromFile') {
          this.destinatairesList = result.data;
          this.checkDestinatairesList();
          this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList })
          this.uploadManagerService.envelopeInfos.next({ type: 'mail', ...this.envelopeMailForm.value });
        }
      }
    });
  }

}
