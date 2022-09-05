import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Customer } from '../model/customer';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    constructor(private http: HttpClient) { }

    getCustomersLarge() {
        return this.http.get<any>('assets/customers-large.json')
            .pipe(
              map(res => <Customer[]> res.data)
            );
    }
}