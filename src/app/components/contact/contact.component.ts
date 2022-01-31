import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormulaireContactModel} from "../../models/envelope-infos.model";
import {ContactService} from "../../services/contact/contact.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ContactEndMessageComponent} from "../contact-end-message/contact-end-message.component";
import {Subscription} from "rxjs";

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

  constructor(private fb: FormBuilder,private contactService: ContactService,
              private _snackBar: MatSnackBar,
              private _router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.formulaireContactForm = this.fb.group({
      nom: [this.formulaireContact?.nom],
      prenom: [this.formulaireContact?.prenom],
      from: [this.formulaireContact?.from, { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
      administration:[this.formulaireContact?.administration],
      subject: [this.formulaireContact?.subject],
      message: [this.formulaireContact?.message, { validators: [Validators.required]}],
    });
    this.contatactFormChangeSubscription = this.formulaireContactForm.valueChanges
        .subscribe(() => {
          this.checkSend();
        });

  }

  get f() { return this.formulaireContactForm.controls; }

  checkSend(){
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

    }
    this.contactService.sendFormulaireContact(this.formulaireBody).subscribe((result: any) => {
      if(result){
        this.openSnackBar(4000);
        //this.isSend = true;
        this._router.navigate(['/upload']);
      }
      this.reset();
    });
  }

  private reset() {
    this.canSend = false;
  }

  openSnackBar(duration: number) {
    this._snackBar.openFromComponent(ContactEndMessageComponent,{
      duration:duration
    });
  }

  ngOnDestroy() {
    this.contatactFormChangeSubscription.unsubscribe();
  }

}
