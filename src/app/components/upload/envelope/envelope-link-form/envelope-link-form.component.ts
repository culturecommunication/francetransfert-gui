import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ft-envelope-link-form',
  templateUrl: './envelope-link-form.component.html',
  styleUrls: ['./envelope-link-form.component.scss']
})
export class EnvelopeLinkFormComponent implements OnInit {
  envelopeLinkForm: FormGroup;
  @Output() public onFormGroupChange = new EventEmitter<any>();
  envelopeLinkFormChangeSubscription: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.envelopeLinkForm = this.fb.group({
      transferName: [''],
      from: ['', [Validators.required, Validators.email]],
      message: ['']
    });
    this.envelopeLinkFormChangeSubscription = this.envelopeLinkForm.valueChanges
      .subscribe(() => this.onFormGroupChange.emit({ isValid: this.envelopeLinkForm.valid, values: this.envelopeLinkForm.value }));
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeLinkForm.controls; }

  ngOnDestroy() {
    this.envelopeLinkFormChangeSubscription.unsubscribe();
  }

}
