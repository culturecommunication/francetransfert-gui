import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FileManagerService } from 'src/app/services';
import { FLOW_CONFIG } from 'src/app/shared/config/flow-config';

@Component({
  selector: 'ft-list-elements',
  templateUrl: './list-elements.component.html',
  styleUrls: ['./list-elements.component.scss']
})
export class ListElementsComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() component: 'upload' | 'download';
  @Input() transfers: Array<any>;
  @ViewChild('flow')
  flow: FlowDirective;
  flowConfig: any;
  filesSize: number = 0;

  uploadSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef, private fileManagerService: FileManagerService) { }

  ngOnInit(): void {
    this.flowConfig = FLOW_CONFIG;
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
        // this.flow.upload();
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
  }
  
  onItemAdded(event) {
    this.filesSize += event.size;
    this.fileManagerService.hasFiles.next(this.filesSize > 0);
    this.cdr.detectChanges();
  }
}
