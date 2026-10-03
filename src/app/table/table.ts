import { Component } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';




interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements AfterViewInit {
  displayedColumns: string[] = [
    'Groups',
    'Location',
    'PurchaseDate',
    'InvoiceDate',
    'InvoiceAmount',
    'Vendor',
    'Payment',
    'Invoice',
    'Comments',
    'CreatedOn',
    'Aging',
    'PossibleDuplicate',
    'Action'
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  Groups: string;
  Location: string;
  PurchaseDate: string;
  InvoiceDate: string;
  InvoiceAmount: number;
  Vendor: string;
  Payment: string;
  Invoice: string;
  Comments: string;
  CreatedOn: string;
  Aging: number;
  PossibleDuplicate: string;
  Action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
   {
    Groups: 'SOM',
    Location: 'Bangalore',
    PurchaseDate: '12/12/2022',
    InvoiceDate: '12/12/2022',
    InvoiceAmount: 1000,
    Vendor: 'Vendor A',
    Payment: 'Paid',
    Invoice: 'INV123',
    Comments: 'No comments',
    CreatedOn: '12/12/2022',
    Aging: 5,
    PossibleDuplicate: 'No',
    Action: 'View'
  },
];

