import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { LocationService } from '../../../../services/location.service';
import { PurchaseService } from '../../../../services/purchase.service';

@Component({
  selector: 'app-search-criteria',
  standalone: true,
  imports: [
    CommonModule,
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

  locations: any[] = [];
  purchases: any[] = [];
  allPurchases: any[] = [];

  selectedLocation: string | null = null;

  purchaseStartDate: Date | null = null;
  purchaseEndDate: Date | null = null;

  invoiceStartDate: Date | null = null;
  invoiceEndDate: Date | null = null;

  @Output()  purchasesFiltered = new EventEmitter<any[]>();

  constructor(
    
    private locationService: LocationService,
    private purchaseService: PurchaseService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(): void {
    this.locationService.getLocation().subscribe({
      next: (locations) => {
        this.locations = locations;

        this.getPurchases();

        this.cd.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  private getPurchases(): void {
    this.purchaseService.getPurchases()
    .subscribe({
      next: (purchases) => {
        this.allPurchases = purchases;
        this.purchases = [...purchases];

        setTimeout(() => {
          this.purchasesFiltered.emit(this.purchases);
        });
      },
      error: (err) => console.error(err)
    });
  }

  onLocationSelected(): void {
    
    if (!this.selectedLocation) {
      this.purchases = [...this.allPurchases];
    } else {
      this.purchases = this.allPurchases.filter(
        purchase => purchase.locationId === this.selectedLocation
      );
    }

    this.purchasesFiltered.emit(this.purchases);
  }

  


  onClear(): void {
    this.selectedLocation = null;

    this.purchaseStartDate = null;
    this.purchaseEndDate = null;

    this.invoiceStartDate = null;
    this.invoiceEndDate = null;

    this.purchases = [...this.allPurchases];

    this.purchasesFiltered.emit(this.purchases);
  }

  clearLocation(event: MouseEvent): void {
    event.stopPropagation();

    this.selectedLocation = null;
    this.purchases = [...this.allPurchases];

    this.purchasesFiltered.emit(this.purchases);
  }
}