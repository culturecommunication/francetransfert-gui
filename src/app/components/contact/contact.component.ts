import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormulaireContactModel } from "../../models/envelope-infos.model";
import { ContactService } from "../../services/contact/contact.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactEndMessageComponent } from "../contact-end-message/contact-end-message.component";
import { BehaviorSubject, Subscription, take } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'ft-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  formulaireContactForm: FormGroup;
  formulaireContact: FormulaireContactModel;
  formulaireBody: any;
  contatactFormChangeSubscription: Subscription;
  canSend: boolean = false;
  isSend: boolean = false;
  uuid = uuidv4();
  captchaType: string = 'IMAGE';

  constructor(private fb: FormBuilder, private contactService: ContactService,
    private _snackBar: MatSnackBar,
    private _router: Router) {
    this.uuid = uuidv4();
    this.formulaireContactForm = this.fb.group({
      nom: [this.formulaireContact?.nom],
      prenom: [this.formulaireContact?.prenom],
      from: [this.formulaireContact?.from, { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
      administration: [this.formulaireContact?.administration],
      subject: [this.formulaireContact?.subject],
      message: [this.formulaireContact?.message, { validators: [Validators.required] }],
      userResponse: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.contatactFormChangeSubscription = this.formulaireContactForm.valueChanges
      .subscribe(() => {
        this.checkSend();
      });

  }

  get f() { return this.formulaireContactForm.controls; }

  checkSend() {
    this.canSend = this.formulaireContactForm.valid;
  }

  send() {
    this.formulaireBody = {
      ...this.formulaireContactForm.controls.nom.value  ? {nom : this.formulaireContactForm.controls.nom.value} : {nom : ""},
      ...this.formulaireContactForm.controls.prenom.value  ? {prenom : this.formulaireContactForm.controls.prenom.value} : {prenom : ""},
      ...this.formulaireContactForm.controls.from.value  ? {from : this.formulaireContactForm.controls.from.value} : {from : ""},
      ...this.formulaireContactForm.controls.administration.value  ? {administration : this.formulaireContactForm.controls.administration.value} : {administration : ""},
      ...this.formulaireContactForm.controls.subject.value  ? {subject : this.formulaireContactForm.controls.subject.value} : {subject : ""},
      ...this.formulaireContactForm.controls.message.value  ? {message : this.formulaireContactForm.controls.message.value} : {message : ""},
      userResponse: this.formulaireContactForm.controls.userResponse.value,
      challengeId: this.uuid,
      captchaType: this.captchaType
    }
    this.contactService.sendFormulaireContact(this.formulaireBody).pipe(take(1)).subscribe((result: any) => {
      if (result) {
        this.openSnackBar(4000);
        //this.isSend = true;
        this._router.navigate(['/upload']);
      }
      this.reset();
    }, (error) => {
      if (error.status === 401) {
        this.formulaireContactForm.controls.userResponse.setValue('');
        this.formulaireContactForm.controls.userResponse.setErrors({ 'wrong': true });
        this.reset();
      }

    });
  }

  private reset() {
    this.uuid = uuidv4();
    this.canSend = false;
  }

  openSnackBar(duration: number) {
    this._snackBar.openFromComponent(ContactEndMessageComponent, {
      duration: duration
    });
  }

  switchType() {
    this.captchaType = this.captchaType === 'IMAGE' ? 'AUDIO' : 'IMAGE';
  }

  getImageUrl() {
    return `${environment.apis.captcha.url}${this.uuid}${this.captchaType === 'IMAGE' ? '.jpg' : '.wav'}`;
  }

  resetUuid() {
    this.uuid = uuidv4();
  }

  ngOnDestroy() {
    this.contatactFormChangeSubscription.unsubscribe();
  }

}
