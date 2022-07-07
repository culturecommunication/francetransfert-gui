/*
  * Copyright (c) Ministère de la Culture (2022)
  *
  * SPDX-License-Identifier: MIT
  * License-Filename: LICENSE.txt
  */

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
export class PlisEnvoyesComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  empList: PliModel[] = [];
  displayedColumns: string[] = ['dateEnvoi', 'type', 'objet', 'taille', 'finValidite', 'destinataires', 'token'];
  dataSource = new MatTableDataSource<PliModel>(this.empList);
  responsiveSubscription: Subscription = new Subscription();
  isMobile;
  screenWidth;

  constructor(
    private _adminService: AdminService,
    private loginService: LoginService,
    private _router: Router,
    private responsiveService: ResponsiveService,
    private _translate: TranslateService
  ) {
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


                //-----------condition on type-----------
                let type = "";
                if (t.recipientsMails != null && t.recipientsMails != '' && t.recipientsMails != undefined) {
                  type = 'Courriel';
                }
                else {
                  type = 'Lien';
                }

                const destinataires = t.recipientsMails.map(n => n.recipientMail).join(", ");

                const taillePli = t.totalSize.split(" ");
                //---------add to mat-table-------------
                this.empList.push({
                  dateEnvoi: t.timestamp, type: type, objet: t.subject,
                  taille: taillePli[0], typeSize: taillePli[1], finValidite: t.validUntilDate, destinataires: destinataires,
                  enclosureId: t.enclosureId
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


  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }



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

  get translate(): TranslateService {
    return this._translate;
  }

  ngOnDestroy() {
    this.responsiveSubscription.unsubscribe();
  }

}

