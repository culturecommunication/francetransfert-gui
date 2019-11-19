import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filetype"
})
export class FileTypePipe implements PipeTransform {
  /**
   * Returns the type of the file
   * @param {string} filename
   * @returns {string}
   */
  transform(filename: string = ""): string {
    let type: string = "Pas de type";
    if (!!filename && filename !== undefined) {
      let segments: Array<string> = filename.split(".");
      if (segments.length > 1) {
        type = `Fichier ${segments[segments.length - 1]}`;
      }
    }
    return type;
  }
}
