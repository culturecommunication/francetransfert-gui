import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AdminService, DownloadService } from 'src/app/services';
import { LoginService } from 'src/app/services/login/login.service';
import { Subject, take, takeUntil } from 'rxjs';
import { PliModel } from 'src/app/models/pli.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'ft-plis-envoyes',
  templateUrl: './plis-envoyes.component.html',
  styleUrls: ['./plis-envoyes.component.scss']
})
export class PlisEnvoyesComponent extends MatPaginatorIntl {




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  OF_LABEL: any;
  fileInfos: any;
  taille: number;
  tailleFiles: number;
  tailleDirs: number;
  typeSize: string;
  empList: PliModel[] = [];
  connect: boolean;
  displayedColumns: string[] = ['dateEnvoi', 'type', 'objet', 'taille', 'finValidite', 'destinataires', 'token'];
  dataSource = new MatTableDataSource<PliModel>(this.empList);
  transfers: Array<any> = [];
  validUntilDate;
  public selectedDate: Date = new Date();
  maxDate = new Date();
  private onDestroy$: Subject<void> = new Subject();
  params: Array<{ string: string }>;
  token: string = this.loginService.tokenInfo.getValue().senderMail;


  constructor(public translate: TranslateService,
    private _adminService: AdminService,
    private loginService: LoginService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    super();
    this.translate.onLangChange.subscribe((e: Event) => {
      this.getAndInitTranslations();
    });
    this.getAndInitTranslations();
  }

  //----------traduction----------
  getAndInitTranslations() {
    this.translate.get(['ITEMS_PER_PAGE', 'NEXT_PAGE', 'PREVIOUS_PAGE', 'OF_LABEL', 'LAST_PAGE', 'FIRST_PAGE']).subscribe(translation => {
      this.itemsPerPageLabel = translation['ITEMS_PER_PAGE'];
      this.nextPageLabel = translation['NEXT_PAGE'];
      this.previousPageLabel = translation['PREVIOUS_PAGE'];
      this.lastPageLabel = translation['LAST_PAGE'];
      this.firstPageLabel = translation['FIRST_PAGE'];
      this.OF_LABEL = translation['OF_LABEL'];
      this.changes.next();
    });
  }






  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.OF_LABEL} ${length}`;
  };


  //-------------navigate token------------
  navigateTo(enclosureId: String) {

    this._router.navigate(['/admin'], {
      queryParams: {
        enclosure: enclosureId
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //---------------get infos--------------
    this._adminService.getPlisSent(
      {
        senderMail: this.loginService.tokenInfo.getValue().senderMail,
        senderToken: this.loginService.tokenInfo.getValue().senderToken
      }

    ).pipe(take(1)).subscribe(
      fileInfos => {
        this.fileInfos = fileInfos;
        fileInfos.forEach(t => {
          let customObj: PliModel;
          //----------size of files------------

          //TODO MOVE THIS TO BACK

          this.tailleFiles = t.size.reduce((a, b) => a + b, 0) / 1024;
          this.tailleDirs = t.sizeDir.reduce((a, b) => a + b, 0) / 1024;
          this.taille = this.tailleDirs + this.tailleFiles;
          if (this.taille >= 1100000) {
            customObj.taille = (this.taille / 1000000).toFixed(2);
            this.typeSize = 'GO';

          } else if (this.taille >= 1100) {
            customObj.taille = (this.taille / 1000).toFixed(2);
            this.typeSize = 'MO';
          }
          else {
            customObj.taille = this.taille.toFixed(2);
            this.typeSize = 'KO';

          }

          //-----------condition on type-----------
          if (t.recipientsMails != null && t.recipientsMails != '' && t.recipientsMails != undefined) {
            customObj.type = 'Courriel';

          }
          else {
            customObj.type = 'Lien';
          }



          var str = t.recipientsMails.join(", ");
          customObj.destinataires = str.length > 150 ? str.substr(0, 150) + '...' : str;


          //---------add to mat-table-------------
          this.empList.push({
            dateEnvoi: t.timestamp, type: customObj.type, objet: t.subject,
            taille: customObj.taille, finValidite: t.validUntilDate, destinataires: customObj.destinataires,
            enclosureId: t.enclosureId, typeSize: this.typeSize
          });
          this.dataSource.data = this.empList
        });

      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}




