import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LinkInfosModel } from 'src/app/models';
import { UploadManagerService } from 'src/app/services';

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
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.envelopeLinkForm = this.fb.group({
      subject: [this.linkFormValues?.subject],
      from: [this.linkFormValues?.from, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9](\.?[a-z0-9]){3,}@culture\.gouv\.fr$')]],
      message: [this.linkFormValues?.message],
      cguCheck: [this.linkFormValues?.cguCheck, [Validators.requiredTrue]]
    });
    this.envelopeLinkFormChangeSubscription = this.envelopeLinkForm.valueChanges
      .subscribe(() => {
        this.onFormGroupChange.emit({ isValid: this.envelopeLinkForm.valid, values: this.envelopeLinkForm.value })
        this.uploadManagerService.envelopeInfos.next({ type: 'mail', ...this.envelopeLinkForm.value, ...this.uploadManagerService.envelopeInfos.getValue()?.parameters ? { parameters: this.uploadManagerService.envelopeInfos.getValue().parameters } : {} });
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.envelopeLinkForm.controls; }

  ngOnDestroy() {
    this.envelopeLinkFormChangeSubscription.unsubscribe();
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
