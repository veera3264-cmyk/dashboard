import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-SearchCriteria',
  imports: [MatSelectModule, MatFormFieldModule, MatDatepickerModule, CommonModule, FormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './searchcreteria.html',
  styleUrl: './searchcreteria.css',
})
export class SearchCriteria implements OnInit {

  locations: any[] = [];
  selectedLocation: string | null = null;
  purchaseStartDate: Date | null = null;
  purchaseEndDate: Date | null = null;
  invoiceStartDate: Date | null = null;
  invoiceEndDate: Date | null = null;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadLocations();
  }

  loadLocations() {
    this.http.get<any[]>('http://localhost:8080/api/locations')
      .subscribe({
        next: (data) => {
          this.locations = data;
        },
        error: (err) => {
          console.error('Error loading locations', err);
        }
      });
  }
  onClear(): void {
    this.selectedLocation = null;

    this.purchaseStartDate = null;
    this.purchaseEndDate = null;

    this.invoiceStartDate = null;
    this.invoiceEndDate = null;
  }
}