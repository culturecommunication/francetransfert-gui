import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';

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
  envelopeMailForm: FormGroup;
  @Output() public onFormGroupChange = new EventEmitter<any>();
  envelopeMailFormChangeSubscription: Subscription;
  matcher = new MyErrorStateMatcher();
  destinatairesList: string[] = [];
  regexDomain = new RegExp('^[a-z0-9](\.?[a-z0-9]){3,}@culture\.gouv\.fr$');

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.envelopeMailForm = this.fb.group({
      // from: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9](\.?[a-z0-9]){3,}@culture\.gouv\.fr$')]],
      from: ['', [Validators.required, Validators.email]],
      to: ['', [Validators.email]],
      subject: [''],
      message: ['']
    }, { validator: this.checkEmails });
    this.envelopeMailFormChangeSubscription = this.envelopeMailForm.valueChanges
      .subscribe(() => this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList }));
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeMailForm.controls; }

  onBlurDestinataires() {
    if (this.envelopeMailForm.get('to').value !== '') {
      this.destinatairesList.push(this.envelopeMailForm.get('to').value);
      this.envelopeMailForm.get('to').setValue('');
      this.envelopeMailForm.controls['to'].setErrors(null);
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
      this.envelopeMailForm.controls['to'].setErrors({'required': true});
    }    
  }

}
