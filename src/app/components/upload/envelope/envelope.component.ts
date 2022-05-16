import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinkInfosModel, MailInfosModel, ParametersModel } from 'src/app/models';
import { FileManagerService, UploadManagerService } from 'src/app/services';
import { LoginService } from 'src/app/services/login/login.service';
import { majChar, minChar, numChar, sizeControl, specialChar, notSupportedChar } from 'src/app/shared/validators/forms-validator';

@Component({
  selector: 'ft-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent implements OnInit, OnDestroy {

  @Output() uploadStarted: EventEmitter<boolean> = new EventEmitter();
  selectedTab: string = 'Courriel';
  selectedTabIndex: number = 0;
  canSend: boolean = false;
  mailFormValid: boolean = false;
  linkFormValid: boolean = false;
  fileManagerServiceSubscription: Subscription;
  uploadManagerSubscription: Subscription;
  loginSubscription: Subscription;
  showParameters: boolean = false;
  mailFormValues: MailInfosModel = { type: 'mail' };
  linkFormValues: LinkInfosModel = { type: 'link' };
  parametersFormValues: ParametersModel;

  constructor(private fileManagerService: FileManagerService,
    private uploadManagerService: UploadManagerService,
    private loginService: LoginService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loginSubscription = this.loginService.tokenInfo.subscribe(tokenInfo => {
      if (tokenInfo && tokenInfo.senderMail) {
        this.mailFormValues.from = tokenInfo.senderMail;
        this.linkFormValues.from = tokenInfo.senderMail;
      } else {
        this.mailFormValues.from = '';
        this.linkFormValues.from = '';
      }
    });
    this.uploadManagerSubscription = this.uploadManagerService.envelopeInfos.subscribe(_infos => {
      if (_infos) {
        if (_infos.type === 'mail') {
          this.mailFormValues = _infos
        }
        if (_infos.type === 'link') {
          this.linkFormValues = _infos
        }
        this.parametersFormValues = _infos.parameters;
        this.cdr.detectChanges();
        this.checkCanSend();
      }
    });
  }

  onSelectedTabChange(event) {
    this.selectedTab = event.tab.textLabel;
    this.selectedTabIndex = event.index;
    this.checkCanSend();
  }

  onMailFormGroupChangeEvent(event) {
    this.mailFormValues = event.values;
    this.mailFormValues.to = event.destinataires;
    this.mailFormValid = event.isValid && this.selectedTab === 'Courriel';
    this.checkCanSend();
  }

  onLinkFormGroupChangeEvent(event) {
    this.linkFormValues = event.values;
    this.linkFormValid = event.isValid && this.selectedTab === 'Lien';
    this.checkCanSend();
  }

  onParametersFormGroupChangeEvent(event) {
    this.parametersFormValues = event.values;
  }

  isParamFromValid() {
    if (this.parametersFormValues && this.parametersFormValues.password && this.parametersFormValues.password != '' && this.parametersFormValues.password != null && this.parametersFormValues.password != undefined) {
      return minChar(this.parametersFormValues.password)
        && majChar(this.parametersFormValues.password)
        && specialChar(this.parametersFormValues.password)
        && numChar(this.parametersFormValues.password)
        && sizeControl(this.parametersFormValues.password)
        && notSupportedChar(this.parametersFormValues.password);
    }
    return true;
  }

  checkCanSend() {
    this.fileManagerServiceSubscription = this.fileManagerService.hasFiles.subscribe(hasFiles => {
      if (this.selectedTab === 'Courriel') {
        this.canSend = hasFiles && this.mailFormValid;
      } else {
        if (this.selectedTab === 'Lien') {
          this.canSend = hasFiles && this.linkFormValid;
        }
      }
    });
  }




  triggerShowParameters() {
    this.showParameters = !this.showParameters;

  }

  startUpload() {
    this.uploadStarted.next(true);
  }

  ngOnDestroy(): void {
    if (this.fileManagerServiceSubscription) {
      this.fileManagerServiceSubscription.unsubscribe();
    }
    if (this.uploadManagerSubscription) {
      this.uploadManagerSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
