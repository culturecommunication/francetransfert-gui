import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FTErrorModel } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {

  downloadError$: BehaviorSubject<FTErrorModel> = new BehaviorSubject<FTErrorModel>(null);

  constructor() { }
}
