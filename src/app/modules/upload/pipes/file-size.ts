import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filesize"
})
export class FileSizePipe implements PipeTransform {
  private units: Array<string> = ["Oct", "Ko", "Mo", "Go"];

  /**
   * Returns the size of the file with unit.
   * @param {number} bytes
   * @param {number} precision
   * @returns {string}
   */
  transform(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) return "?";

    let unit: number = 0;

    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }

    return `${bytes.toFixed(+precision)} ${this.units[unit]}`;
  }
}
