/*
  * Copyright (c) Ministère de la Culture (2022)
  *
  * SPDX-License-Identifier: MIT
  * License-Filename: LICENSE.txt
  */

import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { debounceTime, distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { MailingListManagerComponent } from 'src/app/components';
import { MailInfosModel } from 'src/app/models';
import { AdminService, UploadManagerService, UploadService } from 'src/app/services';
import { saveAs } from 'file-saver';
import { QuotaAsyncValidator } from 'src/app/shared/validators/quota-validator';
import { MailAsyncValidator } from 'src/app/shared/validators/mail-validator';
import { LoginService } from 'src/app/services/login/login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    return control.touched && (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'ft-envelope-mail-form',
  templateUrl: './envelope-mail-form.component.html',
  styleUrls: ['./envelope-mail-form.component.scss']
})
export class EnvelopeMailFormComponent implements OnInit, OnDestroy {
  @Input() mailFormValues: MailInfosModel;
  envelopeMailForm: FormGroup;
  @Output() public onFormGroupChange = new EventEmitter<any>();
  @ViewChild('dest') dest: ElementRef;
  @ViewChild('objet') objet: ElementRef;
  @ViewChild('message') message: ElementRef;
  @ViewChild('myFileInput') myFileInput;


  envelopeMailFormChangeSubscription: Subscription;
  matcher = new MyErrorStateMatcher();
  destinatairesList: string[] = [];
  destListOk = false;
  senderOk = false;
  errorEmail = false;
  focusInput: boolean = false;

  constructor(private fb: FormBuilder,
    private uploadManagerService: UploadManagerService,
    private loginService: LoginService,
    private uploadService: UploadService,
    private router: Router,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.initForm();


  }

  initForm() {

    this.adminService.currentDestinatairesInfo.pipe(take(1)).subscribe(destinatairesInfo => {
      if (destinatairesInfo && destinatairesInfo.destinataires && destinatairesInfo.destinataires.length > 0) {
        destinatairesInfo.destinataires.map(ed => {
          this.destinatairesList.push(ed);
        })
        this.adminService.cleanDestinatairesList();
      }
    });



    this.envelopeMailForm = this.fb.group({
      from: [this.mailFormValues?.from, { validators: [Validators.required, Validators.email], asyncValidators: [QuotaAsyncValidator.createValidator(this.uploadService)], updateOn: 'blur' }],
      to: ['', { validators: [Validators.email], updateOn: 'blur' }],
      subject: [this.mailFormValues?.subject],
      message: [this.mailFormValues?.message],
      cguCheck: [this.mailFormValues?.cguCheck, [Validators.requiredTrue]]
    }, { asyncValidators: MailAsyncValidator.createValidator(this.uploadService, 'from', 'to', this.destinatairesList) });

    this.envelopeMailFormChangeSubscription = this.envelopeMailForm.statusChanges
      .subscribe(() => {
        this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList })
        this.uploadManagerService.envelopeInfos.next({ type: 'mail', ...this.envelopeMailForm.value, ...this.uploadManagerService.envelopeInfos.getValue()?.parameters ? { parameters: this.uploadManagerService.envelopeInfos.getValue().parameters } : {} });
      });
    this.reloadDestinataires();
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeMailForm.controls; }

  reloadDestinataires() {
    if (this.mailFormValues?.to && this.mailFormValues?.to.length > 0) {
      Array.prototype.push.apply(this.destinatairesList, this.mailFormValues?.to);
      this.envelopeMailForm.get('to').setValue('');
      this.envelopeMailForm.markAllAsTouched();
      this.envelopeMailForm.markAsDirty();
      this.checkDestinatairesList();
      this.onFormGroupChange.emit({ isValid: this.envelopeMailForm.valid, values: this.envelopeMailForm.value, destinataires: this.destinatairesList })
    }
  }

  enterExpediteur() {
    this.dest.nativeElement.focus();
  }

  enterObjet() {
    this.message.nativeElement.focus();
  }


  onBlurDestinataires() {
    this.errorEmail = false;
    let error = this.envelopeMailForm.controls['to'].errors;
    if (this.envelopeMailForm.get('to').value && !this.envelopeMailForm.get('to').hasError('email')) {
      let found = this.destinatairesList.find(o => o === this.envelopeMailForm.get('to').value);
      if (!found) {
        if (this.destinatairesList.length < 100) {
          this.destinatairesList.push(this.envelopeMailForm.get('to').value.toLowerCase());
          this.envelopeMailForm.get('to').setValue('');
          this.focus();
        }
      }

    } else if (this.envelopeMailForm.get('to').value && this.envelopeMailForm.get('to').hasError('email') && this.envelopeMailForm.get('to').value.indexOf('<') >= 0) {
      this.copyListDestinataires(this.envelopeMailForm.get('to').value);
      this.envelopeMailForm.get('to').setValue('');
    } else if (this.envelopeMailForm.get('to').value != '') {
      this.envelopeMailForm.controls['to'].setErrors(error);
      if (error) {
        this.errorEmail = true;
      }
    }
    this.checkDestinatairesList();
  }

  ngOnDestroy() {
    this.envelopeMailFormChangeSubscription.unsubscribe();
  }

  checkDestinatairesList() {
    this.envelopeMailForm.markAllAsTouched();
    this.envelopeMailForm.markAsDirty();
    this.envelopeMailForm.get('from').updateValueAndValidity();
  }

  deleteDestinataire(index) {
    this.destinatairesList.splice(index, 1);
    this.checkDestinatairesList();
  }

  routeToInNewWindow(_route) {
    // Converts the route into a string that can be used
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/${_route}`])
    );

    window.open(url, '_blank');
  }


  openMailingListManager() {
    const dialogRef = this.dialog.open(MailingListManagerComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.event === 'loadMailingListFromLocalStorage') {
          for (const k in result.data) {
            this.envelopeMailForm.get('to').setValue(result.data[k]);
            this.onBlurDestinataires();
          }

        }
        if (result.event === 'loadMailingListFromFile') {
        for (const k in result.data) {
          this.envelopeMailForm.get('to').setValue(result.data[k]);
          this.onBlurDestinataires();
        }

        //result.event.target.value = "";


        }

      }
    });


  }


  exportDataCSV() {
    let data = this.destinatairesList;
    let csv = data.join(';');
    var blob = new Blob([csv], { type: 'text/csv' })
    saveAs(blob, "listeDestinataires.csv");
  }

  focus() {
    this.dest.nativeElement.focus();
    //this.objet.nativeElement.focus();
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  getSenderInfo() {
    return this.loginService.getEmail();
  }

  copyListDestinataires(val: any) {
    if (val.indexOf("<") > 0 && val.indexOf(">") > 0) {
      let list = this.envelopeMailForm.get('to').value.split(/</);
      list.forEach(d => {
        if (d.indexOf(">") > 0) {
          this.destinatairesList.push(d.split(/>/)[0]);
        }
      })
    }
  }


  enterSubmit(event, index) {
    this.destinatairesList.splice(index, 1);
    this.checkDestinatairesList();
  }

}
