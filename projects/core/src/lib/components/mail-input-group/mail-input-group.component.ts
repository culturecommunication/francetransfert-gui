import { Component, Output, EventEmitter, forwardRef } from '@angular/core';

import { REGEX_EXP } from '../../configuration/regex.config';
import { MSG_INFO } from '../../configuration/errors-messages.config';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const CUSTOM_INPUT_ADD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MailInputGroupComponent),
  multi: true
};

@Component({
  selector: 'lib-mail-input-group',
  template: `
    <div class="input-add" [ngClass]="{ valid: checkEmail() }">
      <input
        type="text"
        placeholder="Envoyer à*"
        [(ngModel)]="email"
        (keyup)="change()"
        (keyup.enter)="checkEmail() && addEmail()"
        (blur)="getOnblur()"
      />
      <div class="input-add-button" (click)="addEmail()"></div>
      <div class="input-add-list" *ngIf="autoComplete.length > 0">
        <ul>
          <li *ngFor="let item of autoComplete" (click)="email = item">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  `,
  providers: [CUSTOM_INPUT_ADD_CONTROL_VALUE_ACCESSOR]
})
export class MailInputGroupComponent implements ControlValueAccessor {
  @Output() errors: EventEmitter<string>;
  @Output() changes: EventEmitter<string>;
  @Output() onBlur: EventEmitter<string>;

  email: string;
  emails: Array<string>;
  autoComplete: Array<string>;
  emailsRef: Array<string>;
  emailPattern: RegExp;
  emailMAX: number;
  constructor() {
    this.emails = [];
    this.emailsRef = JSON.parse(localStorage.getItem('EMAIL_LIST'))
      ? JSON.parse(localStorage.getItem('EMAIL_LIST'))
      : [];
    this.autoComplete = [];
    this.errors = new EventEmitter();
    this.changes = new EventEmitter();
    this.onBlur = new EventEmitter();
    this.email = '';
    this.emailPattern = REGEX_EXP.EMAIL;
    this.emailMAX = 100;
  }

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  /**
   * get accessor.
   * @returns {Array<string>}
   */
  get value(): Array<string> {
    return this.emails;
  }

  /**
   * set accessor including call the onchange callback.
   * @param {Array<string>} v
   */
  set value(v: Array<string>) {
    if (v !== this.emails) {
      this.emails = v;
      this.email = this.email[0];
      this.onChangeCallback(v);
    }
  }

  /**
   * From ControlValueAccessor interface.
   * @param {string} value
   * @returns {void}
   */
  writeValue(value: Array<string>): void {
    if (value !== this.emails && value !== null) {
      this.emails = value;
      this.email = '';
    }
  }

  /**
   * Read emails changes
   * @returns {void}
   */
  change(): void {
    this.changes.emit(this.email);
    this.email = this.email.replace(/ /g, '');
    if (this.emails.length === this.emailMAX) {
      this.errors.emit(MSG_INFO.FO_MSG_INF_04);
    }
    if (this.email.indexOf(';') !== -1 || this.email.indexOf(',') !== -1) {
      let emailList: Array<string> = this.email.indexOf(';') !== -1 ? this.email.split(';') : this.email.split(',');
      for (let email of emailList) {
        if (this.emailPattern.test(email)) {
          if (this.emails.length < this.emailMAX) {
            if (this.emails.indexOf(email) === -1) {
              this.emails.push(email);
            }
            this.email =
              this.email.indexOf(';') !== -1
                ? this.email.replace(
                    this.email.indexOf(email) !== -1 && this.email.indexOf(`${email};`) === -1 ? email : `${email};`,
                    ''
                  )
                : this.email.replace(
                    this.email.indexOf(email) !== -1 && this.email.indexOf(`${email},`) === -1 ? email : `${email},`,
                    ''
                  );
          } else {
            this.errors.emit(MSG_INFO.FO_MSG_INF_04);
          }
        }
      }
    } else {
      this.autoComplete = [];
      if (this.email.length > 2) {
        this.autoComplete = [
          ...this.emailsRef.filter(
            (refEmail: string) =>
              refEmail.toLocaleLowerCase().indexOf(this.email.toLocaleLowerCase()) !== -1 &&
              this.emails.findIndex((email: string) => email.toLocaleLowerCase() === refEmail.toLocaleLowerCase()) ===
                -1
          )
        ];
      }
    }
    this.onChangeCallback(this.emails);
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

  /**
   * Check email validation
   * @returns {boolean}
   */
  checkEmail(): boolean {
    return this.emailPattern.test(this.email);
  }

  /**
   * Add a new email
   * @returns {void}
   */
  addEmail(): void {
    if (this.emails.length === this.emailMAX) {
      this.errors.emit(MSG_INFO.FO_MSG_INF_04);
    } else {
      if (
        this.emails.findIndex((email: string) => email.toLocaleLowerCase() === this.email.toLocaleLowerCase()) === -1
      ) {
        this.emails.push(this.email);
        this.changes.emit(this.email);
      }
      this.email = '';
      this.autoComplete = [];
      this.getOnblur();
    }
  }

  /**
   * Get email onBlur event
   * @returns {void}
   */
  getOnblur(): void {
    this.onBlur.emit(this.email);
  }
}
