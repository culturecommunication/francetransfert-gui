import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackgroundSelectionService {

  constructor() { }

  getBackground(): string {
    return '../assets/images/image_fond.min.png';
  }
}
