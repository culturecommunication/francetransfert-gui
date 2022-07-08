/*
  * Copyright (c) Ministère de la Culture (2022) 
  * 
  * SPDX-License-Identifier: MIT 
  * License-Filename: LICENSE.txt 
  */


import { ChangeDetectorRef, Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { AdminService, ResponsiveService } from 'src/app/services';
import { LoginService } from 'src/app/services/login/login.service';
import { Subscription, take } from 'rxjs';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { PliRecuModel } from 'src/app/models/pli-recu.model';
@Component({
  selector: 'ft-plis-recus',
  templateUrl: './plis-recus.component.html',
  styleUrls: ['./plis-recus.component.scss']
})
export class PlisRecusComponent {



  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  responsiveSubscription: Subscription = new Subscription;
  empList: PliRecuModel[] = [];
  displayedColumns: string[] = ['dateReception', 'expediteur', 'objet', 'taille', 'finValidite', 'token'];
  dataSource = new MatTableDataSource<PliRecuModel>(this.empList);
  isMobile: boolean = false;
  lengthScreen: any;
  screenWidth: string;

  constructor(
    private _adminService: AdminService,
    private loginService: LoginService,
    private _router: Router,
    private responsiveService: ResponsiveService,
    private _translate: TranslateService,
  ) {
  }




  //-------------navigate token------------
  navigateTo(enclosureId: String) {
    this._router.navigate(['/download'], {
      queryParams: {
        enclosure: enclosureId
      },
      queryParamsHandling: 'merge',
    });
  }


  backToHome() {
    this._router.navigate(['/upload']);
  }



  ngOnInit(): void {


    this.empList = [];
    this.responsiveSubscription = this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile;
      this.screenWidth = this.responsiveService.screenWidth;

    });
    this.onResize();

    //---------------get infos--------------
    if (!this.loginService.isLoggedIn()) {
      this.navigateToConnect();
    } else {
      this._adminService.getPlisReceived(
        {
          receiverMail: this.loginService.tokenInfo.getValue().senderMail,
          senderToken: this.loginService.tokenInfo.getValue().senderToken
        }

      ).pipe(take(1)).subscribe(
        {
          next:
            fileInfos => {
              fileInfos.forEach(t => {


                const taillePli = t.totalSize.split(" ");


                //---------add to mat-table-------------
                this.empList.push({
                  dateReception: t.timestamp,
                  expediteur: t.senderEmail, objet: t.subject,
                  taille: taillePli[0], typeSize: taillePli[1], finValidite: t.validUntilDate,
                  enclosureId: t.enclosureId
                });

                this.dataSource.data = this.empList;
              });

            },
          error: (err) => {
            console.error(err);
            this.navigateToConnect();
          }
        });
    }
  }





  onResize() {
    this.responsiveService.checkWidth();
    if (this.screenWidth === 'lg') {
      this.lengthScreen = 150
    }
    else {
      this.lengthScreen = 50

    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToConnect() {
    this.loginService.logout();
  }

  navigateToLogin() {
    this._router.navigate(['/connect']);
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  get translate(): TranslateService {
    return this._translate;
  }

  ngOnDestroy() {
    this.responsiveSubscription.unsubscribe();
  }

}




