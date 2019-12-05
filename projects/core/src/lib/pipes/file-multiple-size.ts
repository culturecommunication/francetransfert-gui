import { Pipe, PipeTransform } from '@angular/core';
import { Transfer } from '@flowjs/ngx-flow';
import { FTTransfer } from '../models/ft-transfers';

@Pipe({
  name: 'filemtpsize'
})
export class FileMultipleSizePipe implements PipeTransform {
  /**
   * Returns the somme of all transfers size.
   * @param {Array<FTTransfer<Transfer>>} transfers
   * @returns {number}
   */
  transform(transfers: Array<FTTransfer<Transfer>>): number {
    if (transfers === undefined || transfers === null) {
      transfers = [];
    }
    const somme = (accumulator, currentValue) => accumulator + currentValue.size;
    return transfers.reduce(somme, 0);
  }
}
