import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AdminService, ResponsiveService } from 'src/app/services';
import { LoginService } from 'src/app/services/login/login.service';
import { take } from 'rxjs';
import { PliModel } from 'src/app/models/pli.model';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs/internal/Subscription';

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
  responsiveSubscription: Subscription = new Subscription();
  isMobile;
  screenWidth;

  constructor(public translate: TranslateService,
    private _adminService: AdminService,
    private loginService: LoginService,
    private _router: Router,
    private responsiveService: ResponsiveService,
  ) {
    super();
    this.translate.onLangChange.subscribe((e: Event) => {
      this.getAndInitTranslations();
    });
    this.getAndInitTranslations();
  }

  navigateToConnect() {
    this.loginService.logout();
  }

  navigateToLogin() {
    this._router.navigate(['/connect']);
  }

  ngOnInit(): void {

    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.screenWidth = this.responsiveService.screenWidth;
    });

    if (!this.loginService.isLoggedIn()) {
      this.navigateToConnect();
    } else {
      //---------------get infos--------------
      this._adminService.getPlisSent(
        {
          senderMail: this.loginService.tokenInfo.getValue().senderMail,
          senderToken: this.loginService.tokenInfo.getValue().senderToken
        }

      ).pipe(take(1)).subscribe(
        {
          next: (fileInfos) => {
            {
              fileInfos.forEach(t => {
                //----------size of files------------

                //TODO MOVE THIS TO BACK
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

                const destinataires = t.recipientsMails.join(", ");
                //let destinataires = str.length > 150 ? str.substr(0, 150) + '...' : str;


                //---------add to mat-table-------------
                this.empList.push({
                  dateEnvoi: t.timestamp, type: type, objet: t.subject,
                  taille: tailleStr, finValidite: t.validUntilDate, destinataires: destinataires,
                  enclosureId: t.enclosureId, typeSize: typeSize
                });

                this.dataSource.data = this.empList;
              });

            }
          },
          error: (err) => {
            console.error(err);
            this.navigateToConnect();
          }
        }
      );
    }
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


  isLoggedIn() {
    return this.loginService.isLoggedIn();
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

  backToHome() {
    this._router.navigate(['/upload']);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.responsiveSubscription.unsubscribe();
  }

}




