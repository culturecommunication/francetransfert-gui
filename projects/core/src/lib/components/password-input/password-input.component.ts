import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PasswordInputComponent),
  multi: true
};

@Component({
  selector: 'lib-password-input',
  templateUrl: './password-input.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Output() blur: EventEmitter<boolean>;
  showPassword: boolean;
  password: string;

  constructor() {
    this.blur = new EventEmitter();
    this.showPassword = false;
    this.password = '';
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
    return this.password;
  }

  /**
   * set accessor including call the onchange callback.
   * @param {string} v
   */
  set value(v: string) {
    if (v !== this.password) {
      this.password = v;
      this.onChangeCallback(v);
    }
  }

  /**
   * Set touched on blur.
   * @returns {void}
   */
  onBlur(): void {
    this.blur.emit(true);
    this.onTouchedCallback();
  }

  /**
   * From ControlValueAccessor interface.
   * @param {string} value
   * @returns {void}
   */
  writeValue(value: string): void {
    if (value !== this.password && value !== null) {
      this.password = value;
    }
  }

  /**
   * Read password changes
   * @returns {void}
   */
  change(): void {
    this.onChangeCallback(this.password);
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
