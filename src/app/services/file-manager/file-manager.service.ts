import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class FileManagerService {

  hasFiles: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
