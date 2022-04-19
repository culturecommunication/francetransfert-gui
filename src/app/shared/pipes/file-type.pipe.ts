import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UploadService } from 'src/app/services';

@Pipe({
  name: 'filetype'
})
export class FileTypePipe implements PipeTransform {
  changes: any;
  file = '';
  langueSelected: String;
  /**
   * Returns the type of the file
   * @param {string} filename
   * @returns {string}
   */
   constructor(
    private uploadService: UploadService,
    private translate: TranslateService) {


}




  transform(filename: string = ''): string {

    this.uploadService.langueCourriels.subscribe(langueSelected => {
      this.langueSelected = langueSelected;
    });

    let type: string = 'Pas de type';
    if (!!filename && filename !== undefined) {

      let segments: Array<string> = filename.split('.');
      if (segments.length > 1) {

        if(this.langueSelected == 'en-US'){
          type = ` ${segments[segments.length - 1]} ` + `${this.translate.instant('FichierType')}`  ;
        }else{
        type = `${this.translate.instant('FichierType')}`  + ` ${segments[segments.length - 1]}`;
        }
      }
      else{
        type = null;
      }
    }
    return type;
  }
}
