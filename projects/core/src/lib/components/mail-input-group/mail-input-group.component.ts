import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "mail-input-group",
  template: `
    <div class="input-add" [ngClass]="{ valid: checkEmail() }">
      <input type="text" placeholder="Envoyer à*" [(ngModel)]="email" />
      <div class="input-add-button" (click)="addEmail()"></div>
    </div>
  `
})
export class MailInputGroupComponent {
  @Output() newEmail: EventEmitter<string>;
  email: string;
  emailPattern: RegExp;

  constructor() {
    this.newEmail = new EventEmitter();
    this.email = "";
    this.emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
}
