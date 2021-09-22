import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Transfer } from '@flowjs/ngx-flow';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FTTransferModel } from 'src/app/models';
import { AdminService } from 'src/app/services';
import { AdminAlertDialogComponent } from './admin-alert-dialog/admin-alert-dialog.component';

@Component({
  selector: 'ft-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  private onDestroy$: Subject<void> = new Subject();
  params: Array<{ string: string }>;
  fileInfos: any;
  transfers: Array<any> = [];
  validUntilDate;
  minDate = new Date();
  maxDate = new Date();
  errorMessage = '';
  adminErrorsSubscription: Subscription;

  constructor(private _adminService: AdminService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this._activatedRoute.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe((params: Array<{ string: string }>) => {
      this.params = params;
      if (this.params['enclosure'] && this.params['token']) {
        this._adminService
          .getFileInfos(params)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(fileInfos => {
            this.fileInfos = fileInfos;
            this.fileInfos.rootFiles.map(file => {
              this.transfers.push({ ...file, folder: false } as FTTransferModel<Transfer>);
            });
            this.fileInfos.rootDirs.map(file => {
              this.transfers.push({ ...file, size: file.totalSize, folder: true } as FTTransferModel<Transfer>);
            });
            this.validUntilDate = new FormControl(new Date(this.fileInfos.validUntilDate));
            let temp = new Date(this.fileInfos.timestamp);
            this.maxDate.setDate(temp.getDate() + 90);
          });
      } else {
        this._router.navigateByUrl('/error');
      }
    });
    this.adminErrorsSubscription = this._adminService.adminError$.subscribe(err => {
      if (err === 401) {
        this.errorMessage = 'Le pli demandé n\'existe pas';
      }
    });
  }

  onPickerClose() {
    // call api + reload   
    let formattedDate = moment(this.validUntilDate.value).format('DD-MM-yyyy');
    const body = {
      "enclosureId": this.params['enclosure'],
      "token": this.params['token'],
      "newDate": formattedDate
    }
    this._adminService
      .updateExpiredDate(body)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(response => {
        if (response) {
          window.location.reload();
        }
      });
  }

  deleteFile() {
    const dialogRef = this.dialog.open(AdminAlertDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._adminService
          .deleteFile(this.params)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe(response => {
            if (response) {
              this._router.navigate(['/upload']);
            }
          });
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.adminErrorsSubscription.unsubscribe();
  }

}
