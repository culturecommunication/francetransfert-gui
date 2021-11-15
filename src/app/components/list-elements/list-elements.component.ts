import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FileManagerService, MailingListService } from 'src/app/services';
import { ConfigService } from 'src/app/services/config/config.service';

@Component({
  selector: 'ft-list-elements',
  templateUrl: './list-elements.component.html',
  styleUrls: ['./list-elements.component.scss']
})
export class ListElementsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() component: 'upload' | 'download';
  @Input() transfers: Array<any>;
  @Input() flow: FlowDirective;
  @Input() screenWidth: string;
  @Output() listExpanded: EventEmitter<boolean> = new EventEmitter();
  filesSize: number = 0;
  fileSizeLimit: number = 1024 * 1024 * 1024 * 2;
  filesSizeLimit: number = 1024 * 1024 * 1024 * 20;
  errorMessage: string = '';
  expanded: boolean = false;
  mimetype: string[] = [];
  extension: string[] = [];
  flowAttributes: any;

  uploadSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef,
    private fileManagerService: FileManagerService,
    private configService: ConfigService) {

    this.configService.getConfig().pipe(take(1)).subscribe((config: any) => {
      this.mimetype = config.mimeType;
      this.extension = config.extension;
      //Not used yet to limit file selection
      this.flowAttributes = { accept: this.mimetype };
    })

  }

  ngOnInit(): void {
    if (this.component === 'download') {
      this.transfers.forEach(t => {
        this.filesSize += t.size;
      });
    }
  }

  ngAfterViewInit() {
    this.uploadSubscription = this.flow.events$.subscribe((event) => {
      if (event.type === 'filesSubmitted') {
        this.fileManagerService.transfers.next(this.flow.transfers$);
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this.uploadSubscription.unsubscribe();
  }

  /**
   * Returns transfer Id
   * @param {Transfer} transfer
   */
  trackTransfer(transfer: any): string {
    return transfer.id;
  }

  /**
   * Delete transfer
   * @param {Transfer} transfer
   * @returns {void}
   */
  deleteTransfer(transfer: Transfer): void {
    this.flow.cancelFile(transfer);
    this.filesSize -= transfer.size;
    this.fileManagerService.hasFiles.next(this.filesSize > 0);
    this.cdr.detectChanges();
    if (this.filesSize <= this.filesSizeLimit) {
      this.errorMessage = '';
    }
  }

  onItemAdded(event) {
    if (!this.checkExtentionValid(event)) {
      this.flow.cancelFile(event);
      this.errorMessage = 'Le type de fichier que vous avez essayé d\'ajouter n\'est pas autorisé';
    } else if (event.folder) {
      try {
        this.checkSize(event, this.filesSize);
        this.filesSize += event.size;
        this.fileManagerService.hasFiles.next(this.filesSize > 0);
        this.errorMessage = '';
        this.cdr.detectChanges();
      } catch (error) {
        // c'est un dossier
        for (let child of event.childs) {
          this.filesSize += child.size
          this.deleteTransfer(child);
        }
        if (this.filesSize < 0) {
          this.filesSize = 0;
        }
        this.fileManagerService.hasFiles.next(this.filesSize > 0);
        this.errorMessage = error.message;
        this.cdr.detectChanges();
        return;
      }
    } else {
      this.filesSize += event.size;
      if (this.filesSize <= this.filesSizeLimit) {
        this.fileManagerService.hasFiles.next(this.filesSize > 0);
        this.errorMessage = '';
        this.cdr.detectChanges();
      } else {
        this.filesSize -= event.size;
        this.flow.cancelFile(event);
        this.errorMessage = 'Le fichier que vous avez essayé d\'ajouter a dépassé la taille maximale du pli autorisée (20 Go)';
        this.cdr.detectChanges();
      }
    }
  }

  expandList() {
    this.expanded = !this.expanded;
    this.listExpanded.emit(this.expanded);
  }


  checkExtentionValid(event: any) {
    let valid = false;
    if (event?.name) {
      const fileExt = event.name.split('.').pop();
      // BlackList
      if (!this.extension.includes(fileExt)) {
        valid = true;
      }
    }
    return valid;
  }

  checkSize(fileEvent, size) {
    let tmpSize = size;
    //Si c'est un dossier on recurse en faisant la somme des tailles des fichiers
    if (fileEvent.folder) {
      for (let child of fileEvent.childs) {
        tmpSize += this.checkSize(child, tmpSize);
        if (tmpSize > this.filesSizeLimit) {
          throw new Error('Un fichier que vous avez essayé d\'ajouter a dépassé la taille maximale du pli autorisée (20 Go)');
        }
      }
    } else {
      // si le fichier est ok on return sa taille sinon on throw une erreur
      if (fileEvent.size > this.fileSizeLimit) {
        throw new Error('Un fichier que vous avez essayé d\'ajouter a dépassé la taille maximale autorisée (2 Go)');
      } else {
        return fileEvent.size;
      }
    }
    // on return la taille du dossier pour gérer le recurse
    return tmpSize;
  }
}

