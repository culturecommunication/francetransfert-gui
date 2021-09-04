import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { ParametersModel } from 'src/app/models';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // this.envelopeParametersForm = this.fb.group({
    //   delaiValidite: ['30'],
    //   password: [''],
    //   eachDownloadNotify: '',
    //   allDownloadNotify: ''
    // });
    this.envelopeParametersForm = this.fb.group({
      expiryDays: [this.parametersFormValues?.expiryDays ? this.parametersFormValues?.expiryDays : '30', [Validators.max(90), Validators.min(1)]],
      password: [this.parametersFormValues?.password]
    });
    this.envelopeParametersFormChangeSubscription = this.envelopeParametersForm.valueChanges
      .subscribe(() => this.onFormGroupChange.emit({ isValid: this.envelopeParametersForm.valid, values: this.envelopeParametersForm.value }));
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeParametersForm.controls; }

  ngOnDestroy() {
    this.envelopeParametersFormChangeSubscription.unsubscribe();
  }

}
