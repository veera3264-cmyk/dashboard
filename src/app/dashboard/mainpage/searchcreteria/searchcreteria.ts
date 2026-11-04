import { ChangeDetectionStrategy, Component, OnInit, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { LocationService } from '../../../../services/location.service';
import {
  DateRangeFilter,
  SearchCriteriaFilters
} from '../purchase-filters.model';
import { Location } from '../../../models/location.model';

@Component({
  selector: 'app-search-criteria',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './searchcreteria.html',
  styleUrl: './searchcreteria.css'
})
export class SearchCriteria implements OnInit {
  private readonly locationService = inject(LocationService);

  readonly filtersChanged = output<SearchCriteriaFilters>();
  readonly clearAllRequested = output<void>();
  readonly locations = signal<Location[]>([]);
  readonly locationError = signal<string | null>(null);
  readonly selectedLocation = signal<string | null>(null);
  readonly purchaseStartDate = signal<Date | null>(null);
  readonly purchaseEndDate = signal<Date | null>(null);
  readonly invoiceStartDate = signal<Date | null>(null);
  readonly invoiceEndDate = signal<Date | null>(null);

  ngOnInit(): void {
    this.locationService.getLocation().subscribe({
      next: locations => this.locations.set(locations),
      error: error => {
        console.error('Could not load locations for search criteria.', error);
        this.locationError.set('Locations could not be loaded.');
      }
    });
  }

  emitFilters(): void {
    this.filtersChanged.emit({
      locationId: this.selectedLocation(),
      purchaseDateRange: this.toDateRange(
        this.purchaseStartDate(),
        this.purchaseEndDate()
      ),
      invoiceDateRange: this.toDateRange(
        this.invoiceStartDate(),
        this.invoiceEndDate()
      )
    });
  }

  onClear(): void {
    this.selectedLocation.set(null);
    this.purchaseStartDate.set(null);
    this.purchaseEndDate.set(null);
    this.invoiceStartDate.set(null);
    this.invoiceEndDate.set(null);
    this.clearAllRequested.emit();
  }

  clearLocation(event: MouseEvent): void {
    event.stopPropagation();
    this.selectedLocation.set(null);
    this.emitFilters();
  }

  private toDateRange(
    startDate: Date | null,
    endDate: Date | null
  ): DateRangeFilter | null {
    if (!startDate || !endDate || startDate > endDate) {
      return null;
    }

    return { startDate, endDate };
  }
}
