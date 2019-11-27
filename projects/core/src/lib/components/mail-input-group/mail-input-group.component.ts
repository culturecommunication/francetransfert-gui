import { Component, Output, EventEmitter } from "@angular/core";
import { REGEX_EXP } from "../../configuration/regex.config";
@Component({
  selector: "mail-input-group",
  template: `
    <div class="input-add" [ngClass]="{ valid: checkEmail() }">
      <input
        type="text"
        placeholder="Envoyer à*"
        [(ngModel)]="email"
        (keyup)="getChanches()"
        (blur)="getOnblur()"
      />
      <div class="input-add-button" (click)="addEmail()"></div>
    </div>
  `
})
export class MailInputGroupComponent {
  @Output() newEmail: EventEmitter<string>;
  @Output() change: EventEmitter<string>;
  @Output() onBlur: EventEmitter<string>;
  email: string;
  emailPattern: RegExp;

  constructor() {
    this.newEmail = new EventEmitter();
    this.change = new EventEmitter();
    this.onBlur = new EventEmitter();
    this.email = "";
    this.emailPattern = REGEX_EXP.EMAIL;
  }

  /**
   * Add a new email
   * @returns {void}
   */
  addEmail(): void {
    this.newEmail.emit(this.email);
    this.email = "";
  }

  /**
   * Check email validation
   * @returns {boolean}
   */
  checkEmail(): boolean {
    return this.emailPattern.test(this.email);
  }

  /**
   * Get email changes
   * @returns {void}
   */
  getChanches(): void {
    this.change.emit(this.email);
  }

  /**
   * Get email onBlur event
   * @returns {void}
   */
  getOnblur(): void {
    this.onBlur.emit(this.email);
  }
}
