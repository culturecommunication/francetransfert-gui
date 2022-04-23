import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginator extends MatPaginatorIntl {
  nextPageLabel: string;
  previousPageLabel: string;
  itemsPerPageLabel: string;
  constructor() {
    super();
    this.nextPageLabel = ' My new label for next page';
    this.previousPageLabel = ' My new label for previous page';
    this.itemsPerPageLabel = 'Task per screen';
  }
}