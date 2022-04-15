import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ft-plis-envoyes',
  templateUrl: './plis-envoyes.component.html',
  styleUrls: ['./plis-envoyes.component.scss']
})
export class PlisEnvoyesComponent extends MatPaginatorIntl implements AfterViewInit {


  displayedColumns: string[] = ['dateEnvoi', 'type', 'objet', 'taille', 'finValidite', 'destinataires'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  OF_LABEL: any;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private translate: TranslateService) {
    super();
   this.translate.onLangChange.subscribe((e: Event) => {
    this.getAndInitTranslations();
  });
  this.getAndInitTranslations();
}


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



  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  //dateEnvoi: Date;
  dateEnvoi: string;
  type: string;
  objet: string;
  taille: string;
  finValidite: string; // Date;
  destinataires: string;


}

const ELEMENT_DATA: PeriodicElement[] = [
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Courriel', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Lien', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Courriel', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Lien', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Lien', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Lien', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Courriel', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Courriel', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },  {dateEnvoi: '12/04/2022  12:35​',  type: 'Lien', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Lien', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Lien', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Courriel', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },
  {dateEnvoi: '12/04/2022  12:35​',  type: 'Courriel', objet: 'Dossier candidature', taille: '35 Mo', finValidite: '12/05/2022', destinataires: 'jean@wanadoo.fr' },


];
