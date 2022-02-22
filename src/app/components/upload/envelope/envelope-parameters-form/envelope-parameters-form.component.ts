import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ParametersModel } from 'src/app/models';
import * as moment from 'moment';
import { UploadManagerService } from 'src/app/services';
import { passwordValidator } from 'src/app/shared/validators/forms-validator';

@Component({
  selector: 'ft-envelope-parameters-form',
  templateUrl: './envelope-parameters-form.component.html',
  styleUrls: ['./envelope-parameters-form.component.scss']
})
export class EnvelopeParametersFormComponent implements OnInit, OnDestroy {
  @Input() parametersFormValues: ParametersModel;
  envelopeParametersForm: FormGroup;
  @Output() public onFormGroupChange = new EventEmitter<any>();
  envelopeParametersFormChangeSubscription: Subscription;
  hide = true;
  passwordHelp = 'Le mot de passe doit respecter les contraintes suivantes: \n - 12 caractères minimum \n - 20 caractères maximum \n - Au moins 3 lettres minuscules \n - Au moins 3 lettres majuscules \n - Au moins 3 chiffres \n - Au moins 3 caractères spéciaux (!@#$%^&*()_-:+)';
  minDate = new Date();
  maxDate = new Date();

  constructor(private fb: FormBuilder,
    private uploadManagerService: UploadManagerService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    let expireDate;
    if (this.parametersFormValues?.expiryDays) {
      expireDate = moment().add(this.parametersFormValues.expiryDays, 'days').toDate();
    } else {
      expireDate = moment().add(30, 'days').toDate();
    }
    this.maxDate = moment().add(90, 'days').toDate();

    this.envelopeParametersForm = this.fb.group({
      expiryDays: [expireDate],
      password: [this.parametersFormValues?.password, [Validators.minLength(12), Validators.maxLength(20), passwordValidator]]
    });
    this.checkErrors();
    this.envelopeParametersFormChangeSubscription = this.envelopeParametersForm.valueChanges
      .subscribe(() => {
        const _expiryDays = moment().diff(this.envelopeParametersForm.get('expiryDays').value, 'days') - 1;
        this.onFormGroupChange.emit({ isValid: this.envelopeParametersForm.valid, values: { expiryDays: -_expiryDays, ...this.envelopeParametersForm.get('password').value ? { password: this.envelopeParametersForm.get('password').value } : { password: '' } } })
        this.uploadManagerService.envelopeInfos.next(
          {
            ...this.uploadManagerService.envelopeInfos.getValue(),
            parameters: {
              expiryDays: -_expiryDays,
              ...this.envelopeParametersForm.get('password').value ? { password: this.envelopeParametersForm.get('password').value } : { password: '' }
            }
          });
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeParametersForm.controls; }

  ngOnDestroy() {
    this.envelopeParametersFormChangeSubscription.unsubscribe();
  }

  checkErrors(){
    if(this.f.password.errors != null){
      this.envelopeParametersForm.get('password').setValue('');
    }
  }

}


