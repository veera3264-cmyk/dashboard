import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {
  MatNativeDateModule
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PurchaseService } from '../../../../services/purchase.service';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';
import { Purchase } from '../table/table.model';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './datepicker.html',
  styleUrls: ['./datepicker.css']
})
export class Datepicker implements OnInit {

  allPurchases: any[] = [];
  selectedDatePurchases: any[] = [];

  startDate: Date = new Date();
  endDate: Date = new Date();
  @Output() dateRangeSelected = new EventEmitter<any>();

  constructor() {

    this.endDate = new Date(); // Today

    this.startDate = new Date();
    this.startDate.setDate(
      this.endDate.getDate() - 7
    );

  }


  ngOnInit(): void {
    this.emitDateRange();
  }
  emitDateRange(): void {
    this.dateRangeSelected.emit({
      startDate: this.startDate,
      endDate: this.endDate
    })
    
  }
  onDateChange(): void {
    this.emitDateRange()
  }
}









