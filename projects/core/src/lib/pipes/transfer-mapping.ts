import { Pipe, PipeTransform } from "@angular/core";
import { Transfer } from "@flowjs/ngx-flow";
import { FTTransfer } from "../models/ft-transfers";
@Pipe({
  name: "tm"
})
export class TransfersMappingPipe implements PipeTransform {
  /**
   * Mapping Transfers to show Folders
   * @param {Array<Transfer>} transfers
   * @returns {Array<FTTransfer<Transfer>>}
   */
  transform(transfers: Array<Transfer>): Array<FTTransfer<Transfer>> {
    let transformTransfers: Array<FTTransfer<Transfer>> = [];
    transfers.forEach((transfer: Transfer) => {
      if (transfer.flowFile.relativePath !== transfer.flowFile.name) {
        let folderName = transfer.flowFile.relativePath.split("/")[0];
        let folderIndex = transformTransfers.findIndex(
          (transferIndex: Transfer) => transferIndex.name === folderName
        );
        if (transformTransfers[folderIndex]) {
          transformTransfers[folderIndex] = {
            ...transformTransfers[folderIndex],
            size: transformTransfers[folderIndex].size + transfer.size,
            childs:
              transformTransfers[folderIndex].childs.push(transfer) &&
              transformTransfers[folderIndex].childs
          };
        } else {
          transformTransfers.push({
            ...new FTTransfer<Transfer>(folderName, transfer.size, transfer)
          });
        }
      } else {
        transformTransfers.push({
          ...transfer,
          folder: false
        });
      }
    });
    return transformTransfers;
  }
}
