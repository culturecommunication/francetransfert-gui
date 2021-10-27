import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { LinkInfosModel } from 'src/app/models';
import { UploadManagerService, UploadService } from 'src/app/services';

@Component({
  selector: 'ft-envelope-link-form',
  templateUrl: './envelope-link-form.component.html',
  styleUrls: ['./envelope-link-form.component.scss']
})
export class EnvelopeLinkFormComponent implements OnInit {
  @Input() linkFormValues: LinkInfosModel;
  envelopeLinkForm: FormGroup;
  @Output() public onFormGroupChange = new EventEmitter<any>();
  envelopeLinkFormChangeSubscription: Subscription;

  constructor(private fb: FormBuilder,
    private uploadManagerService: UploadManagerService,
    private uploadService: UploadService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.envelopeLinkForm = this.fb.group({
      subject: [this.linkFormValues?.subject],
      from: [this.linkFormValues?.from, { validators: [Validators.required, Validators.email], updateOn: 'blur' }],
      message: [this.linkFormValues?.message],
      cguCheck: [this.linkFormValues?.cguCheck, [Validators.requiredTrue]]
    });
    this.envelopeLinkFormChangeSubscription = this.envelopeLinkForm.valueChanges
      .subscribe(() => {
        this.checkEmitter();
        this.onFormGroupChange.emit({ isValid: this.envelopeLinkForm.valid, values: this.envelopeLinkForm.value })
        this.uploadManagerService.envelopeInfos.next({ type: 'link', ...this.envelopeLinkForm.value, ...this.uploadManagerService.envelopeInfos.getValue()?.parameters ? { parameters: this.uploadManagerService.envelopeInfos.getValue().parameters } : {} });
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeLinkForm.controls; }

  ngOnDestroy() {
    this.envelopeLinkFormChangeSubscription.unsubscribe();
  }

  checkEmitter() {
    let senderOk = false;
    this.uploadService.validateMail([this.envelopeLinkForm.get('from').value]).pipe(
      take(1)).subscribe((isValid: boolean) => {
        senderOk = isValid;
        if (this.envelopeLinkForm.get('from').value) {
          if (!senderOk) {
            this.envelopeLinkForm.controls['from'].markAsTouched();
            this.envelopeLinkForm.controls['from'].setErrors({ notValid: true });
          } else {
            this.envelopeLinkForm.controls['from'].markAsUntouched();
            this.envelopeLinkForm.controls['from'].setErrors(null);
          }
        } else {
          this.envelopeLinkForm.controls['from'].markAsTouched();
          this.envelopeLinkForm.controls['from'].setErrors({ required: true });
        }
      });
  }

  routeToInNewWindow(_route) {
    // Converts the route into a string that can be used 
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/${_route}`])
    );

    window.open(url, '_blank');
  }

}
