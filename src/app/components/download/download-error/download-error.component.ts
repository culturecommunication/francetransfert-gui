import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DownloadManagerService } from 'src/app/services/download-manager/download-manager.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'ft-download-error',
  templateUrl: './download-error.component.html',
  styleUrls: ['./download-error.component.scss']
})
export class DownloadErrorComponent implements OnInit {

  @Input() downloadAvailable: boolean;
  errorMessage: string;
  private onDestroy$: Subject<void> = new Subject();

  constructor(private downloadManagerService: DownloadManagerService,
    private translate: TranslateService,
    ) {
    this.downloadManagerService.downloadError$.pipe(takeUntil(this.onDestroy$)).subscribe((error) => {
      if (error && error.message == 'DOWNLOAD_LIMIT') {
        this.errorMessage = 'Nombre_Téléchargements_Dépassé';
      } else if (error && error.message == 'DELETED_ENCLOSURE') {
        this.errorMessage = 'Le pli demandé n\'existe pas.';
      } else if (error && error.message == 'HASH_INVALID') {
        this.errorMessage = 'Pli_Corrompu';
      } else {
        this.errorMessage = 'Erreur_Récupération_Pli.';
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
