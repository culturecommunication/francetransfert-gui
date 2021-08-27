import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DownloadManagerService {

  downloadError$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor() { }
}
