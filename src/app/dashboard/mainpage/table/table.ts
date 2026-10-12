import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input
} from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { Purchase } from './table.model';
import { LocationService } from '../../../../services/location.service';
import { ChangeDetectorRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnInit, AfterViewInit, OnChanges {

  @Input() purchases: Purchase[] = [];
  @Input()
  selectedRange: {
    startDate: Date;
    endDate: Date;
  } | null = null;


  constructor(
    private locationService: LocationService,
    private cd: ChangeDetectorRef
  ) { }

  Groups: string[] = [];
  payments: string[] = [];
  invoices: string[] = [];

  allPurchases: Purchase[] = [];

  selectedGroup: string | null = '';
  selectedPayment: string | null = null;
  selectedVendor: string | null = '';
  selectedInvoices: string | null = null;
  selectedDatePurchase: string | null = null;
  searchInvoiceText: string | null = null;



  displayedColumns: string[] = [
    'Groups',
    'Location',
    'PurchaseDate',
    'PurchaseAmount',
    'InvoiceDate',
    'InvoiceAmount',
    'Vendor',
    'Payment',
    'Invoice',
    'Comments',
    'CreatedOn',
    'Aging',
    'PossibleDuplicate',
    'Action',
  ];

  filterColumns: string[] = [
    'filterGroups',
    'filterLocation',
    'filterPurchaseDate',
    'filterPurchaseAmount',
    'filterInvoiceDate',
    'filterInvoiceAmount',
    'filterVendor',
    'filterPayment',
    'filterInvoice',
    'filterComments',
    'filterCreatedOn',
    'filterAging',
    'filterPossibleDuplicate',
    'filterAction',
  ];

  dataSource = new MatTableDataSource<Purchase>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.getGroups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['purchases']) {

      setTimeout(() => {
        this.allPurchases = [...this.purchases];
        this.dataSource.data = [...this.purchases];

        

        this.getPayment();
        this.getAttachment();
      });
      this.cd.detectChanges();
    }

    if (changes['selectedRange']) {
      console.log(this.selectedRange)
      this.applyFilters();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private getGroups(): void {
    this.locationService.getGroups()
      .subscribe({
        next: (locations: any[]) => {
          this.Groups = [
            ...new Set(
              locations
                .map(location => location.organization)
                .filter(org => org)
            )
          ];
        },
        error: (err) => console.error(err)
      });
  }

  private getPayment(): void {
    this.payments = [
      ...new Set(
        this.allPurchases
          .map(purchase => purchase.payment)
          .filter(payment => payment)
      )
    ];
  }

  private getAttachment(): void {
    this.invoices = [
      ...new Set(
        this.allPurchases
          .map(purchase => purchase.invoice)
          .filter(invoice => invoice)
      )
    ];
  }

  onGroupChange(): void {
    this.applyFilters();
  }

  onPaymentChange(): void {
    this.applyFilters();
  }

  onSearchVendor(): void {
    this.applyFilters();
  }

  ongetAttachment(): void {
    this.applyFilters();
  }



  applyFilters(): void {

    let filteredData = [...this.allPurchases];

    if (this.selectedGroup) {
      filteredData = filteredData.filter(
        purchase => purchase.organization === this.selectedGroup
      );
    }

    if (this.selectedPayment) {
      filteredData = filteredData.filter(
        purchase => purchase.payment === this.selectedPayment
      );
    }

    if (this.selectedInvoices === 'With Invoice') {
      filteredData = filteredData.filter(
        purchase => purchase.invoice &&
          purchase.invoice.trim() !== ''
      );
    }

    if (this.selectedInvoices === 'Without Invoice') {
      filteredData = filteredData.filter(
        purchase => !purchase.invoice ||
          purchase.invoice.trim() === ''
      );
    }

    const selectedVendor = this.selectedVendor?.trim();

    if (selectedVendor) {
      filteredData = filteredData.filter(
        purchase =>
          purchase.vendor?.toLowerCase()
            .includes(selectedVendor.toLowerCase())
      );
    }

    if (this.selectedRange) {

      const startDate = new Date(this.selectedRange.startDate);
      startDate;

      const endDate = new Date(this.selectedRange.endDate);
      endDate;

      filteredData = filteredData.filter(purchase => {

        const purchaseDate = new Date(purchase.createdOn);
        
        return (
          purchaseDate >= startDate &&
          purchaseDate <= endDate
        );
        

      });
    

    }


    this.dataSource.data = filteredData;
  }
} 