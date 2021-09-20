import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinkInfosModel, MailInfosModel, ParametersModel } from 'src/app/models';
import { FileManagerService, MailingListService, UploadManagerService } from 'src/app/services';

@Component({
  selector: 'ft-envelope',
  templateUrl: './envelope.component.html',
  styleUrls: ['./envelope.component.scss']
})
export class EnvelopeComponent implements OnInit, OnDestroy {

  @Output() uploadStarted: EventEmitter<boolean> = new EventEmitter();
  selectedTab: string = 'Mail';
  selectedTabIndex: number = 0;
  canSend: boolean = false;
  mailFormValid: boolean = false;
  linkFormValid: boolean = false;
  fileManagerServiceSubscription: Subscription;
  uploadManagerSubscription: Subscription;
  showParameters: boolean = false;
  mailFormValues: MailInfosModel;
  linkFormValues: LinkInfosModel;
  parametersFormValues: ParametersModel;

  constructor(private fileManagerService: FileManagerService,
    private uploadManagerService: UploadManagerService,
    private mailingListService: MailingListService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.uploadManagerSubscription = this.uploadManagerService.envelopeInfos.subscribe(_infos => {
      if(_infos) {
        if (_infos.type === 'mail') {
          this.mailFormValues = _infos
        }
        if (_infos.type === 'link') {
          this.linkFormValues = _infos
        }
        this.parametersFormValues = _infos.parameters;
        this.cdr.detectChanges();
      }      
    });
  }

  onSelectedTabChange(event) {
    this.selectedTab = event.tab.textLabel;
    this.selectedTabIndex = event.index;
  }

  onMailFormGroupChangeEvent(event) {
    this.mailFormValues = event.values;
    this.mailFormValues.to = event.destinataires;
    this.mailFormValid = event.isValid && this.selectedTab === 'Mail';
    this.checkCanSend();
  }

  onLinkFormGroupChangeEvent(event) {
    this.linkFormValues = event.values;
    this.linkFormValid = event.isValid && this.selectedTab === 'Lien';
    this.checkCanSend();
  }

  onParametersFormGroupChangeEvent(event) {
    this.parametersFormValues = event.values;
    if (this.selectedTab === 'Mail') {
      this.uploadManagerService.envelopeInfos.next({...this.mailFormValues, parameters: event.values});
    }
    if (this.selectedTab === 'Lien') {
      this.uploadManagerService.envelopeInfos.next({...this.linkFormValues, parameters: event.values});
    }
  }

  checkCanSend() {
    this.fileManagerServiceSubscription = this.fileManagerService.hasFiles.subscribe(hasFiles => {
      // console.log(`hasFiles: ${hasFiles} ; mailFormValid: ${this.mailFormValid} ; linkFormValid: ${this.linkFormValid}`)
      this.canSend = hasFiles && (this.mailFormValid || this.linkFormValid);
    });
  }

  triggerShowParameters() {
    this.showParameters = !this.showParameters;
  }

  startUpload() {
    console.log('GO !')
    if (this.selectedTab === 'Mail') {
      if (this.parametersFormValues) {
        this.mailFormValues.parameters = this.parametersFormValues;
      } else {
        this.mailFormValues.parameters = { expiryDays: 30,  password: ''}
      }
      this.uploadManagerService.envelopeInfos.next({ type: 'mail', ...this.mailFormValues });
      this.mailingListService.storeMailingList(this.mailFormValues.to);
    }
    if (this.selectedTab === 'Lien') {
      if (this.parametersFormValues) {
        this.linkFormValues.parameters = this.parametersFormValues;
      } else {
        this.linkFormValues.parameters = { expiryDays: 30,  password: ''}
      }
      this.uploadManagerService.envelopeInfos.next({ type: 'link', ...this.linkFormValues });
    }
    this.uploadStarted.next(true);
  }

  ngOnDestroy(): void {
    if (this.fileManagerServiceSubscription) {
      this.fileManagerServiceSubscription.unsubscribe();
    }
    if (this.uploadManagerSubscription) {
      this.uploadManagerSubscription.unsubscribe();
    }
  }
}
