import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { EnvelopeInfosModel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UploadManagerService {

  envelopeInfos: BehaviorSubject<EnvelopeInfosModel> = new BehaviorSubject<EnvelopeInfosModel>(null);

  constructor() { }
}
