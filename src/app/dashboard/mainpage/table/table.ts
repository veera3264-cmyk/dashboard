import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { Purchase } from './table.model';
import { PurchaseService } from '../../../../services/purchase.service';
import { LocationService } from '../../../../services/location.service';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';

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
export class Table implements AfterViewInit, OnInit {

  constructor(
    private purchaseService: PurchaseService,
    private locationService: LocationService
  ) { }

  Groups: string[] = [];
  payments: string[] = [];
  invoices: string[] = [];

  allPurchases: Purchase[] = [];

  selectedGroup: string | null = '';
  selectedPayment: string | null = null;
  selectedVendor: string | null = '';
  selectedInvoices:string | null =null;
  searchInvoiceText: string | null=null;

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
    this.loadPurchase();
    this.getGroups();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadPurchase(): void {
    this.purchaseService.getPurchases()
      .subscribe({
        next: (data: Purchase[]) => {

          this.allPurchases = data;
          this.dataSource.data = data;

          this.getPayment();
          this.getAttachment()


        },
        error: (err) => console.error(err)
      });
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
  getAttachment(): void {
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
  onSearchVendor():void {
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
        purchase => purchase.invoice && purchase.invoice.trim() != ''
      )
    }
    if (this.selectedInvoices === 'Without Invoice') {
      filteredData = filteredData.filter(
        purchase => !purchase.invoice || purchase.invoice.trim() === ''
      )
    }
    const selectedVendor = this.selectedVendor?.trim();
    if (selectedVendor) {
      filteredData = filteredData.filter(
        purchase =>
          purchase.vendor?.toLowerCase()
            .includes(selectedVendor.toLowerCase())
      );
    }

    this.dataSource.data = filteredData;
  }
}