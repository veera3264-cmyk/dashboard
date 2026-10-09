import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Purchase } from './table.model';
import { PurchaseService } from '../../../../services/purchase.service';
import { LocationService } from '../../../../services/location.service';


@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements AfterViewInit, OnInit {
  




  constructor(private purchaseService: PurchaseService,
    private locationService: LocationService
  ) { }

  Groups: any[] = [];

  allPurchases: Purchase[] = [];

  selectedGroup = null;

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
        next: (data) => {

          this.dataSource.data = data;
          this.allPurchases = data;
          console.log(this.allPurchases)
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
              locations.map(location => location.organization)
            )
          ];
          console.log(this.Groups);
        },
        error: (err: Error) => console.error(err)
      });
  }
  onGroupChange(): void {


    if (!this.selectedGroup) {
      this.dataSource.data = this.allPurchases;
      return;
    }

    this.dataSource.data = this.allPurchases.filter(
      purchase => purchase.organization === this.selectedGroup
    );

    
  }
}



