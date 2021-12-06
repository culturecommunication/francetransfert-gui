import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DownloadManagerService } from 'src/app/services/download-manager/download-manager.service';

@Component({
  selector: 'ft-download-error',
  templateUrl: './download-error.component.html',
  styleUrls: ['./download-error.component.scss']
})
export class DownloadErrorComponent implements OnInit {

  @Input() downloadAvailable: boolean;
  errorMessage: string;
  private onDestroy$: Subject<void> = new Subject();

  constructor(private downloadManagerService: DownloadManagerService) {
    this.downloadManagerService.downloadError$.pipe(takeUntil(this.onDestroy$)).subscribe((error) => {
      if (error && error.message == 'DOWNLOAD_LIMIT') {
        this.errorMessage = 'Vous avez dépassé le nombre de téléchargements autorisé pour ce pli';
      } else {
        this.errorMessage = 'Le pli demandé n\'existe pas.';
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
