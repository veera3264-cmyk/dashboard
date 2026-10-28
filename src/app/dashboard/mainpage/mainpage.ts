import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DateRangeFilter, EMPTY_SEARCH_CRITERIA_FILTERS, EMPTY_TABLE_FILTERS, SearchCriteriaFilters, TableFilters } from './purchase-filters.model';
import { Purchase } from '../../models/purchase.model';
import { PurchaseStatus } from '../../models/purchaseStatus.model';
import { PurchaseService } from '../../../services/purchase.service';
import { Datepicker } from './datepicker/datepicker';
import { SearchCriteria } from './searchcreteria/searchcreteria';
import { Tabsets } from './tabsets/tabsets';
import { Table } from './table/table';

function parsePurchaseDate(value: string | null): Date | null {
  if (!value) {
    return null;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(value);
  if (!match) {
    return null;
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function isWithinRange(value: string | null, range: DateRangeFilter): boolean {
  const date = parsePurchaseDate(value);
  if (!date) {
    return false;
  }

  const startDate = new Date(range.startDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(range.endDate);
  endDate.setHours(23, 59, 59, 999);

  return date >= startDate && date <= endDate;
}

@Component({
  selector: 'app-mainpage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Datepicker, SearchCriteria, Tabsets, Table],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.css'
})
export class Mainpage implements OnInit {
  private readonly purchaseService = inject(PurchaseService);

  readonly purchases = signal<Purchase[]>([]);
  readonly isLoading = signal(true);
  readonly loadError = signal<string | null>(null);
  readonly resetToken = signal(0);
  readonly dateRange = signal<DateRangeFilter | null>(null);
  readonly searchFilters = signal<SearchCriteriaFilters>(EMPTY_SEARCH_CRITERIA_FILTERS);
  readonly tableFilters = signal<TableFilters>(EMPTY_TABLE_FILTERS);
  readonly selectedStatus = signal<PurchaseStatus>('all');
  readonly selectedPurchaseCount = signal(0);

  readonly filteredPurchases = computed(() => {
    const locationFilters = this.searchFilters();
    const tableFilters = this.tableFilters();
    const selectedStatus = this.selectedStatus();
    const dateRanges = [
      this.dateRange(),
      locationFilters.purchaseDateRange
    ].filter((range): range is DateRangeFilter => range !== null);

    return this.purchases().filter(purchase => {
      if (
        selectedStatus !== 'all' &&
        normalizePurchaseStatus(purchase.status) !== normalizePurchaseStatus(selectedStatus)
      ) {
        return false;
      }

      if (
        locationFilters.locationId !== null &&
        String(purchase.locationId) !== locationFilters.locationId
      ) {
        return false;
      }

      if (dateRanges.some(range => !isWithinRange(purchase.purchaseDate, range))) {
        return false;
      }

      if (
        locationFilters.invoiceDateRange &&
        !isWithinRange(purchase.invoiceDate, locationFilters.invoiceDateRange)
      ) {
        return false;
      }

      if (
        tableFilters.organization &&
        purchase.organization !== tableFilters.organization
      ) {
        return false;
      }

      if (tableFilters.payment && purchase.payment !== tableFilters.payment) {
        return false;
      }

      if (tableFilters.aging) {
        const age = purchase.aging;
        if (age === null) {
          return false;
        }

        const matchesAging = {
          under4: age < 4,
          '4to8': age >= 4 && age < 8,
          '8to24': age >= 8 && age <= 24,
          over24: age > 24
        }[tableFilters.aging];

        if (!matchesAging) {
          return false;
        }
      }

      if (tableFilters.invoice === 'with' && !purchase.invoice?.trim()) {
        return false;
      }

      if (tableFilters.invoice === 'without' && purchase.invoice?.trim()) {
        return false;
      }

      const vendorFilter = tableFilters.vendor.trim().toLowerCase();
      if (vendorFilter && !purchase.vendor.toLowerCase().includes(vendorFilter)) {
        return false;
      }

      if (
        tableFilters.possibleDuplicatesOnly &&
        !['y', 'yes', 'true', '1'].includes(
          purchase.possibleDuplicate?.trim().toLowerCase() ?? ''
        )
      ) {
        return false;
      }

      return true;
    });
  });

  ngOnInit(): void {
    this.purchaseService.getPurchases().subscribe({
      next: purchases => {
        this.purchases.set(purchases);
        this.isLoading.set(false);
      },
      error: error => {
        console.error('Could not load purchases for the dashboard.', error);
        this.loadError.set('Purchases could not be loaded. Please try again later.');
        this.isLoading.set(false);
      }
    });
  }

  onDateSelected(range: DateRangeFilter | null): void {
    this.dateRange.set(range);
  }

  onSearchFiltersChanged(filters: SearchCriteriaFilters): void {
    this.searchFilters.set(filters);
  }

  onTableFiltersChanged(filters: TableFilters): void {
    this.tableFilters.update(current => ({
      ...current,
      ...filters,
      possibleDuplicatesOnly: current.possibleDuplicatesOnly
    }));
  }

  onPossibleDuplicatesChanged(showOnly: boolean): void {
    this.tableFilters.update(current => ({
      ...current,
      possibleDuplicatesOnly: showOnly
    }));
  }

  onStatusChanged(status: PurchaseStatus): void {
    this.selectedStatus.set(status);
  }

  onSelectedPurchaseCountChanged(count: number): void {
    this.selectedPurchaseCount.set(count);
  }

  onClearAllFilters(): void {
    this.dateRange.set(null);
    this.searchFilters.set(EMPTY_SEARCH_CRITERIA_FILTERS);
    this.tableFilters.set(EMPTY_TABLE_FILTERS);
    this.selectedStatus.set('all');
    this.selectedPurchaseCount.set(0);
    this.resetToken.update(token => token + 1);
  }
}

function normalizePurchaseStatus(status: string | null | undefined): string {
  return (status ?? '').replace(/[\s_-]/g, '').toLowerCase();
}
