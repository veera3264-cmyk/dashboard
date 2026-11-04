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

import { AgingFilter, InvoiceFilter, TableFilters } from '../purchase-filters.model';
import { Purchase } from '../../../models/purchase.model';
import { PurchaseStatus } from '../../../models/purchaseStatus.model';

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
  readonly status = input<PurchaseStatus>('all');
  readonly purchases = input<Purchase[]>([]);
  readonly allPurchases = input<Purchase[]>([]);
  readonly filtersChanged = output<TableFilters>();
  readonly selectedPurchaseCountChanged = output<number>();

  readonly selectedPurchaseIds = signal<Set<number>>(new Set());
  readonly allVisiblePurchasesSelected = computed(() => {
    const visiblePurchases = this.purchases();
    const selectedIds = this.selectedPurchaseIds();

    return visiblePurchases.length > 0 &&
      visiblePurchases.every(purchase => selectedIds.has(purchase.id));
  });
  readonly someVisiblePurchasesSelected = computed(() => {
    const visiblePurchases = this.purchases();
    const selectedIds = this.selectedPurchaseIds();
    const selectedCount = visiblePurchases.filter(purchase => selectedIds.has(purchase.id)).length;

    return selectedCount > 0 && selectedCount < visiblePurchases.length;
  });
  readonly displayedColumns = computed(() => this.hasSelectionColumn()
    ? ['select', ...this.purchaseColumns]
    : this.purchaseColumns);
  readonly filterColumns = computed(() => this.hasSelectionColumn()
    ? ['filterSelect', ...this.purchaseFilterColumns]
    : this.purchaseFilterColumns);

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

  private readonly purchaseColumns = [
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
    'Action'
  ];

  private readonly purchaseFilterColumns = [
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
      const status = this.status();
      const visibleIds = new Set(this.purchases().map(purchase => purchase.id));
      const selectedIds = this.selectedPurchaseIds();
      const nextSelectedIds = status === 'all' || status === 'pending'
        ? new Set<number>()
        : new Set([...selectedIds].filter(id => visibleIds.has(id)));

      this.updateSelectedPurchaseIds(nextSelectedIds);
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
      this.updateSelectedPurchaseIds(new Set());
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

  hasSelectionColumn(): boolean {
    return this.status() !== 'all' && this.status() !== 'pending';
  }

  isPurchaseSelected(id: number): boolean {
    return this.selectedPurchaseIds().has(id);
  }

  onPurchaseSelectionChange(id: number, event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const selectedIds = new Set(this.selectedPurchaseIds());
    if (event.target.checked) {
      selectedIds.add(id);
    } else {
      selectedIds.delete(id);
    }
    this.updateSelectedPurchaseIds(selectedIds);
  }

  onSelectAllPurchasesChange(event: Event): void {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const selectedIds = new Set(this.selectedPurchaseIds());
    for (const purchase of this.purchases()) {
      if (event.target.checked) {
        selectedIds.add(purchase.id);
      } else {
        selectedIds.delete(purchase.id);
      }
    }
    this.updateSelectedPurchaseIds(selectedIds);
  }

  private updateSelectedPurchaseIds(selectedIds: Set<number>): void {
    const currentIds = this.selectedPurchaseIds();
    const unchanged = currentIds.size === selectedIds.size &&
      [...currentIds].every(id => selectedIds.has(id));
    if (unchanged) {
      return;
    }

    this.selectedPurchaseIds.set(selectedIds);
    this.selectedPurchaseCountChanged.emit(selectedIds.size);
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
