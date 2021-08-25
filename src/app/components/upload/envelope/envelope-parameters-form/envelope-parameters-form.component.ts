import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'ft-envelope-parameters-form',
  templateUrl: './envelope-parameters-form.component.html',
  styleUrls: ['./envelope-parameters-form.component.scss']
})
export class EnvelopeParametersFormComponent implements OnInit, OnDestroy {

  envelopeParametersForm: FormGroup;
  @Output() public onFormGroupChange = new EventEmitter<any>();
  envelopeParametersFormChangeSubscription: Subscription;
  hide = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.envelopeParametersForm = this.fb.group({
      delaiValidite: ['7'],
      password: [''],
      eachDownloadNotify: '',
      allDownloadNotify: ''
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
