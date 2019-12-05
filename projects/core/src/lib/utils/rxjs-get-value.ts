import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

export function getRxValue(observable: Observable<any>): Promise<any> {
  return observable.pipe(filter(hasValue), first()).toPromise();
}

function hasValue(value: any) {
  return value !== null && value !== undefined;
}
