import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ParametersModel } from 'src/app/models';
import { UploadManagerService } from 'src/app/services';

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
  passwordHelp = 'Le mot de passe doit respecter les contraintes suivantes: \n - 10 caractères minimum \n - 20 caractères maximum \n - Au moins 3 lettres minuscules \n - Au moins 3 lettres majuscules \n - Au moins 3 chiffres \n - Au moins 3 caractères spéciaux (!@#$%^&*()_+)';

  constructor(private fb: FormBuilder,
    private uploadManagerService: UploadManagerService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.envelopeParametersForm = this.fb.group({
      expiryDays: [this.parametersFormValues?.expiryDays ? this.parametersFormValues?.expiryDays : '30', [Validators.max(90), Validators.min(1)]],
      password: [this.parametersFormValues?.password, [Validators.minLength(10), Validators.maxLength(20), Validators.pattern('^(?=.{10,})((?=.*[0-9]){3,})((?=.*[a-z]){3,})((?=.*[A-Z]){3,})((?=.*[!@#$%^&*()_+]){3,}).*$')]]
    });
    this.envelopeParametersFormChangeSubscription = this.envelopeParametersForm.valueChanges
      .subscribe(() => {
        this.onFormGroupChange.emit({ isValid: this.envelopeParametersForm.valid, values: this.envelopeParametersForm.value })
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeParametersForm.controls; }

  ngOnDestroy() {
    this.envelopeParametersFormChangeSubscription.unsubscribe();
  }

}
