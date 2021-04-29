import { Component, Output, EventEmitter, forwardRef } from '@angular/core';

import { MSG_INFO, SENDER_MAIL_COOKIES } from '../../configuration/errors-messages.config';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const CUSTOM_INPUT_ADD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MailInputComponent),
  multi: true
};

@Component({
  selector: 'lib-mail-input',
  template: `
    <div class="input-add">
      <mat-form-field>
        <mat-label>Votre courriel *</mat-label>
        <input matInput [matAutocomplete]="auto" [(ngModel)]="email" (keyup)="change()" />
        <mat-autocomplete #auto="matAutocomplete">
          <mat-option *ngFor="let state of autoComplete" [value]="state">
            <span>{{ state }}</span>
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
    </div>
  `,
  providers: [CUSTOM_INPUT_ADD_CONTROL_VALUE_ACCESSOR]
})
export class MailInputComponent implements ControlValueAccessor {
  @Output() changes: EventEmitter<string>;

  email: string;
  autoComplete: Array<string>;
  emailsRef: Array<string>;
  constructor() {
    this.emailsRef = JSON.parse(localStorage.getItem(SENDER_MAIL_COOKIES))
      ? JSON.parse(localStorage.getItem(SENDER_MAIL_COOKIES))
      : [];
    this.autoComplete = [];
    this.changes = new EventEmitter();
    this.email = '';
  }

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  /**
   * get accessor.
   * @returns {string}
   */
  get value(): string {
    return this.email;
  }

  /**
   * set accessor including call the onchange callback.
   * @param {string} v
   */
  set value(v: string) {
    if (v !== this.email) {
      this.email = v;
      this.onChangeCallback(v);
    }
  }
  show($event) {
    console.log($event);
  }
  /**
   * From ControlValueAccessor interface.
   * @param {string} value
   * @returns {void}
   */
  writeValue(value: string): void {
    if (value !== this.email && value !== null) {
      this.email = value;
    }
  }

  /**
   * Read emails changes
   * @returns {void}
   */
  change(): void {
    this.autoComplete = [];
    if (this.email) {
      this.autoComplete = [
        ...this.emailsRef.filter(
          (refEmail: string) => refEmail.toLocaleLowerCase().indexOf(this.email.toLocaleLowerCase()) !== -1
        )
      ];
    }
    this.onChangeCallback(this.email);
  }

  /**
   * From ControlValueAccessor interface.
   * @param {any} fn
   * @returns {void}
   */
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  /**
   * From ControlValueAccessor interface.
   * @param {any} fn
   * @returns {void}
   */
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}
