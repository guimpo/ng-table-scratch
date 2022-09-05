import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { Representative } from 'src/app/model/representative';
import { CustomerService } from 'src/app/service/customer.service';
import { BehaviorSubject } from 'rxjs';
import { CustomerDataSource } from 'src/app/datasource/CustomerDataSource';

@Component({
  selector: 'app-table',
  templateUrl: './gtable.component.html',
  styleUrls: ['./gtable.component.scss']
})
export class GTableComponent implements OnInit {

  // itemPerPage: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  idSelected: BehaviorSubject<string> = new BehaviorSubject<string>("");

  displayedColumns: string[] = [
    'id',
    'name',
    'country',
    'company',
    'date',
    'status',
    'representative'
  ];

  customers!: CustomerDataSource;

  selectedCustomers!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customers = new CustomerDataSource(this.customerService);
    this.customers.load();

    this.representatives = [
      { name: "Amy Elsner", image: 'amyelsner.png' },
      { name: "Anna Fali", image: 'annafali.png' },
      { name: "Asiya Javayant", image: 'asiyajavayant.png' },
      { name: "Bernardo Dominic", image: 'bernardodominic.png' },
      { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
      { name: "Ioni Bowcher", image: 'ionibowcher.png' },
      { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
      { name: "Onyama Limba", image: 'onyamalimba.png' },
      { name: "Stephen Shaw", image: 'stephenshaw.png' },
      { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ]
  }

  idFilter(idFilterValue: string) {
    // console.log(idFilterValue);
    if (idFilterValue === "") return;
    this.idSelected.next(idFilterValue);
    this.customers.filter(idFilterValue);
  }

  itemPerpage(itemPerpage: string) {
    console.log(itemPerpage);
    this.customers.pageSize.next(Number(itemPerpage));
    this.customers.pageNumber.next(1);
    this.customers.filter(this.idSelected.value);
  }

  previous() {
    console.log('previous');
    let actualPage = this.customers.pageNumber.value;
    if (actualPage - 1 >= 1) {
      console.log(this.customers.pageNumber.value);
      this.customers.pageNumber.next(actualPage - 1);
      this.customers.filter(this.idSelected.value);
    }
  }
  
  next() {
    console.log('next');
    let actualPage = this.customers.pageNumber.value;
    let remainder = this.customers.source.value.length % this.customers.pageSize.value;
    let pages = this.customers.source.value.length / this.customers.pageSize.value;
    if (remainder !== 0) pages++;
    if (actualPage + 1 <= pages) {
      console.log(this.customers.pageNumber.value);
      this.customers.pageNumber.next(actualPage + 1);
      this.customers.filter(this.idSelected.value);
    }
  }
}

