import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfer } from '@flowjs/ngx-flow';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import { FTTransferModel } from 'src/app/models';
import {AdminService, UploadService} from 'src/app/services';
import { AdminAlertDialogComponent } from './admin-alert-dialog/admin-alert-dialog.component';
import {MyErrorStateMatcher} from "../upload/envelope/envelope-mail-form/envelope-mail-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminEndMsgComponent} from "./admin-end-msg/admin-end-msg.component";
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ft-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject();
  params: Array<{ string: string }>;
  fileInfos: any;
  transfers: Array<any> = [];
  validUntilDate;
  minDate = new Date();
  maxDate = new Date();
  errorMessage = '';
  adminErrorsSubscription: Subscription;
  add: boolean = false;
  close: boolean = false;
  emailFormControl: any;
  matcher = new MyErrorStateMatcher();
  envelopeMailFormChangeSubscription: Subscription;
  errorEmail: boolean = false;
  errorValidEmail: boolean = false;
  senderOk: boolean = false;
  envelopeDestForm: FormGroup;
  public selectedDate: Date = new Date();

  constructor(private _adminService: AdminService, private formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private dialog: MatDialog,
    private titleService: Title,
    private uploadService: UploadService, private _snackBar: MatSnackBar,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.initForm();
    this.titleService.setTitle('France transfert - Administration d\'un pli');
    this._activatedRoute.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe((params: Array<{ string: string }>) => {
      this.params = params;
      if (this.params['enclosure'] && this.params['token']) {
        this._adminService
          .getFileInfos(params)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(fileInfos => {
            this.fileInfos = fileInfos;
            this.fileInfos.rootFiles.map(file => {
              this.transfers.push({ ...file, folder: false } as FTTransferModel<Transfer>);
            });
            this.fileInfos.rootDirs.map(file => {
              this.transfers.push({ ...file, size: file.totalSize, folder: true } as FTTransferModel<Transfer>);
            });
            this.validUntilDate = new FormControl(new Date(this.fileInfos.validUntilDate));
            let temp = this.selectedDate;
            this.maxDate.setDate(temp.getDate() + 90);
          });
      } else {
        this._router.navigateByUrl('/error');
      }
    });
    this.adminErrorsSubscription = this._adminService.adminError$.subscribe(err => {
      if (err === 401) {
        this.errorMessage = 'Existence_Pli';
      }
    });
  }

  onPickerClose() {
    // call api + reload
    let formattedDate = moment(this.validUntilDate.value).format('DD-MM-yyyy');
    const body = {
      "enclosureId": this.params['enclosure'],
      "token": this.params['token'],
      "newDate": formattedDate
    }
    this._adminService
      .updateExpiredDate(body)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        if (response) {
          window.location.reload();
        }
      });
  }

  deleteFile() {
    const dialogRef = this.dialog.open(AdminAlertDialogComponent,{data:'deletePli'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._adminService
          .deleteFile(this.params)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(response => {
            if (response) {
              this._router.navigate(['/upload']);
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.adminErrorsSubscription.unsubscribe();
  }

  deleteRecipient(index, dest) {
    const dialogRef = this.dialog.open(AdminAlertDialogComponent,{data:'deleteDest'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const body = {
          "enclosureId": this.params['enclosure'],
          "token": this.params['token'],
          "newRecipient": dest,
        }
        this._adminService.deleteRecipient(body).
        pipe(takeUntil(this.onDestroy$))
          .subscribe(response => {
            if (response) {
              this.fileInfos.recipientsMails.splice(index, 1);
              this.fileInfos.deletedRecipients.push(dest);
            }
          });;

      }
    });

  }

  addRecipient() {
      this.add = !this.add;
      this.close = !this.close;
      this.initForm();
  }

  onBlurDestinataires() {

      if(this.emailFormControl.errors == null){
          this.errorEmail = false;
          this.checkDestinataire(this.emailFormControl.value);
      }else{
        this.errorEmail = true;
        this.envelopeDestForm.controls['email'].markAsTouched();
        this.envelopeDestForm.controls['email'].setErrors({ emailError: true });
      }

  }

  initForm() {

    this.envelopeDestForm = this.formBuilder.group({
      email : ['', { validators: [Validators.email], updateOn: 'blur' }],
    });
    this.emailFormControl = this.envelopeDestForm.get('email');
    this.envelopeMailFormChangeSubscription = this.emailFormControl.valueChanges
      .subscribe(() => {
      });
  }

  checkDestinataire(email: any) {
    let destOk = false;
    if(this.emailFormControl.errors == null){
      this.errorEmail = false;
      this.uploadService.validateMail([this.fileInfos.senderEmail]).pipe(
        take(1)).subscribe((isValid: boolean) => {
          this.senderOk = isValid;
          if(!this.senderOk && !this.errorEmail){
            this.uploadService.validateMail([email]).pipe(
              take(1)).subscribe((valid: boolean)=>{
                destOk = valid;
                if(destOk){
                  //appeler le back;
                  this.addNewRecipient(email);
                  this.errorValidEmail= false;
                  this.envelopeDestForm.controls['email'].markAsUntouched();
                  this.envelopeDestForm.controls['email'].setErrors({ emailNotValid: false });

                }else{
                  this.envelopeDestForm.controls['email'].markAsTouched();
                  this.envelopeDestForm.controls['email'].setErrors({ emailNotValid: true });
                  this.errorValidEmail= true;
                }
            })
          }else{
            if(!this.errorEmail){
              //appeler le back
              this.addNewRecipient(email);
            }
          }
      })}else{
      this.errorEmail = true;
      this.envelopeDestForm.controls['email'].markAsUntouched();
      this.envelopeDestForm.controls['email'].setErrors({ emailError: true });}

    this.envelopeDestForm.updateValueAndValidity();

  }

  addNewRecipient(email: any){
    const body = {
      "enclosureId": this.params['enclosure'],
      "token": this.params['token'],
      "newRecipient": email,
    }
    this._adminService
      .addNewRecipient(body)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        if (response) {
          this.fileInfos.recipientsMails.push(email);
          for(let i = 0; i < this.fileInfos.deletedRecipients.length; i++){
              if(this.fileInfos.deletedRecipients[i] === email){
                this.fileInfos.deletedRecipients.splice(i,1);
              }
          }

          this.envelopeDestForm.get('email').setValue('');
          this.openSnackBar();
        }
      });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(AdminEndMsgComponent,{
      duration:4000,
    });
  }

}
