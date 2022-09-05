import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';

export class CustomerDataSource extends DataSource<Customer> {

  source = new BehaviorSubject<Customer[]>([]);
  stream!: BehaviorSubject<Customer[]>;
  pageSize: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  pageNumber: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private customerService: CustomerService) {
    super();
  }
  
  connect(): Observable<Customer[]> {
    return this.source.asObservable();
  }

  disconnect() {
    this.source.complete();
    this.loadingSubject.complete();
  }

  load() {
    this.loadingSubject.next(true);
    this.customerService.getCustomersLarge()
    .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(customers => {
      this.source.next(customers);
      let p = this.paginate2(this.source.value)
      this.stream = new BehaviorSubject<Customer[]>(p);
    });
  }

  filter(idFilterValue: string) {
    this.source.pipe(
      map((cl: Customer[]) => {
        return cl.filter((c: Customer) => {
          return c.id?.toString().trim().toLowerCase().includes(idFilterValue);
        });
      })
    )
    .subscribe((arr: Customer[]) => {
      let p = this.paginate2(arr);
      if (p.length === 0) return;
      this.stream.next(p);
    });   
  }

  paginate2(arr: Customer[]) {
    return arr.slice((this.pageNumber.value - 1) * this.pageSize.value, this.pageNumber.value * this.pageSize.value);
  }
}