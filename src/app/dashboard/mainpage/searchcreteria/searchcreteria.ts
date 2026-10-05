import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../../../services/location.service';

@Component({
  selector: 'app-search-criteria',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './searchcreteria.html',
  styleUrl: './searchcreteria.css',
})
export class SearchCriteria implements OnInit {

  locations: any[] = [];
  selectedLocation: number | null = null;

  purchaseStartDate: Date | null = null;
  purchaseEndDate: Date | null = null;
  invoiceStartDate: Date | null = null;
  invoiceEndDate: Date | null = null;

  constructor(
    @Inject(LocationService)
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.getLocation();
  }
  getLocation(): void {
    this.locationService.getLocation().subscribe({
      next: (locations) => {
        console.log(locations);
        this.locations = locations;
      },
      error: (err) => console.error(err)
    });
  }

  onClear(): void {
    this.selectedLocation = null;
    this.purchaseStartDate = null;
    this.purchaseEndDate = null;
    this.invoiceStartDate = null;
    this.invoiceEndDate = null;
  }

  clearLocation(event: MouseEvent): void {
    event.stopPropagation();
    this.selectedLocation = null;
  }
}