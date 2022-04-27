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
  empList: PliModel[] = [];
  displayedColumns: string[] = ['dateEnvoi', 'type', 'objet', 'taille', 'finValidite', 'destinataires', 'token'];
  dataSource = new MatTableDataSource<PliModel>(this.empList);


  constructor(public translate: TranslateService,
    private _adminService: AdminService,
    private loginService: LoginService,
    private _router: Router,
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
  navigateTo(enclosureId: String, receiverToken) {

    //this._router.navigate(['/admin'], { state: { example: 'bar' } });

    console.log("tokenChoisi:", receiverToken )
    this._adminService.setReceiverToken(receiverToken);

    this._router.navigate(['/admin'], {
      queryParams: {
        enclosure: enclosureId
      },
      state: {
        //receiverToken: receiverToken
        example: receiverToken
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {


    if (!this.loginService.isLoggedIn()) {
      this._router.navigate(['/connect']);
    }
    //---------------get infos--------------
    this._adminService.getPlisSent(
      {
        senderMail: this.loginService.tokenInfo.getValue().senderMail,
        senderToken: this.loginService.tokenInfo.getValue().senderToken
      }

    ).pipe(take(1)).subscribe(
      fileInfos => {
        fileInfos.forEach(t => {
          //----------size of files------------

          //TODO MOVE THIS TO BACK

          let files = t.rootFiles.map(n => n.name);
          let size = t.rootFiles.map(n => n.size);
          let sizeDir = t.rootDirs.map(n => n.totalSize);

          let tailleFiles = size.reduce((a, b) => a + b, 0) / 1024;
          let tailleDirs = sizeDir.reduce((a, b) => a + b, 0) / 1024;
          let taille = tailleDirs + tailleFiles;
          let tailleStr = "";
          let typeSize = 'Go';
          if (taille >= 1100000) {
            tailleStr = (taille / 1000000).toFixed(2);
            typeSize = 'Go';

          } else if (taille >= 1100) {
            tailleStr = (taille / 1000).toFixed(2);
            typeSize = 'Mo';
          }
          else {
            tailleStr = taille.toFixed(2);
            typeSize = 'Ko';
          }

          //-----------condition on type-----------
          let type = "";
          if (t.recipientsMails != null && t.recipientsMails != '' && t.recipientsMails != undefined) {
            type = 'Courriel';
          }
          else {
            type = 'Lien';
          }



          var str = t.recipientsMails.join(", ");
          let destinataires = str.length > 150 ? str.substr(0, 150) + '...' : str;

          console.log('tokenInfos: ', t.token)

                //---------add to mat-table-------------
                this.empList.push({
                  dateEnvoi: t.timestamp, type: type, objet: t.subject,
                  taille: tailleStr, finValidite: t.validUntilDate, destinataires: destinataires,
                  enclosureId: t.enclosureId, typeSize: typeSize,  receiverToken: t.token,
                });


          this.dataSource.data = this.empList;
        });

      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}




