import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  computed,
  effect,
  input,
  output,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { AgingFilter,InvoiceFilter, TableFilters} from '../../../../model/purchase-filter.model';
import { Purchase } from '../../../../model/purchase.model';

@Component({
  selector: 'app-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    FormsModule
  ],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements AfterViewInit {
  readonly resetToken = input(0);
  readonly purchases = input<Purchase[]>([]);
  readonly allPurchases = input<Purchase[]>([]);
  readonly filtersChanged = output<TableFilters>();

  readonly groups = computed(() => this.uniqueValues(
    this.allPurchases().map(purchase => purchase.organization)
  ));
  readonly payments = computed(() => this.uniqueValues(
    this.allPurchases().map(purchase => purchase.payment)
  ));

  readonly selectedGroup = signal('');
  readonly selectedPayment = signal('');
  readonly selectedVendor = signal('');
  readonly selectedInvoices = signal<InvoiceFilter>(null);
  readonly selectedAging = signal<AgingFilter>(null);

  readonly displayedColumns = [
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
    'Action'
  ];

  readonly filterColumns = [
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
    'filterAction'
  ];

  readonly dataSource = new MatTableDataSource<Purchase>([]);

  @ViewChild(MatPaginator)
  private paginator?: MatPaginator;

  private lastResetToken = 0;

  constructor() {
    effect(() => {
      this.dataSource.data = this.purchases();
      this.paginator?.firstPage();
    });

    effect(() => {
      const resetToken = this.resetToken();
      if (resetToken === this.lastResetToken) {
        return;
      }

      this.lastResetToken = resetToken;
      this.selectedGroup.set('');
      this.selectedPayment.set('');
      this.selectedVendor.set('');
      this.selectedInvoices.set(null);
      this.selectedAging.set(null);
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  onGroupChange(value: string): void {
    this.selectedGroup.set(value);
    this.emitFilters();
  }

  onPaymentChange(value: string): void {
    this.selectedPayment.set(value);
    this.emitFilters();
  }

  onVendorChange(value: string): void {
    this.selectedVendor.set(value);
    this.emitFilters();
  }

  onInvoiceChange(value: string): void {
    this.selectedInvoices.set(value === 'with' || value === 'without' ? value : null);
    this.emitFilters();
  }

  onAgingChange(value: string): void {
    const filter: AgingFilter =
      value === 'under4' || value === '4to8' || value === '8to24' || value === 'over24'
        ? value
        : null;
    this.selectedAging.set(filter);
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChanged.emit({
      organization: this.selectedGroup() || null,
      payment: this.selectedPayment() || null,
      invoice: this.selectedInvoices(),
      vendor: this.selectedVendor(),
      aging: this.selectedAging(),
      possibleDuplicatesOnly: false
    });
  }

  private uniqueValues(values: Array<string | null | undefined>): string[] {
    return [...new Set(values.filter((value): value is string => Boolean(value)))].sort();
  }
}
