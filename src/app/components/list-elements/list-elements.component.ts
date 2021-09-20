import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { FileManagerService, MailingListService } from 'src/app/services';

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

  uploadSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef, private fileManagerService: FileManagerService) { }

  ngOnInit(): void {
    if (this.component === 'download') {
      this.transfers.forEach(t => {
        this.filesSize += t.size;
      });
    }
  }

  ngAfterViewInit() {
    this.uploadSubscription = this.flow.events$.subscribe((event) => {
      console.log(event);
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
    if (event.size > this.fileSizeLimit) {
      this.flow.cancelFile(event);
      this.errorMessage = 'Le fichier que vous avez essayé d\'ajouter a dépassé la taille maximale autorisée (2 Go)';
    } else {
      this.filesSize += event.size;
      if (this.filesSize <= this.filesSizeLimit) {
        this.fileManagerService.hasFiles.next(this.filesSize > 0);
        this.cdr.detectChanges();
        this.errorMessage = '';
      } else {
        this.filesSize -= event.size;
        this.flow.cancelFile(event);
        this.errorMessage = 'Le fichier que vous avez essayé d\'ajouter a dépassé la taille maximale du pli autorisée (20 Go)';
      }
    }
  }

  expandList() {
    this.expanded = !this.expanded;
    this.listExpanded.emit(this.expanded);
  }
}
